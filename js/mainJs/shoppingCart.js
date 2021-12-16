import { shoppingCart, addCart, baseUrl } from "../constants.js";
import {
  printData,
  loggedIn,
  hbIco,
  mobileNavigation,
} from "../utilFunctions.js";

loggedIn();

// Calls printData directly as there is no need to fetch resources from the API.
printData();
