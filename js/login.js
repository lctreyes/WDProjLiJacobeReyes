import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ============================
// FIREBASE CONFIG
// ============================
const firebaseConfig = {
    apiKey: "AIzaSyCswu6YR_Zcd4htvNaeuVEKqczw9GlrHSI",
    authDomain: "chiikarcade.firebaseapp.com",
    projectId: "chiikarcade",
    storageBucket: "chiikarcade.firebasestorage.app",
    messagingSenderId: "692701231363",
    appId: "1:692701231363:web:aba787e6712a167cd99136"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ============================
// DOM ELEMENTS
// ============================
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('doLoginBtn');
const toggleBtn = document.getElementById('toggleMode');
const loginTitle = document.getElementById('loginTitle');
const anonBtn = document.getElementById('anonBtn');

let isSignup = false;

// ============================
// TOGGLE LOGIN / SIGNUP MODE
// ============================
toggleBtn.addEventListener('click', () => {
    isSignup = !isSignup;
    loginTitle.innerText = isSignup ? "Sign Up!" : "Welcome!";
    loginBtn.innerText = isSignup ? "Create Account" : "Login";
    toggleBtn.innerText = isSignup ? "Have an account? Login" : "Sign Up instead?";
});

// ============================
// HANDLE LOGIN / SIGNUP
// ============================
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) return alert("Enter email and password!");

    loginBtn.innerText = "Processing...";

    try {
        if (isSignup) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }
        window.location.href = "./shop.html"; // go to shop after login/signup
    } catch (err) {
        alert(err.message);
        loginBtn.innerText = isSignup ? "Create Account" : "Login";
    }
});

// ============================
// JUST LOOKING AROUND BUTTON
// ============================
anonBtn.addEventListener('click', () => {
    window.location.href = "./index.html"; // redirect to home page
});

// ============================
// AUTOMATIC REDIRECT IF USER LOGGED IN
// ============================
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "./shop.html";
    }
});
