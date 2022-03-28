import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

let inititalState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return state;
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, inititalState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = db.collection(collection);

  //add a document
  const addDocument = (doc) => {
    //
  };

  //delete a document
  const deleteDocument = (id) => {
    //
  };

  //cleanUp functions
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {addDocument, deleteDocument, response}
};
