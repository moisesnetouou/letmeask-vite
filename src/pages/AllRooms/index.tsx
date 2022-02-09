import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { PageAuth, ContainerUl } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { WidgetRoom } from '../../components/WidgetRoom';

export function AllRooms() {
  const { user, logout } = useAuth();
  const [myRoom, setMyRooms] = useState([]);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    const email = user?.email_user;
    const roomRef = database.ref(`rooms`);

    roomRef.on('value', (room) => {
      const databaseRoom = room.val();
      const parsedRoom = Object.entries(databaseRoom);
      const filterData = parsedRoom.filter(
        (data: any) => data[1].email === email
      );

      setMyRooms(filterData);
    });

    return () => {
      roomRef.off('value');
    };
  }, [user?.id]);

  return (
    <PageAuth>
      <aside>
        <button onClick={handleLogout}>Desconectar</button>
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
          <h1>{user?.name}</h1>

          <ContainerUl>
            {myRoom.map((item) => (
              <WidgetRoom title={item[1].title} />
              // <h1>{item[0]}</h1>
            ))}
          </ContainerUl>
        </div>
      </main>
    </PageAuth>
  );
}
