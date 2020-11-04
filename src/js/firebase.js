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
  // authDomain: 'nitflix.fun',
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

async function addUserToDB({ user }) {
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

function passValidation(value) {
  const pass = value.trim();
  if (pass.length < 6) return false;
  return true;
}

export async function registration() {
  const email = Refs.inputEmail.value;
  const pass = Refs.inputPassword.value;
  if (!passValidation(pass)) {
    const passRefSpan = document.querySelector('#pass-span');
    passRefSpan.classList.add('invalid');
    return;
  }
  try {
    const auth = firebase.auth();
    const user = await auth.createUserWithEmailAndPassword(email, pass);
    await addUserToDB(user);
  } catch {
    alert('User with this e-mail already exists');
  }
}

export async function basicAuthorization() {
  try {
    const auth = firebase.auth();
    await auth.signInWithEmailAndPassword(
      Refs.inputEmail.value,
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

export function currentUser() {
  return firebase.auth().currentUser;
}

function getCurrentUserID() {
  return firebase.auth().currentUser.uid;
}

async function getUserDataFromDB(ref, userID, path) {
  const db = firebase.database();
  const userList = db.ref(`/${ref}/${userID}/${path}`);
  const dataSnapshot = await userList.once('value');
  const data = dataSnapshot.val();
  return Object.values(data);
}

export async function getMoviesList(list) {
  try {
    const userID = getCurrentUserID();
    return await getUserDataFromDB('userLists', userID, list);
    // const db = firebase.database();
    // const userList = db.ref(`/userLists/${userID}/${list}`);
    // const dataSnapshot = await userList.once('value');
    // const data = dataSnapshot.val();
    // return Object.values(data);
  } catch {
    //console.error('Cannot read data from DB!');
    return [];
  }
}

async function movieAdded(userID, id, list) {
  try {
    const moviesID = await getUserDataFromDB('userMovies', userID, list);
    return moviesID.includes(id);
    // const db = firebase.database();
    // const userMovies = db.ref(`/userMovies/${userID}/${list}`);
    // const dataSnapshot = await userMovies.once('value');
    // const data = dataSnapshot.val();
    // const moviesID = Object.values(data);
    // return moviesID.includes(id);
  } catch {
    //console.error('Cannot read data from DB!');
    return false;
  }
}

export async function addMovieToList(movie, list) {
  try {
    const userID = getCurrentUserID();
    const alreadyListed = await movieAdded(userID, movie.id, list);
    if (!alreadyListed) {
      const db = firebase.database();
      const userList = db.ref(`/userLists/${userID}/${list}`);
      const userMovies = db.ref(`/userMovies/${userID}/${list}`);
      const key = (await userMovies.push(movie.id)).key;
      userList.child(key).set(movie);
    }
  } catch {
    console.error('Add error');
  }
}

export async function movieInList(id, list) {
  const userID = getCurrentUserID();
  const _id = String(id);
  return movieAdded(userID, _id, list);
}

async function findMovieKey(id, list, userID) {
  const db = firebase.database();
  const userMovies = db.ref(`/userMovies/${userID}/${list}`);
  const dataSnapshot = await userMovies.once('value');
  const data = dataSnapshot.val();

  for (const key in data) {
    if (data[key] === id) return key;
  }
}

export async function removeMovieFromList(movieID, list) {
  const userID = getCurrentUserID();
  const key = await findMovieKey(movieID, list, userID);
  if (key) {
    const db = firebase.database();
    db.ref(`/userLists/${userID}/${list}/${key}`).remove();
    db.ref(`/userMovies/${userID}/${list}/${key}`).remove();
  }
}
