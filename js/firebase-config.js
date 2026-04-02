// js/firebase-config.js

// Firebase configuration placeholders
const firebaseConfig = {
  apiKey: "AIzaSyAtWJYuQ5lbHt5TY2ftJ6wsG5UHgifL1e0",
  authDomain: "fuafast-35f46.firebaseapp.com",
  projectId: "fuafast-35f46",
  storageBucket: "fuafast-35f46.firebasestorage.app",
  messagingSenderId: "872215051155",
  appId: "1:872215051155:web:115d4f38382e19c8ec4666"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log('🔥 Firebase successfully initialized!');
