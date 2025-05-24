import { useState, useEffect } from "react";


export function useLocalStorageWithExpiry(key, defaultValue, ttl = 1800000) {
  const [value, setValue] = useState(() => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return item.value;
    } catch (e) {
      return defaultValue;
    }
  });

  useEffect(() => {
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl, // Время истечения
    };
    localStorage.setItem(key, JSON.stringify(item));
  }, [key, value, ttl]);

  return [value, setValue];
}
