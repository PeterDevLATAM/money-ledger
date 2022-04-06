import { useState, useEffect, useReducer } from "react";
import { db, timestamp } from "../firebase/config";

let inititalState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...inititalState, isPending: true };
    case "ERROR":
      return { ...inititalState, error: action.payload };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, inititalState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = db.collection(collection);

  //only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add a document
  const addDocument = async (doc) => {
    try {
      const createdAt= timestamp.fromDate(new Date())
      const addedDocument = await ref.add({...doc, createdAt});  
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
        dispatchIfNotCancelled({type:'ERROR', payload: error.message})
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    //
  };

  //cleanUp functions
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
