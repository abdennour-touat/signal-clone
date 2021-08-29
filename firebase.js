// import * as firebase from "firebase";
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAWImodSopmyp25Szm4mdwHe0MIb6etu1w",
  authDomain: "signal-clone-e2de1.firebaseapp.com",
  projectId: "signal-clone-e2de1",
  storageBucket: "signal-clone-e2de1.appspot.com",
  messagingSenderId: "1005296119128",
  appId: "1:1005296119128:web:8633f3e8c576358a2e492d",
  measurementId: "G-TWQ11B5Q3C",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage(app);

export { db, auth, storage };


// storage
// .ref(`users/${authUser.uid}/profileImage`)
// .getDownloadURL()
// .then((imgURl) => {});