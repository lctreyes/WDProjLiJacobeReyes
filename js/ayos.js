// ============================
// BARBIELAT PRODUCTS
// ============================
const products = [
  { id: 1, name: "Dream Pink Dress", price: 500, image: "./public/asset/clothes12.jpg" },
  { id: 2, name: "Barbie Heels", price: 350, image: "./public/asset/clothes12.jpg" },
  { id: 3, name: "Ken Jacket", price: 650, image: "./public/asset/clothes12.jpg" },
  { id: 4, name: "Barbie Hat", price: 250, image: "./public/asset/clothes12.jpg" },
  { id: 5, name: "Pink Bag", price: 400, image: "./public/asset/clothes12.jpg" },
  { id: 6, name: "Sparkly Shoes", price: 300, image: "./public/asset/clothes12.jpg" },
  { id: 7, name: "Ken Shoes", price: 350, image: "./public/asset/clothes12.jpg" },
  { id: 8, name: "Barbie Sunglasses", price: 200, image: "./public/asset/clothes12.jpg" },
  { id: 9, name: "Pink Skirt", price: 450, image: "./public/asset/clothes12.jpg" },
  { id: 10, name: "Barbie Top", price: 400, image: "./public/asset/clothes12.jpg" },
  { id: 11, name: "Ken Shirt", price: 500, image: "./public/asset/clothes12.jpg" },
  { id: 12, name: "Barbie Jacket", price: 650, image: "./public/asset/clothes12.jpg" },
  { id: 13, name: "Pink Dress", price: 600, image: "./public/asset/clothes12.jpg" },
  { id: 14, name: "Barbie Necklace", price: 350, image: "./public/asset/clothes12.jpg" },
  { id: 15, name: "Ken Pants", price: 500, image: "./public/asset/clothes12.jpg" }
];

// ============================
// STATE
// ============================
let cart = [];

// ============================
// DOM ELEMENTS
// ============================
const productGrid = document.querySelector(".product-grid");
const cartCount = document.querySelector(".cart-count");
const cartPanel = document.querySelector(".cart-panel");
const cartItemsContainer = document.querySelector(".cart-items");
const totalPriceEl = document.getElementById("total-price");
const viewCartBtn = document.querySelector(".view-cart-btn");
const closeCartBtn = document.querySelector(".close-cart");

// ============================
// FIREBASE INIT (for login check)
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
// CHECK LOGIN STATUS
// ============================
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // redirect to login page if not logged in
        window.location.href = "./login.html";
    } else {
        console.log("User logged in:", user.email);
    }
});

// ============================
// RENDER PRODUCTS
// ============================
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

// ============================
// ADD TO CART
// ============================
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  renderCart();
}

// ============================
// UPDATE CART COUNT
// ============================
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// ============================
// RENDER CART
// ============================
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x${item.quantity}</span>
        <span>₱${item.price * item.quantity}</span>
      </div>
    `;
  });

  totalPriceEl.textContent = `₱${total}`;
}

// ============================
// EVENT LISTENERS
// ============================
productGrid.addEventListener("click", e => {
  if (e.target.classList.contains("btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

viewCartBtn.addEventListener("click", () => {
  cartPanel.classList.add("active");
  renderCart();
});

closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});

// ============================
// LOGOUT BUTTON
// ============================
const logoutBtn = document.querySelector(".logout-link");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "./login.html";
    });
  });
}

// ============================
// INIT
// ============================
renderProducts();
updateCartCount();
renderCart();
