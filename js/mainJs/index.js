import { baseUrl, apiUrl, heroCont } from "../constants.js";
import { getData, navigationStyler } from "../utilFunctions.js";

// getHeader(baseUrl + "/home");
getData(baseUrl + "/home");
document.addEventListener("scroll", navigationStyler);
