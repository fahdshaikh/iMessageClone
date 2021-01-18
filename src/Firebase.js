import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD3KRO8eXdKHbP5s4w3RURpqTWng3LYCN8',
  authDomain: 'imessageclone-563ca.firebaseapp.com',
  projectId: 'imessageclone-563ca',
  storageBucket: 'imessageclone-563ca.appspot.com',
  messagingSenderId: '678393500356',
  appId: '1:678393500356:web:90544bae03f41aa9f6ef91',
  measurementId: 'G-K4B8QDZGZJ',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
