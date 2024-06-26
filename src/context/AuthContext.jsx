import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ chlidren }) {
  const [user, setUser] = useState({})

  function signUp(email, password ) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function signIn(email, password ) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  function logOut() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, ( currentUser )=> {
      setUser(currentUser)
    });
  return () => {
    unsubscribe()
  }
}, [])
  
  return (
    <AuthContext.Provider value={{
      signIn, signUp, user, logOut, 
    }}>
      {chlidren}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => useContext(AuthContext)