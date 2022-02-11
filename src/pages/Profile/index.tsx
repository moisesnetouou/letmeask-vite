import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { PageAuth } from './styles';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [me, setMe] = useState({} as any);

  function handleLogout() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    const email = user?.email_user;
    const userRef = database.ref('users');

    userRef.on('value', (users) => {
      const databaseUser = users.val();
      const parsedRoom = Object.values(databaseUser);
      console.log('profile', parsedRoom);
      const filterData = parsedRoom.find(
        (data: any) => data.email === 'moises.serrao@clickip.com.br'
      );
      console.log('profile', filterData);

      if (email === undefined) {
        return setMe({});
      }
      // console.log(allDataMyRooms);
      setMe(filterData);
    });

    // return () => {
    //   roomRef.off('value');
    // };
  }, [user?.id]);

  return (
    <PageAuth>
      <aside>
        <button onClick={handleLogout}>Desconectar</button>
        <Link to="/rooms/all">Salas</Link>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Perfil</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{me?.name}</h1>
          <h2>{me?.email}</h2>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </PageAuth>
  );
}
