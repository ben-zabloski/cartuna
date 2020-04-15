import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Input.css";

function useDebounce(value: any, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface Props {
  debounce: number;
  onChange: (value: string) => void;
}

function Input({ debounce, onChange }: Props) {
  const initializedRef = useRef(false);
  const [input, setInput] = useState("");

  const inputOnChangeHandler = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  const debouncedValue = useDebounce(input, debounce);

  useEffect(() => {
    if (initializedRef.current === false) {
      initializedRef.current = true;
      return;
    }

    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      className="Input"
      onChange={inputOnChangeHandler}
      type="text"
      value={input}
    />
  );
}

export default Input;
