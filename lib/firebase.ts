import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAZy25Rm-af9k41LJVWl3mWFIXRCygPSAE",

  authDomain: "product-dashboard-1c541.firebaseapp.com",

  projectId: "product-dashboard-1c541",

  storageBucket: "product-dashboard-1c541.firebasestorage.app",

  messagingSenderId: "386639428613",

  appId: "1:386639428613:web:fd05e5401fd0331e7eb06c",

  measurementId: "G-MCX03KWP2S"

};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
