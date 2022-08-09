import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useState } from "react";

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

  async function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
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