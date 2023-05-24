import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { setAuthState } from "../features/auth/auth";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function Auth() {
  const { authState } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const onLogin = async (email, password) => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          alert("Login success");
          dispatch(setAuthState("signedIn"));
        }
      );
    }
  };

  const onSignUp = async (email, password) => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Sign up success");
          dispatch(setAuthState("signedIn"));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const onSignOut = async () => {
    signOut(auth).then(() => {
      alert("Sign out success");
    });
  };
  return (
    <>
      {authState === "signIn" && (
        <Login
          onLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}

      {authState === "signUp" && (
        <SignUp
          onSignUp={() => {
            onSignUp(email, password);
          }}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      )}
    </>
  );
}
