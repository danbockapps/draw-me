// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyBB4KN97nfYsqDg5dLiYsnl68P-6Yju10k',
  authDomain: 'danbock-draw-me.firebaseapp.com',
  databaseURL: 'https://danbock-draw-me.firebaseio.com',
  projectId: 'danbock-draw-me',
  storageBucket: 'danbock-draw-me.appspot.com',
  messagingSenderId: '916539086618',
  appId: '1:916539086618:web:6ac1458ca7272db2b13ea3',
  measurementId: 'G-Y18WQMMJ2P',
})

export const storage = firebase.storage()
