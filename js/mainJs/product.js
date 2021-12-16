import { apiUrl, baseUrl } from "../constants.js";
import {
  getData,
  loggedIn,
  hbIco,
  mobileNavigation,
  addToCart,
} from "../utilFunctions.js";

loggedIn();

const searchParam = new URLSearchParams(window.location.search);
const id = searchParam.get("id");

// console.log(baseUrl + apiUrl + "/" + id);
getData(baseUrl + apiUrl + "/" + id);
