import { initializeApp } from "firebase/app";

import * as db from "firebase/firestore"
import * as auth from "firebase/auth"
import * as storage from "firebase/storage"
import * as functions from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyBpKzJZ7uFsQjqhL9B9xzt-luGglWS0Df0",
  authDomain: "cloneinstagramcurso.firebaseapp.com",
  projectId: "cloneinstagramcurso",
  storageBucket: "cloneinstagramcurso.appspot.com",
  messagingSenderId: "19139953359",
  appId: "1:19139953359:web:d22ddb9adb2af840462dba"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

export { db, auth, storage, functions };