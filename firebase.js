// firebase.js (Standard Initialization for Firebase v9.21.0 - with Logging)
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

console.log("firebase.js: Script start. Platform:", Platform.OS);

// 🔑 Your Firebase config - **PLEASE DOUBLE-CHECK THESE VALUES FROM YOUR FIREBASE CONSOLE**
const firebaseConfig = {
    apiKey: "AIzaSyCeQqCtbFEB9nrUvP_Pffrt2aelATf9i9o",
    authDomain: "loch-lomond-travel.firebaseapp.com",
    projectId: "loch-lomond-travel",
    storageBucket: "loch-lomond-travel.firebasestorage.app",
    messagingSenderId: "500767842880",
    appId: "1:500767842880:web:b27b5630eed50e6ea4f5a5",
    measurementId: "G-D46EKN8EDZ"
};

let app;
let authInstance;
let dbInstance;
let storageInstance;
let initializationError = null; // Track initialization errors

try {
    console.log("firebase.js: Attempting initializeApp()...");
    app = initializeApp(firebaseConfig);
    console.log("firebase.js: initializeApp() SUCCEEDED. App name:", app.name);

    try {
        console.log("firebase.js: Attempting to initialize Auth with persistence...");
        // For React Native, AsyncStorage is the persistence layer.
        authInstance = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
        console.log("firebase.js: initializeAuth() with persistence SUCCEEDED.");
    } catch (authError) {
        console.error("firebase.js: initializeAuth() FAILED:", authError);
        initializationError = authError; // Store the error
        authInstance = null; // Ensure it's null on failure
    }

    // Initialize Firestore and Storage only if app initialization succeeded
    if (app) {
        console.log("firebase.js: Initializing Firestore...");
        dbInstance = getFirestore(app);
        console.log("firebase.js: Firestore initialized.");

        console.log("firebase.js: Initializing Storage...");
        storageInstance = getStorage(app);
        console.log("firebase.js: Storage initialized.");
    } else {
        // This case should ideally not be reached if initializeApp throws, but good practice
        dbInstance = null;
        storageInstance = null;
        if (!initializationError) { // If app failed without throwing specific error
            initializationError = new Error("Firebase app instance is null after initializeApp attempt.");
        }
    }

} catch (error) {
    console.error("firebase.js: CRITICAL - Firebase initializeApp() FAILED:", error);
    initializationError = error; // Store the error
    app = null;
    authInstance = null;
    dbInstance = null;
    storageInstance = null;
}

// Export the instances (or null/undefined if they failed)
export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
// Export the error status as well, App.js can check this
export const firebaseInitializationError = initializationError;

console.log("firebase.js: Module exports prepared.");
if (firebaseInitializationError) console.error("firebase.js: Firebase initialization failed. Error:", firebaseInitializationError);
if (!auth) console.warn("firebase.js: Exported 'auth' is NULL or UNDEFINED.");
if (!db) console.warn("firebase.js: Exported 'db' is NULL or UNDEFINED.");
if (!storage) console.warn("firebase.js: Exported 'storage' is NULL or UNDEFINED.");