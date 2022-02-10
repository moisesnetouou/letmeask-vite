/* eslint-disable no-shadow */
import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, database, firebase } from '../services/firebase';
import { AuthContextType, User } from './@types/auth';

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, providerData } = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }
        console.log(photoURL);
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

      userRef.once('value', (user) => {
        const databaseUser = user.val();
        const parsedUser = Object.entries(databaseUser);

        console.log('data', parsedUser);
      });

      // await userRef.push({
      //   id: uid,
      //   name: displayName,
      //   avatar: photoURL,
      //   email: providerData[0].email,
      // });
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
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email_user: providerData[0].email,
      });
    }
  }

  async function logout() {
    await auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, logout, signInWithGithub }}
    >
      {children}
    </AuthContext.Provider>
  );
}
