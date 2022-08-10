import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import {useParams} from 'react-router-dom';
import '../styles/room.scss';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { Question } from '../components/Question';

type RoomParams = {
  id: string;
}

interface FirebaseQuestion extends Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswer: string;
  isHighlighted: string;
}>{}

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

export function Room(){
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  const {user} = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  useEffect(()=> {
    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomId}`)

    onValue(roomRef, (room) => {
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

    
  }, [roomId])

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }

    if(!user){
      throw new Error('You must be logged id');
    }

    const  question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswer: false,
    }

    const database = getDatabase();

    const roomRef = ref(database, `rooms/${roomId}/questions`);

    const firebaseRoom = push(roomRef);

    set(firebaseRoom, question);

    setNewQuestion('');
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
           
          <RoomCode 
            //@ts-ignore
            code={roomId} 
          />
        </div>
      </header>

      <main className="content">  
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} perguntas</span>
          ) }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?" 
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>

              </div>
            ) : (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id} 
                author={question.author} 
                content={question.content}  
              />
            )
          })}
        </div>
      </main>
    </div>
  );
}