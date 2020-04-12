import React, { useState, useEffect } from "react";
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
  const [input, setInput] = useState("");

  const debouncedValue = useDebounce(input, debounce);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      className="Input"
      onChange={(event) => setInput(event.target.value)}
      type="text"
      value={input}
    />
  );
}

export default Input;
