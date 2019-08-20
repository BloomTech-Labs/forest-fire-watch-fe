import React, {useState} from "react"

//should be used for storing token
//and anything else that needs to be persisted in local storage

export default useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    });
    const setValue = value => {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    };
    return [storedValue, setValue];
  };