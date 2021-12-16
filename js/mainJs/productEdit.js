import { editProdCont, baseUrl } from "../constants.js";
import {
  getData,
  loggedIn,
  hbIco,
  mobileNavigation,
} from "../utilFunctions.js";
import { getUsername } from "../localStorage.js";
const logOutBtn = document.querySelector("#logOutBtn");

logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("Token");
  localStorage.removeItem("User");
  location.href = "../../index.html";
});

const reDirect = () => {
  const userName = getUsername();
  if (!userName) {
    location.href = "../../admin.html";
  }
};

reDirect();

loggedIn();

getData(baseUrl + "/products");
