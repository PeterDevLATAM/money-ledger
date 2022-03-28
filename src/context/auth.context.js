import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext(); //creates the context

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }; //only modify what it needs to be modified
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    //useReducer takes 2 args, a func to opdate state and a default state
    user: null,
    authIsReady: false, 
  });
  useEffect(() => {
    
    //this function is gonna fire once when the component mounts and everytime the state of auth changes
   const unsubscribe= auth.onAuthStateChanged((user) => {//it returns user object
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsubscribe()
    });
  }, []);
  console.log("Auth context state", state);

  return (
    /* Return the provider to wrap the components that need the context */
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {" "}
      {/* Sending dispatch function also to modify state from other components */}
      {children}
    </AuthContext.Provider>
  );
};
