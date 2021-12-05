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
} from "./constants.js";

import { saveToken, saveUser } from "./localStorage.js";

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
  }
};

// Reusable function that prints HTML based on the data received from getData() and current path.
const printData = (data) => {
  if (location.pathname == "/" || location.pathname == "/index.html") {
    heroCont.innerHTML = `
      <img class="c-hero__image" src="${baseUrl + data.hero_banner.url}" alt="${
      data.hero_banner_alt_text
    }" />
  `;
  } else if (location.pathname == "/products.html") {
    for (const product of data) {
      productsCont.innerHTML += `
        <div>
          <a href="../product.html?id=${product.id}" class="product">
          <div class="product-img">
            <img src="${baseUrl + product.image.url}" alt="${product.title}" />
          </div>
          <div class="product-details">
            <h2>${product.title}</h2>
            <p>${product.price}kr</p>
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
  } else if (location.pathname == "/product.html") {
    detailsCont.innerHTML = `
      <div class="details-image">
        <img src="${baseUrl + data.image.url}" />
      </div>
      <h2>${data.title}</h2>
      <p>${data.price}kr</p>
      <p>${data.description}</p>
  `;
  } else if (location.pathname == "/productedit.html") {
    for (const product of data) {
      editProdCont.innerHTML += `
        <a href="../editform.html?id=${product.id}" class="editprod-list_products">
          <p>${product.id}</p>
          <p>${product.title}</p>
          <p>${product.price}</p>
          <i class="far fa-trash-alt"></i>
        </a>
    `;
    }
  }
};

// Adds a listener to all add to cart buttons
const addToCart = () => {
  const cartBtns = document.querySelectorAll(".product-details_addcart");

  for (const btn of cartBtns) {
    btn.addEventListener("click", () => {
      getForCart(baseUrl + "/products/" + event.target.id);
    });
  }
};
// Used for searching the array for objects with an identical value.
Array.prototype.indexOfObject = function (property, value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i][property] === value) return i;
  }
  return -1;
};

// Array for temporarily holding object for localStorage.
let cart = [];

// Checks for items in localStorage an makes sure the cart variable and localStorage match.
const cartArray = JSON.parse(localStorage.getItem("cart"));
if (!cartArray) {
  localStorage.setItem("cart", JSON.stringify(cart));
} else if (cartArray) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

// if (!cartArray) {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// Fetches a product using the ID, then adds/removes it from array.
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

  // cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
};

// Validates e-mail input for the log-in/admin page, and returns an error message if incorrect.

export const emailCheck = (email) => {
  return emailRegEx.test(email);
};

// Submits the login form
export const formSubmit = (event) => {
  event.preventDefault();

  logIn(eMail.value, password.value);
};

// Sends a request to the API with credentials from the login form
export const logIn = async (username, password) => {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/productedit.html";
    }
  } catch (error) {
    console.log(error);
  }
};
