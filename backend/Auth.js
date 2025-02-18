import { auth } from "./Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };


  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  
  const checkSignInMethods = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods; // Returns an array (e.g., ['password'], ['google.com'], or [])
    } catch (error) {
      console.error('Error checking sign-in methods:', error.message);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  

  export { signUp, signIn, logOut, checkSignInMethods };