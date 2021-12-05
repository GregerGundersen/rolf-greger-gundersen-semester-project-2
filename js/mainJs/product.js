import { apiUrl, baseUrl } from "../constants.js";
import { getData } from "../utilFunctions.js";

const searchParam = new URLSearchParams(window.location.search);
const id = searchParam.get("id");

// console.log(baseUrl + apiUrl + "/" + id);
getData(baseUrl + apiUrl + "/" + id);
