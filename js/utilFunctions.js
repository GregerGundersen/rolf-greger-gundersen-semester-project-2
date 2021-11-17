import { baseUrl, apiUrl } from "./constants.js";

export const getHeader = async () => {
  const response = await fetch(baseUrl + "home");
  const json = await response.json();

  console.log(json);
};
