import React, { useCallback, useEffect, useState } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

import AuthContext from './AuthContext'
import User, { PublicUser } from 'models/User'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)

const AuthProvider = (props: any) => {
  const auth = getAuth(app);
  const [user, setUser] = useState<User>();
  const [publicUser, setPublicUser] = useState<PublicUser>();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: "https://nicogalin.com" /*"https://localhost:3000/verify"*/,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
        console.log("done: ", email)
      })
    } catch (e) {
      console.log(e);
    }
  }

  const signOut =  async () => {
    try {

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // Get user here
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      console.log("USER OBJ: ", firebaseUser)
      //setUser(firebaseUser);
    })
    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        publicUser,
        loading,
        auth,
        signIn,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
