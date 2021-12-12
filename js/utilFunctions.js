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
import { saveToken, saveUser } from "./localStorage.js";

// Adds a listener to all add to cart buttons on the products page
export const addToCart = () => {
  const cartBtns = document.querySelectorAll(".product-details_addcart");

  for (const btn of cartBtns) {
    btn.addEventListener("click", () => {
      getForCart(baseUrl + "/products/" + event.target.id);
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

// Changes color for the navigation when it is past the hero image so it's not white text on white bg.
export const navigationStyler = () => {
  const rect = heroCont.getBoundingClientRect();
  if (rect.bottom < 40) {
    for (const elem of navCont) {
      elem.style.color = "black";
    }
  } else if (rect.bottom > 40) {
    for (const elem of navCont) {
      elem.style.color = "white";
    }
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
        <div>
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
      </div>
  `;
    // PRODUCT ADMINISTRATION/UPDATING
  } else if (location.pathname == "/productedit.html") {
    for (const product of data) {
      editProdCont.innerHTML += `
        <a href="../editform.html?id=${product.id}" class="editprod-list_products">
          <p>${product.id}</p>
          <p>${product.title}</p>
          <p>${product.price} kr</p>
          <i class="far fa-trash-alt"></i>
        </a>
    `;
    }
    // SHOPPING CART - Prints based on data from localStorage
  } else if (location.pathname == "/shoppingcart.html") {
    let cartArr = JSON.parse(localStorage.getItem("cart"));
    for (const item of cartArr) {
      shoppingCart.innerHTML += `
        <div class="shoppingcart-item">
            <div class="shoppingcart-item_image">
                <img src="${baseUrl + item.image.url}">
            </div>
            <a href="../product.html?id=${item.id}" >${item.title}</a>
            <p>${item.price}</p>
        </div>
  `;
    }
  }
};

// Used for searching the array for objects with an identical value.
Array.prototype.indexOfObject = function (property, value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i][property] === value) return i;
  }
  return -1;
};
