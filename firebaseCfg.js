import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAGX80sr_R7AMECG4TLABbO-xzv-7mMXoo",
    authDomain: "crossplat-3f4bc.firebaseapp.com",
    projectId: "crossplat-3f4bc",
    storageBucket: "crossplat-3f4bc.firebasestorage.app",
    messagingSenderId: "763916237711",
    appId: "1:763916237711:web:92898f51771bc440b169fa"
};

const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app);

export const storage = getStorage(app);