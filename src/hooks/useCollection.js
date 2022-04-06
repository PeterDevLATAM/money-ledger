import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (collection, _query) => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState(null);

  /* we need to wrap the variable with a ref in order to avoid loops  */
  /* if we dont use ref --> infinite loop in useEffect 
    query is an array and is "diferent" in every function call */
  const query = useRef(_query).current;

  useEffect(() => {
    let ref = db.collection(collection);
    if (query) {
      ref = ref.where(...query);
    }

    const unsubscribe = ref.onSnapshot(
      //real time listener
      (snapshot) => {
        // onSnapshot fires callback any time the collection changes, takes 2 args the second is callback when error
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Couldn't fetch the data");
      }
    );
    return () => unsubscribe();
  }, [collection, query]);

  return { documents, error };
};
