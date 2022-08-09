import { createContext, useState, useEffect } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextData {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: any){
  const [user, setUser] = useState<User>();

  useEffect(()=> {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {//event listener
      if(user){
        const {displayName, photoURL, uid} = user;
        
        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }
  
        setUser({id: uid, name: displayName, avatar: photoURL});
      }
    }) 

    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    
    const auth = getAuth();

    const result = await signInWithPopup(auth,provider);
 
    if(result.user){
      const {displayName, photoURL, uid} = result.user;
      
      if(!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({id: uid, name: displayName, avatar: photoURL});
    }
  }

  return(
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}