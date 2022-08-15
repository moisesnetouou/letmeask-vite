import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { useAuth } from './useAuth';

interface FirebaseQuestion extends Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}> { }

interface Question {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export function useRoom(roomId: string | undefined) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomId}`)

    onValue(roomRef, (room) => {
      console.log(roomId);
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      });
      console.log("teste", parsedQuestions)
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return () => {
      off(roomRef)
    }
  }, [roomId, user?.id])

  return { questions, title }
}