import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import {useParams} from 'react-router-dom';
import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room(){
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {user} = useAuth();
  const {title, questions} = useRoom(roomId)

  const [newQuestion, setNewQuestion] = useState('');

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