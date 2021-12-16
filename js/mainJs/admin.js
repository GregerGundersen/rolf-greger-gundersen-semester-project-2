import { eMail, password, logInForm, baseUrl } from "../constants.js";
import { saveToken, saveUser } from "../localStorage.js";
import { loggedIn, hbIco, mobileNavigation } from "../utilFunctions.js";

loggedIn();

// Submits the login form
const formSubmit = (event) => {
  event.preventDefault();

  logIn(eMail.value, password.value);
};

// Sends a request to the API with credentials from the login form
const logIn = async (username, password) => {
  const url = baseUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/productedit.html";
    }
  } catch (error) {
    console.log(error);
  }
};

logInForm.addEventListener("submit", formSubmit);
