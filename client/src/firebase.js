import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIOUO5PA5B6WeAOFoWKBUnI3IzsyIhWUw',
  authDomain: 'ecommerce-shop-f4842.firebaseapp.com',
  projectId: 'ecommerce-shop-f4842',
  storageBucket: 'ecommerce-shop-f4842.appspot.com',
  messagingSenderId: '787481753264',
  appId: '1:787481753264:web:82bb8153d5c84338b52d75',
  measurementId: 'G-38FKN2G8XW',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
