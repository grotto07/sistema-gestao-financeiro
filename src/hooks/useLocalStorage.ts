import { Dispatch, SetStateAction, useEffect, useState } from "react";

function readStorage<T>(key: string, initialValue: T) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<{ key: string; value: T }>(() => ({
    key,
    value: readStorage(key, initialValue),
  }));

  useEffect(() => {
    setState({ key, value: readStorage(key, initialValue) });
  }, [key]);

  useEffect(() => {
    if (state.key === key) {
      localStorage.setItem(key, JSON.stringify(state.value));
    }
  }, [key, state]);

  const setValue: Dispatch<SetStateAction<T>> = (nextValue) => {
    setState((current) => ({
      key,
      value: typeof nextValue === "function" ? (nextValue as (value: T) => T)(current.key === key ? current.value : readStorage(key, initialValue)) : nextValue,
    }));
  };

  return [state.key === key ? state.value : readStorage(key, initialValue), setValue] as const;
}
