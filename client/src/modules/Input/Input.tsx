import React, { useState, useEffect } from "react";

function useDebounce(value: any, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
}

interface Props {
  debounce: number;
  onChange: (value: string) => void;
}

function Input(props: Props) {
  const [input, setInput] = useState("");

  const debouncedValue = useDebounce(input, props.debounce);

  useEffect(() => {
    props.onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
    />
  );
}

export default Input;
