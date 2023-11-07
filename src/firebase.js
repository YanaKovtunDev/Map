import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB53pdCy9S0GLNi2n71z5AxA6ttZsuZmfA",
    authDomain: "map-app-b8eab.firebaseapp.com",
    projectId: "map-app-b8eab",
    storageBucket: "map-app-b8eab.appspot.com",
    messagingSenderId: "716749628503",
    appId: "1:716749628503:web:91e89753d96552fd3faf12",
    measurementId: "G-Y40V4HEBPQ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

