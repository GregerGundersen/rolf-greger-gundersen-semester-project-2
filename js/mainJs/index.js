import { baseUrl, apiUrl, heroCont } from "../constants.js";
import { getData, navigationStyler, addToCart } from "../utilFunctions.js";

// getHeader(baseUrl + "/home");
getData(baseUrl + "/home");
document.addEventListener("scroll", navigationStyler);

const featuredProducts = async () => {
  const featuredProds = document.querySelector(".recommend-prod");
  const response = await fetch(baseUrl + "/products");
  const json = await response.json();

  for (const product of json) {
    if (product.featured === true) {
      console.log(product.title);
      featuredProds.innerHTML += `
          <div>
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
