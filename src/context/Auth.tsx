import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {auth, firebase} from '../services/firebase';
import {AuthContextType, User } from './@types/auth';


export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: {children: ReactNode}){
  const [user, setUser] = useState<User>();

  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = user;

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid, 
          name: displayName, 
          avatar: photoURL
        })
      }
    });
  }, [])


  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if(result.user){
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid, 
        name: displayName, 
        avatar: photoURL
      })
    }
  }


  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}