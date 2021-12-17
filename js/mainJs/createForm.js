import {
  baseUrl,
  editProdDesc,
  editProdFeatured,
  editProdName,
  editProdPrice,
  editProdId,
  editProdForm,
  editProdImage,
} from "../constants.js";
import { getToken, getUsername } from "../localStorage.js";
import { loggedIn } from "../utilFunctions.js";

const reDirect = () => {
  const userName = getUsername();
  if (!userName) {
    location.href = "../../admin.html";
  }
};

reDirect();

loggedIn();

const productUrl = baseUrl + "/products/";

//Updates values
const postProduct = async (name, price, description, id, featured) => {
  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured: featured,
    id: id,
  });
  const token = getToken();
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(productUrl, options);
  const json = await response.json();
  console.log(json);
  alert("Product created");
  location.href = "../../productedit.html";
};

const submitCreateForm = () => {
  event.preventDefault();
  let featured;
  const name = editProdName.value.trim();
  const description = editProdDesc.value.trim();
  const id = parseInt(editProdId.value);

  if (editProdFeatured.checked === true) {
    featured = true;
  } else {
    featured = false;
  }

  if (
    name.length === 0 ||
    editProdPrice.value.length === 0 ||
    isNaN(editProdPrice.value) ||
    description.length === 0
  ) {
    return alert("Invalid values");
  }

  postProduct(name, editProdPrice.value, description, id, featured);
};
editProdForm.addEventListener("submit", submitCreateForm);
