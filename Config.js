import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA-K8-mHAjYfN5axx7_F1XFHuYiahCUKNo",
    authDomain: "expo-ecommerce-d1fb6.firebaseapp.com",
    projectId: "expo-ecommerce-d1fb6",
    storageBucket: "expo-ecommerce-d1fb6.appspot.com",
    messagingSenderId: "1017892979025",
    appId: "1:1017892979025:web:518764ebf26bb9d5641370",
    measurementId: "G-Y1LWWRLEQT"
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
let firebase_auth;
try {
  firebase_auth = getAuth(app);
} catch (error) {
  // If Auth is not initialized, initialize it with persistence
  firebase_auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { app, firebase_auth };