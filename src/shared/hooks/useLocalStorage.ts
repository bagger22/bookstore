import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T, parseFunction?: (value: string) => T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return parseFunction ? parseFunction(storedItem) : JSON.parse(storedItem);
    }
    return initialValue;
  });

  const setValue = (value: T | ((prevValue: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setValue];
};
