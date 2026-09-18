import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDwh0y8nRDl1sfsrvz7crDiM8hHGEufiM",
    authDomain: "stationarystore-17ca9.firebaseapp.com",
    projectId: "stationarystore-17ca9",
    storageBucket: "stationarystore-17ca9.firebasestorage.app",
    messagingSenderId: "344507315392",
    appId: "1:344507315392:web:c45d2d52040a24b22ce925"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();