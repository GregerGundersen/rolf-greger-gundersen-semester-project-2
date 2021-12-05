const tokenKey = "Token";
const userKey = "User";

export const saveToken = (token) => {
  saveToStorage(tokenKey, token);
};

export const getToken = () => {
  return getFromStorage(tokenKey);
};

export const saveUser = (user) => {
  saveToStorage(userKey, user);
};

export const getUsername = () => {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  } else return null;
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
  const value = localStorage.getItem(key);

  if (!value) {
    return [];
  } else {
    return JSON.parse(value);
  }
};
