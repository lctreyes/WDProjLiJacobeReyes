import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCswu6YR_Zcd4htvNaeuVEKqczw9GlrHSI",
    authDomain: "barbiedreamhouse.firebaseapp.com",
    projectId: "barbiedreamhouse",
    storageBucket: "barbiedreamhouse.firebasestorage.app",
    messagingSenderId: "692701231363",
    appId: "1:692701231363:web:aba787e6712a167cd99136"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('doLoginBtn');
const toggleBtn = document.getElementById('toggleMode');
const loginTitle = document.getElementById('loginTitle');
const anonBtn = document.getElementById('anonBtn');

let isSignup = false;


toggleBtn.addEventListener('click', () => {
    isSignup = !isSignup;

    loginTitle.innerText = isSignup 
        ? "Join the Dreamhouse 💖" 
        : "Welcome Barbie ✨";

    loginBtn.innerText = isSignup 
        ? "Create Dream Account 💅" 
        : "Enter Dreamhouse 💗";

    toggleBtn.innerText = isSignup 
        ? "Already a Barbie? Login 💞" 
        : "New here? Become a Barbie 💄";
});

loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) 
        return alert("Please enter your Dreamhouse email & password 💌");

    loginBtn.innerText = "Sprinkling Glitter... ✨";

    try {
        if (isSignup) {
            await createUserWithEmailAndPassword(auth, email, password);
        } else {
            await signInWithEmailAndPassword(auth, email, password);
        }

        // Redirect to Barbie Shop after login/signup
        window.location.href = "./shop.html";

    } catch (err) {
        alert("Oops Barbie! 💔 " + err.message);
        loginBtn.innerText = isSignup 
            ? "Create Dream Account 💅" 
            : "Enter Dreamhouse 💗";
    }
});

anonBtn.addEventListener('click', () => {
    window.location.href = "./index.html"; 
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "./shop.html";
    }
});
