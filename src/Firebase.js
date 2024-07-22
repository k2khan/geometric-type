import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvK6CURd47LjYFmN6VnTQS_KvHhBTOevA",
    authDomain: "geometric-type.firebaseapp.com",
    projectId: "geometric-type",
    storageBucket: "geometric-type.appspot.com",
    messagingSenderId: "781183741274",
    appId: "1:781183741274:web:d11f86f540f8bef6a91763"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };