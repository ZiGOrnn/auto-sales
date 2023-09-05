export enum LocalStorage {
  Token = "token",
  Tutorial = "tutorial",
}

export const setLocalStorage = <T>(key: LocalStorage, fallbackValue: T) => {
  let value: string;
  if (typeof fallbackValue === "string") {
    value = fallbackValue;
  } else {
    value = JSON.stringify(fallbackValue);
  }
  localStorage.setItem(key, value);

  return fallbackValue;
};

export const getLocalStorage = <T>(key: LocalStorage) => {
  const stored = localStorage.getItem(key);
  const value = stored ? JSON.parse(stored) : null;

  return value;
};
