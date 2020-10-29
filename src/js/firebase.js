import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Refs from './refs';
import { onLogInState, onLogOutState } from './registration';

export const LISTS = {
  watched: 'watched',
  queue: 'queue',
};

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
      Refs.inputEmail.value,
      Refs.inputPassword.value,
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
      Refs.inputPassword.value,
      Refs.inputPassword.value,
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

function getCurrentUserID() {
  return firebase.auth().currentUser.uid;
}

export async function addMovieToList(movie, list) {
  try {
    const userID = getCurrentUserID();

    const db = firebase.database();
    const userList = db.ref(`/userLists/${userID}/${list}`);
    userList.push(movie);
  } catch {
    console.error('Add error');
  }
}

export async function getMoviesList(list) {
  try {
    const db = firebase.database();
    const userList = db.ref(`/userLists/${userID}/${list}`);
    const dataSnapshot = await userList.once('value');
    const data = dataSnapshot.val();
    return Object.values(data);
  } catch {
    console.error('Cannot read data from DB!');
  }
}

async function movieAdded(userID, id, list) {
  try {
    const db = firebase.database();
    const userList = db.ref(`/userMovies/${userID}/${list}`);
    const dataSnapshot = await userList.once('value');
    const data = dataSnapshot.val();
    const moviesID = Object.values(data);
    return moviesID.includes(id);
  } catch {
    console.error('Cannot read data from DB!');
  }
}
