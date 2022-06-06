import { getDatabase, set, ref, onValue, get, child } from "@firebase/database";
import { initializeApp } from "@firebase/app";

import { CCS_FirebaseConfig } from '../configs/FirebaseConfigs';

initializeApp(CCS_FirebaseConfig);

export const Add = (session) => {
    const db = getDatabase();
    set(ref(db, 'portalsessions/' + session.id), session);
}

export const GetAll = (callback) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `portalsessions`)).then((snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      console.log("No sessions available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const Listen = (sessionId, callback) => {
    const db = getDatabase();
    const reference = ref(db, 'portalsessions/' + sessionId);
    //console.log(reference);
    onValue(reference, (snapshot) => {
      //console.log(snapshot.val());
      const data = snapshot.val();
      callback(data);
    });
}