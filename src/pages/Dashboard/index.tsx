import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiGithub } from 'react-icons/fi';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import { PageAuth } from './styles';
import { database } from '../../services/firebase';

export function Dashboard() {
  const navigate = useNavigate();
  const { signInWithGoogle, user, signInWithGithub } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    navigate('/rooms/new');
  }

  async function handleCreateRoomGithub() {
    if (!user) {
      await signInWithGithub();
    }

    navigate('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <PageAuth>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Dashboard</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button
            type="button"
            className="create-room"
            onClick={() => navigate('/rooms/all')}
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Acessar suas salas
          </button>

          <button
            type="button"
            className="create-room"
            onClick={handleCreateRoomGithub}
          >
            <FiGithub />
            Criar Sala
          </button>

          <button
            type="button"
            className="create-room"
            onClick={handleCreateRoomGithub}
          >
            <FiGithub />
            Acessar uma sala existente
          </button>

          <button
            type="button"
            className="create-room"
            onClick={() => navigate('/me')}
          >
            <FiGithub />
            Perfil
          </button>
        </div>
      </main>
    </PageAuth>
  );
}
