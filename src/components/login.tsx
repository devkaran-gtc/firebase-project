import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../config/firebase";
// import { async } from "@firebase/util";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const signoutGoogle = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.photoURL);
  console.log(auth?.currentUser?.phoneNumber);
  return (
    <div>
      <p>User Login</p>
      <input
        type="text"
        placeholder="Type Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Type Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login </button>
      <p>
        User {email} and {password}
      </p>
      <button onClick={loginGoogle}> Sign in with Google </button>
      <button onClick={signoutGoogle}> Signout Google </button>
    </div>
  );
};
