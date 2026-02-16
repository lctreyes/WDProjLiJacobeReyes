const products = [
  { id: 1, name: "Darth Vader Barbie", price: 950, image: "./public/asset/darth vader.png" }, 
  { id: 2, name: "Beyoncé Barbie", price: 800, image: "./public/asset/beyonce.png" },
  { id: 3, name: "Zendaya Barbie", price: 800, image: "./public/asset/zendaya.png" },
  { id: 4, name: "Katy Perry Barbie", price: 800, image: "./public/asset/katy perry.png" },
  { id: 5, name: "Medusa Barbie", price: 750, image: "./public/asset/medusa.png" },
  { id: 6, name: "Aphrodite Barbie", price: 750, image: "./public/asset/aphrodite.png" },
  { id: 7, name: "Artemis Barbie", price: 750, image: "./public/asset/artemis.png" },
  { id: 8, name: "Athena Barbie", price: 750, image: "./public/asset/athena.png" },
  { id: 9, name: "Margot Robbie Barbie", price: 850, image: "./public/asset/margot barbie.png" },
  { id: 10, name: "Barbie", price: 500, image: "./public/asset/blue barbie.png" },
  { id: 11, name: "Ken", price: 500, image: "./public/asset/ken barbie.png" },
  { id: 12, name: "Skipper", price: 350, image: "./public/asset/skipper barbie.png" },
  { id: 13, name: "Stacie", price: 350, image: "./public/asset/stacie barbie.png" },
  { id: 14, name: "Chelsea", price: 350, image: "./public/asset/chelsea barbie.png" },
  { id: 15, name: "Travel Barbie", price: 250, image: "./public/asset/travel barbie.png" }
];

let cart = [];
let currentUser = null;

const productGrid = document.querySelector(".product-grid");
const cartCount = document.querySelector(".cart-count");
const cartPanel = document.querySelector(".cart-panel");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");
const viewCartBtn = document.querySelector(".cart-icon");
const closeCartBtn = document.querySelector(".close-cart");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./login.html";
  } else {
    currentUser = user;
    loadCart();
    updateCartCount();
    renderCart();
  }
});

function saveCart() {
  if (!currentUser) return;
  localStorage.setItem("cart_" + currentUser.uid, JSON.stringify(cart));
}

function loadCart() {
  if (!currentUser) return;
  const saved = localStorage.getItem("cart_" + currentUser.uid);
  cart = saved ? JSON.parse(saved) : [];
}

function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p class="price">₱${product.price}</p>
      <button class="btn" data-id="${product.id}">Add to Cart</button>
    `;
    productGrid.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartCount();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button class="decrease" data-id="${item.id}">-</button>
        <span>x${item.quantity}</span>
        <button class="increase" data-id="${item.id}">+</button>
        <button class="remove" data-id="${item.id}">🗑</button>
      </div>
      <span>₱${item.price * item.quantity}</span>
    `;

    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.textContent = `₱${total}`;
}

productGrid.addEventListener("click", e => {
  if (e.target.classList.contains("btn")) {
    addToCart(Number(e.target.dataset.id));
  }
});

cartItemsContainer.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("increase")) addToCart(id);
  if (e.target.classList.contains("decrease")) decreaseQuantity(id);
  if (e.target.classList.contains("remove")) removeFromCart(id);
});

viewCartBtn.addEventListener("click", () => {
  renderCart();
  cartPanel.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});

const logoutBtn = document.querySelector(".logout-link");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "./login.html";
    });
  });
}

renderProducts();
