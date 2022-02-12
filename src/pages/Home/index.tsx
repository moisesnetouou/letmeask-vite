import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { FiGithub } from 'react-icons/fi';
import { BsGoogle } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import { PageAuth, ProviderContent } from './styles';
import { database } from '../../services/firebase';

export function Home() {
  const navigate = useNavigate();
  const {
    signInWithGoogle,
    user,
    signInWithGithub,
    createAccountEmailWithPassword,
    signInEmailWithPassword,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // async function handleSignInEmail(event: FormEvent) {
  //   event.preventDefault();
  //   if (!user) {
  //     await createAccountEmailWithPassword(email, senha);
  //   }
  // }

  async function handleSignInEmail(event: FormEvent) {
    event.preventDefault();
    if (!user) {
      await signInEmailWithPassword(email, senha);
    }
  }

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    navigate('/dashboard');
  }

  async function handleCreateRoomGithub() {
    if (!user) {
      await signInWithGithub();
    }

    navigate('/dashboard');
  }

  return (
    <PageAuth>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />

          <form className="sign-in-email" onSubmit={handleSignInEmail}>
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />

            <input
              type="text"
              placeholder="Senha"
              onChange={(event) => setSenha(event.target.value)}
              value={senha}
            />
            <Button type="submit">Login</Button>
          </form>

          <ProviderContent>
            <button type="button" className="google" onClick={handleCreateRoom}>
              <BsGoogle />
            </button>

            <button
              type="button"
              className="github"
              onClick={handleCreateRoomGithub}
            >
              <FiGithub />
            </button>

            <button type="button" onClick={() => console.log('email')}>
              <MdEmail />
            </button>
          </ProviderContent>
        </div>
      </main>
    </PageAuth>
  );
}
