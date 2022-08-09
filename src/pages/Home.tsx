import {useNavigate} from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { child, get, getDatabase, ref } from 'firebase/database';

export function Home(){
  const navigate = useNavigate();
  const {signInWithGoogle, user} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }

    navigate('rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();


    if(roomCode.trim() === '') {
      return;
    }

    const databaseRef = ref(getDatabase());
    
    const roomRef =  await get(child(databaseRef, `rooms/${roomCode}`));

    if(!roomRef.exists()){
      alert('Room does not exists')
      return;
    }
  
    navigate(`rooms/${roomCode}`)   
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room" onClick={()=> handleCreateRoom()}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button onClick={handleJoinRoom}>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}