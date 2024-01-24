import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAl7I6g8eWtgroHDU5gerUYFWEUR6CcswE",
    authDomain: "client-crud-e9ad9.firebaseapp.com",
    projectId: "client-crud-e9ad9",
    storageBucket: "client-crud-e9ad9.appspot.com",
    messagingSenderId: "652241458092",
    appId: "1:652241458092:web:d6f73653a96d2593c8e009"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export default db