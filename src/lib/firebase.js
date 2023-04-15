import {initializeApp,getApp,getApps} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDci3wREGAlhH8x1nlWewVeJPXSl78GNOA",
    authDomain: "classroom-clone-383121.firebaseapp.com",
    projectId: "classroom-clone-383121",
    storageBucket: "classroom-clone-383121.appspot.com",
    messagingSenderId: "859215499249",
    appId: "1:859215499249:web:d896a8c75e066d6bfb3e50"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {app,firestore,storage,auth};