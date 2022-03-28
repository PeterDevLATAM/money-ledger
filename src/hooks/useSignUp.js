import { useState } from "react";
import { auth } from "../firebase/config";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signUp = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //signUp the user
      const res = await auth.createUserWithEmailAndPassword(email, password);
      console.log(res);
      console.log(res.user);

      if (!res) throw new Error("Could not complete signup");

      //add display name to the user
      await res.user.updateProfile({ displayName: displayName });
    
      setError(null)
      setIsPending(false)


    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false)
    }
  };

  return { error, isPending, signUp };
};
