import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return () => setIsCancelled(true); // returns a clean up function when the component unmounts
  }, []);

  const login = async ( email, password) => {
    setError(null);
    setIsPending(true);

    try {
        //sign in the user
        const res = await auth.signInWithEmailAndPassword(email, password)
        //update state 

        dispatch({type: 'LOGIN', payload: res.user})



      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  return { error, isPending, login };
};
