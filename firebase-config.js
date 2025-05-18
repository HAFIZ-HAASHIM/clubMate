// Import the Firebase SDK
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_QOoRUMoP9_Arorjs01EfQrLeWU22gmA",
    authDomain: "clubmate-2e45a.firebaseapp.com",
    projectId: "clubmate-2e45a",
    storageBucket: "clubmate-2e45a.appspot.com", // Fixed storage bucket URL
    messagingSenderId: "739318757724",
    appId: "1:739318757724:web:60d21fce740ee65b54a999"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Make services available globally
window.clubMateAuth = auth;
window.clubMateDb = db;

console.log("Firebase config loaded and initialized");

// Check if a user is already authenticated
auth.onAuthStateChanged(function(user) {
    console.log("Initial auth check:", user ? "User already logged in" : "No user");
    
    // If on dashboard page and auth check overlay exists, hide it
    if (user && document.getElementById("auth-check")) {
        console.log("User authenticated, hiding auth check overlay");
        setTimeout(function() {
            document.getElementById("auth-check").classList.add("hidden");
        }, 1000); // Small delay to ensure DOM is ready
    }
});
