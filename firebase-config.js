// ===================
// FIREBASE CONFIGURATION
// ===================

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getDatabase, ref, push, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'

// Firebase configuration - 請替換為您的實際配置
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
let app;
let database;

try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization failed:', error);
}

// Export Firebase functions to global scope for use in other scripts
window.firebaseDatabase = database;
window.firebaseRef = ref;
window.firebasePush = push;
window.firebaseServerTimestamp = serverTimestamp;

// Export for ES6 module usage
export { app, database, ref, push, serverTimestamp };