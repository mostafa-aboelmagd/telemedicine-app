import React from 'react';
import StackRouters from "./app/stackRouters";
import { initializeApp } from 'firebase/app'; // Import Firebase initialization function
const firebaseConfig = {
  apiKey: "AIzaSyDfE0VimHcuMs8xetu1jIywme-_aytt4pE", 
  authDomain: "telemedpilot.firebaseapp.com", 
  projectId: "telemedpilot", 
  storageBucket: "telemedpilot.appspot.com", 
  messagingSenderId: "778585481356", 
  appId: "1:778585481356:android:227de0b82fa2a82a149ba9" 
};
const app = initializeApp(firebaseConfig); 
export default function App() {
  return (
    <StackRouters />
  );
}