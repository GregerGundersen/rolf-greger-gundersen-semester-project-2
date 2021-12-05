import { shoppingCart, addCart, baseUrl } from "../constants.js";
console.log(shoppingCart);
// Shopping Cart

const printCart = () => {
  let cartArr = JSON.parse(localStorage.getItem("cart"));
  console.log(cartArr);

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
};

printCart();
