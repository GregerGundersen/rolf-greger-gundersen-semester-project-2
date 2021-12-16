import {
  getData,
  printData,
  addToCart,
  checkArray,
  loggedIn,
  hbIco,
  mobileNavigation,
} from "../utilFunctions.js";
import { apiUrl, baseUrl, productsCont } from "../constants.js";
const nameFilter = document.querySelector("#prod-list-filters_name");

console.log(hbIco);

loggedIn();

// Gets the products array and prints the HTML
getData(baseUrl + apiUrl);

// Checks for items in localStorage and makes sure the cart variable and localStorage match.
checkArray();

export const filterProducts = () => {
  const searchQuery = nameFilter.value;
  getFiltered(baseUrl, searchQuery);
};

const getFiltered = async (url, parameter) => {
  const response = await fetch(`${url}/products?title_contains=${parameter}`);
  const json = await response.json();
  productsCont.innerHTML = "";
  for (const product of json) {
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
};

// getFiltered(baseUrl, "Adidas");

nameFilter.addEventListener("keyup", filterProducts);
