// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain:  "wisdom-porfolio.firebaseapp.com",
  projectId: "wisdom-porfolio",
  storageBucket:  "wisdom-porfolio.appspot.com",
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId:  import.meta.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
