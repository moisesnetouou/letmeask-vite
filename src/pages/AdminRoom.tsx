import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { getDatabase, ref, remove, update } from 'firebase/database';
type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {title, questions} = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm("Tem certeza que deseja excluir esta pergunta?")){
      const database = getDatabase();
      const questionRef = ref(database, `rooms/${roomId}/questions/${questionId}`)

      await remove(questionRef)
    }
  }

  async function handleEndRoom(){
    const database = getDatabase();
    const roomRef = ref(database, `rooms/${roomId}`);

    await update(roomRef, {
      endedAt: new Date()
    })

    navigate('/');
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
           
          <div>
            <RoomCode 
              //@ts-ignore
              code={roomId} 
            />

            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">  
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>{questions.length} perguntas</span>
          ) }
        </div>
        
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question 
                key={question.id} 
                author={question.author} 
                content={question.content}  
              >
                <button
                  type="button"
                  onClick={()=> handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}