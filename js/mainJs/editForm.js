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
import { getToken } from "../localStorage.js";
import { loggedIn, hbIco, mobileNavigation } from "../utilFunctions.js";
import { getUsername } from "../localStorage.js";

const reDirect = () => {
  const userName = getUsername();
  if (!userName) {
    location.href = "../../admin.html";
  }
};

reDirect();

loggedIn();
const searchParam = new URLSearchParams(window.location.search);
const id = searchParam.get("id");
const productUrl = baseUrl + "/products/" + id;

const getProduct = async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  editProdName.value = json.title;
  editProdId.value = json.id;
  editProdDesc.value = json.description;
  editProdPrice.value = json.price;
  editProdImage.value = json.image.url;
  editProdFeatured.checked = json.featured;
};

getProduct(productUrl);

const putProduct = async (name, price, description, id, featured, url) => {
  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured: featured,
    id: id,
    image_url: url,
  });
  const token = getToken();
  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(productUrl, options);
  const json = await response.json();
  console.log(response);
  console.log(json);
};

const submitEditForm = () => {
  event.preventDefault();
  let featured;
  const name = editProdName.value.trim();
  const description = editProdDesc.value.trim();
  const id = parseInt(editProdId.value);
  const url = editProdImage.value.trim();

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
  putProduct(name, editProdPrice.value, description, id, featured, url);
  alert("Success");
  location.href = "../../productedit.html";
};

editProdForm.addEventListener("submit", submitEditForm);
