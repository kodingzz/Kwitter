// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCiZHfiKGlVDcJR22GqMmJvioNsiBXh690",
  authDomain: "temporary-c0c84.firebaseapp.com",
  projectId: "temporary-c0c84",
  storageBucket: "temporary-c0c84.appspot.com",
  messagingSenderId: "611129473014",
  appId: "1:611129473014:web:1bc4f8570675b7e13d39d7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


//  firebase에서 getAuth로 authentication 받아오기
export  const auth =getAuth(app);
export  const db =getFirestore(app);
export  const storage =getStorage(app);

