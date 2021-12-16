import { baseUrl, apiUrl, heroCont } from "../constants.js";
import {
  getData,
  addToCart,
  loggedIn,
  hbIco,
  mobileNavigation,
} from "../utilFunctions.js";

loggedIn();

getData(baseUrl + "/home");

const featuredProducts = async () => {
  const featuredProds = document.querySelector(".recommend-prod");
  const response = await fetch(baseUrl + "/products");
  const json = await response.json();

  for (const product of json) {
    if (product.featured === true) {
      featuredProds.innerHTML += `
          <div class="featproducts-item_container">
            <a href="../product.html?id=${product.id}" class="product">
            <div class="product-img">
              <img src="${baseUrl + product.image.url}" alt="${
        product.title
      }" />
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
  }
};

featuredProducts();
