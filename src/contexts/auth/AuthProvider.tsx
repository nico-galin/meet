import React, { useCallback, useEffect, useState } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'

import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";

import AuthContext from './AuthContext'
import User, { PublicUser } from 'models/User'
import { useNavigate } from 'react-router-dom';
import { supported_companies } from 'constants/supported_companies';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig)

const verifyUrl = process.env.REACT_APP_ENVIRONMENT === "local" ? "http://localhost:3000/#/verify" : "https://meet.nicogalin.com/#/verify";

const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState<User>();
  const [publicUser, setPublicUser] = useState<PublicUser>();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string) => {
    try {
      console.log()
      const actionCodeSettings = {
        url: verifyUrl,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
      })
    } catch (e) {
      console.log(e);
    }
  }

  const verifyEmail = async (email: string, href: string) => {
    const res = await signInWithEmailLink(auth, email, href);
    if (!!res && !!res.user) {
      setUser({
        id: res.user.uid,
        createdAt: !!res.user.metadata.creationTime ? res.user.metadata.creationTime : "",
        email: !!res.user.email ? res.user.email : "",
      })
      setisAuthenticated(true);
    }
    return res;
  }

  const signOut =  async () => {
    try {
      await auth.signOut();
      setisAuthenticated(false);
      setUser(undefined);
      window.localStorage.setItem("emailForLogin", "");
      window.localStorage.setItem("waitingForVerification", "0");
      navigate("/login")
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // Get user here
    const unsubscribe = auth.onAuthStateChanged((fbUser) => {
      if (!fbUser) return;
      const email = !!fbUser.email ? fbUser.email : "";
      let userCompany = "";
      for (let company of supported_companies) {
        for (let domain of company.email_domains) {
          if (email.toLowerCase().endsWith(domain.toLowerCase())) {
            userCompany = company.name;
            break;
          }
        }
      }
      setUser({
        id: fbUser.uid,
        createdAt: !!fbUser.metadata.creationTime ? fbUser.metadata.creationTime : "",
        email: email,
        company_name: userCompany,
      });
      setisAuthenticated(true)
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
        signOut,
        verifyEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
