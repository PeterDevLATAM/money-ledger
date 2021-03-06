import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  useEffect(() => {
    return () => setIsCancelled(true); // returns a clean up function when the component unmounts
  }, []);

  const signUp = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //signUp the user
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) throw new Error("Could not complete signup");

      //add display name to the user
      await res.user.updateProfile({ displayName: displayName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

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

  return { error, isPending, signUp };
};
