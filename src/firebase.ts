// Firebase App (the core Firebase SDK) is always required and must be listed first
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'
import * as firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/storage'
import { firebaseOptions } from './secret'

firebase.initializeApp(firebaseOptions)

export const storage = firebase.storage()
