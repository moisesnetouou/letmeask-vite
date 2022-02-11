/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { PageAuth } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import loadingImg from '../../assets/images/loading.svg';
import { Aside } from '../../components/Aside';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [me, setMe] = useState({} as any);
  const [loading, setLoading] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  useEffect(() => {
    setLoading(true);
    async function teste() {
      const email = user?.email_user;
      const userRef = database.ref('users');

      userRef.on('value', (users) => {
        const databaseUser = users.val();
        const parsedRoom = Object.values(databaseUser);
        // console.log('profile', parsedRoom);
        const filterData = parsedRoom.find(
          (data: any) => data.email === 'moises.serrao@clickip.com.br'
        );
        // console.log('profile', filterData);

        if (email === undefined) {
          return setMe({});
        }
        // console.log(allDataMyRooms);
        setMe(filterData);
        setLoading(false);
      });
    }

    // return () => {
    //   roomRef.off('value');
    // };
    teste();
  }, [user?.id]);

  return (
    <PageAuth>
      <Aside />

      <main>
        {loading ? (
          <img className="loading" src={loadingImg} alt="loading" />
        ) : (
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <h1>{me?.name}</h1>
            <h2>{me?.email}</h2>

            <p>
              Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
            </p>
          </div>
        )}
      </main>
    </PageAuth>
  );
}
