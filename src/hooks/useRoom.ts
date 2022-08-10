import { getDatabase, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

import { useAuth } from './useAuth';

interface FirebaseQuestion extends Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswer: string;
  isHighlighted: string;
}> { }

interface Question {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswer: string;
  isHighlighted: string;
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
          isAnswer: value.isAnswer
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return () => {
      off(roomRef)
    }
  }, [roomId, user?.id])

  return { questions, title }
}