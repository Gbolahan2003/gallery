// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore, collection,getDocs,  } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

       
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app:any = !getApps().length? initializeApp(firebaseConfig):getApps();
const auth = getAuth(app)
const db = getFirestore(app)
const firestore = getFirestore()
const callRef = collection(db, 'users')
const imageDB = getStorage(app)
//collection reference

// getDocs(callRef).then((snapshots)=>{
// console.log(snapshots.docs);
// let users:any =[]
// snapshots.docs.forEach((doc)=>{
//   users.push({...doc.data(),id:doc.id})
// })

// console.log(users);
// })

export {app, auth, db,imageDB, firestore}