import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// Firestore CRUD functions
export async function insertNewTodo(todo) {
  try {
    const docRef = await addDoc(collection(db, 'todos'), todo);
    return docRef.id.toString();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTodos(uid) {
  const todos = [];
  try {
    const collectionRef = collection(db, 'todos');
    const qry = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(qry);
    
    //give each todo their docId in the app
    querySnapshot.forEach((docmnt) => {
      const todo = { ...docmnt.data() };
      todo.docId = docmnt.id;
      todos.push(todo);
    });
    
    return todos;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodo(docId, todo) {
  try {
    await setDoc(doc(db, 'todos', docId), todo);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(docId) {
  try {
    await deleteDoc(doc(db, 'todos', docId));
  } catch (error) {
    console.error(error);
  }
}