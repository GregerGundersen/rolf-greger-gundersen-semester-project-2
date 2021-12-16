import {
  heroCont,
  baseUrl,
  navCont,
  productsCont,
  detailsCont,
  apiUrl,
  emailRegEx,
  eMail,
  password,
  editProdCont,
  addCart,
  shoppingCart,
} from "./constants.js";
import { getToken, getUsername, saveToken, saveUser } from "./localStorage.js";

// Check for log-in
export const loggedIn = () => {
  const logInNav = document.querySelector("#logInNav");
  const userName = getUsername();
  if (userName && location.href == "http://127.0.0.1:5500/productedit.html") {
    logInNav.innerHTML = `<a id="activelink" href="../productedit.html" >${userName}</a>`;
  } else if (userName) {
    logInNav.innerHTML = `<a href="../productedit.html" >${userName}</a>`;
  }
  return;
};

// Mobile navigation
export const hbIco = document.querySelector(".fa-bars");
export const navigation = document.querySelector(".c-menu-navigation");
export const navList = document.querySelector(".c-menu-navigation__list");
export const navElems = document.querySelectorAll(
  ".c-menu-navigation__list li"
);
export const mobileNavigation = () => {
  if (navList.style.display == "" || navList.style.display == "none") {
    navList.style.display = "block";
    navList.style.marginTop = "0";
    navigation.style.gridColumn = "1/ span 2";
    for (const elem of navElems) {
      elem.style.textAlign = "center";
      elem.style.width = "100%";
      elem.style.margin = "20px 0";
    }
  } else if (navList.style.display == "block") {
    navList.style.display = "none";
  }
};
hbIco.addEventListener("click", mobileNavigation);

// Adds a listener to all add to cart buttons on the products page
export const addToCart = () => {
  const cartBtns = document.querySelectorAll(".product-details_addcart");

  for (const btn of cartBtns) {
    btn.addEventListener("click", () => {
      getForCart(baseUrl + "/products/" + event.target.id);
    });
  }
};

// Adds a listener to the delete button on the manage products page
const deleteListener = () => {
  const deleteBtns = document.querySelectorAll(".fa-trash-alt");
  console.log(deleteBtns);

  for (const btn of deleteBtns) {
    btn.addEventListener("click", async () => {
      const url = baseUrl + "/products/" + event.target.id;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const json = await response.json();
      alert("Product deleted");
      location.reload();
    });
  }
};

// SHOPPING CART: Array for temporarily holding object for localStorage.
let cart = [];

// SHOPPING CART: Checks for items in localStorage and makes sure the cart variable and localStorage match.
export const checkArray = () => {
  const cartArray = JSON.parse(localStorage.getItem("cart"));
  if (!cartArray) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else if (cartArray) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
};
checkArray();

// SHOPPING CART: Fetches a product using the ID, then adds/removes it from array.
const getForCart = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  if (cart.indexOfObject("id", parseInt(json.id)) === -1) {
    cart.push(json);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart.splice(cart[cart.indexOfObject("id", parseInt(json.id))], 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Reusable function that fetches data for all the pages based on current path.
export const getData = async (url) => {
  const response = await fetch(url);
  const json = await response.json();

  if (location.pathname == "/" || location.pathname == "/index.html") {
    // printHeader(json);
    printData(json);
  } else if (location.pathname == "/products.html") {
    printData(json);
  } else if (location.pathname == "/product.html") {
    printData(json);
  } else if (location.pathname == "/productedit.html") {
    printData(json);
  } else if (location.pathname == "/shoppingcart.html") {
    printData(json);
  }
};

// Reusable function that prints HTML based on the data received from getData() and current path.
export const printData = (data) => {
  // INDEX/HOME PAGE
  if (location.pathname == "/" || location.pathname == "/index.html") {
    heroCont.innerHTML = `
      <img class="c-hero__image" src="${baseUrl + data.hero_banner.url}" alt="${
      data.hero_banner_alt_text
    }" />
  `;
    // PRODUCTS PAGE
  } else if (location.pathname == "/products.html") {
    for (const product of data) {
      productsCont.innerHTML += `
        <div class="products-item_container">
          <a href="../product.html?id=${product.id}" class="product">
          <div class="product-img">
            <img src="${baseUrl + product.image.url}" alt="${product.title}" />
          </div>
          <div class="product-details">
            <h2 class="product-details_title">${product.title}</h2>
            <p class="product-details_price">${product.price} kr</p>
          </div>
          </a>
          <div id="${
            product.id
          }" class="product-details_addcart">Toggle cart<i class="fas fa-cart-plus"></i>
          </div>
        </div>
    `;
    }
    addToCart();
    // DETAIL PAGE
  } else if (location.pathname == "/product.html") {
    detailsCont.innerHTML = `
      <div class="details-image">
        <img src="${baseUrl + data.image.url}" />
      </div>
      <div class="details-info">
        <h2 class="details-info_title">${data.title}</h2>
        <p class="details-info_price">${data.price} kr</p>
        <p class="details-info_description">${data.description}</p>
                  <div id="${
                    data.id
                  }" class="product-details_addcart">Toggle cart<i class="fas fa-cart-plus"></i>
      </div>
  `;
    addToCart();
    // PRODUCT ADMINISTRATION/UPDATING
  } else if (location.pathname == "/productedit.html") {
    for (const product of data) {
      editProdCont.innerHTML += `
      <div class="editprod-list_container">
        <a href="../editform.html?id=${product.id}" class="editprod-list_products">
          <p>${product.id}</p>
          <p>${product.title}</p>
          <p>${product.price} kr</p>
             </a>
          <i id="${product.id}" class="far fa-trash-alt"></i>
          </div>
     
    `;
    }
    deleteListener();
    // SHOPPING CART - Prints based on data from localStorage
  } else if (location.pathname == "/shoppingcart.html") {
    let cartArr = JSON.parse(localStorage.getItem("cart"));
    let totalsum = 0;
    for (const item of cartArr) {
      totalsum += item.price;
      shoppingCart.innerHTML += `
        <div class="shoppingcart-item">
            <div class="shoppingcart-item_image">
                <img src="${baseUrl + item.image.url}">
            </div>
            <a href="../product.html?id=${item.id}" >${item.title}</a>
            <p>${item.price} kr</p>
        </div>
  `;
    }
    shoppingCart.innerHTML += `
      <p class="shoppingcart-sum">Total sum: ${totalsum}</p>
      <button class="shoppingcart-checkout">Checkout</button>
    `;
  }
};

// Used for searching the array for objects with an identical value.
Array.prototype.indexOfObject = function (property, value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i][property] === value) return i;
  }
  return -1;
};
