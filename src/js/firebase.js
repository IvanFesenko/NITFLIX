import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Refs from './refs';
import { onLogInState, onLogOutState } from './registration';

firebase.initializeApp({
  apiKey: 'AIzaSyDuvnT4jggcdrgUHF7AnWYw3zZH5CnwRSA',
  authDomain: 'nitflix-992cf.firebaseapp.com',
  databaseURL: 'https://nitflix-992cf.firebaseio.com',
  projectId: 'nitflix-992cf',
  storageBucket: 'nitflix-992cf.appspot.com',
  messagingSenderId: '527944034705',
  appId: '1:527944034705:web:91a2ae547fba32179cd230',
});

firebase.auth().onAuthStateChanged(fbUser => {
  if (fbUser) {
    onLogInState();
  } else {
    onLogOutState();
  }
});

async function addUserToDB(user) {
  try {
    const { uid, email } = user;
    const db = firebase.database();
    const users = db.ref('users');
    users.child(uid).set({ email: email });
  } catch {
    console.error('user add failed');
  }
}

async function userExists(user) {
  try {
    const { uid } = user;
    const db = firebase.database();
    const users = db.ref(`/users/`);
    const dataSnapshot = await users.once('value');
    const data = dataSnapshot.val();
    if (!data.hasOwnProperty(uid)) {
      await addUserToDB(user);
    }
  } catch {
    alert('User with this e-mail already exists');
  }
}

export async function registration() {
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(
      Refs.email.value,
      Refs.password.value,
    );
    addUserToDB(user);
  } catch {
    alert('User with this e-mail already exists');
  }
}

export async function basicAuthorization() {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(
      Refs.email.value,
      Refs.password.value,
    );
  } catch {
    alert('Failed to login');
  }
}

export function googleAuthorization() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      userExists(result.user);
    })
    .catch(function (error) {
      console.error(error.message);
    });
}

export function logOut() {
  firebase.auth().signOut();
}

function getCurrentUser() {
  return firebase.auth().currentUser;
}
