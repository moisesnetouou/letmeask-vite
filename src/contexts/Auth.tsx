/* eslint-disable no-shadow */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { auth, database, firebase } from '../services/firebase';
import { AuthContextType, User } from './@types/auth';

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [token, useToken] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, providerData } = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account!');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email_user: providerData[0].email,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const userRef = database.ref('users');
    const result = await auth.signInWithPopup(provider);
    console.log('teste', result);
    if (result.user) {
      const { displayName, photoURL, uid, providerData } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email_user: providerData[0].email,
      });

      userRef.on('value', (user) => {
        const databaseUser = user.val();
        const parsedUser = Object.values(databaseUser);

        const isExistUser = parsedUser.some(
          (item: any) => item.email === providerData[0].email
        );
        if (!isExistUser) {
          userRef.push({
            id: uid,
            name: displayName,
            avatar: photoURL,
            email: providerData[0].email,
          });
        }
      });
    }
  }

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid, providerData } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account!');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email_user: providerData[0].email,
      });
    }
  }

  async function createAccountEmailWithPassword(
    email: string,
    password: string
  ) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const tudo = userCredential;

      console.log('tudo', tudo);
    } catch (error) {
      return toast.error(
        // @ts-ignore
        error.code === 'auth/email-already-in-use'
          ? 'E-mail já está sendo usado!'
          : 'E-mail incorreto',
        {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  async function signInEmailWithPassword(email: string, password: string) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      // const result = userCredential;
      // @ts-ignore
      const { _delegate } = userCredential.user;
      // @ts-ignore
      localStorage.setItem('@fire:token', _delegate.accessToken);
      console.log('tudo', _delegate.accessToken);

      // console.log(result);
      navigate('/dashboard');
    } catch (error) {
      return toast.error(
        // @ts-ignore
        error.code === 'auth/user-not-found'
          ? 'Usuário não encontrado'
          : 'Senha incorreta',
        {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  async function logout() {
    await auth.signOut();
    localStorage.removeItem('@fire:token');
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        logout,
        signInWithGithub,
        createAccountEmailWithPassword,
        signInEmailWithPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
