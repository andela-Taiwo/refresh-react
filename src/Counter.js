import React, { useState, useEffect } from 'react';

const inc = (step, count, max, key) => {
  if (count >= max) return getStateFromLocalStorage(key);
  return getStateFromLocalStorage(key) + step;
};

const getStateFromLocalStorage = (key) => {
  const storage = localStorage.getItem(key);
  if (storage) return JSON.parse(storage)[key];
  return 0;
};
const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage);
    }
    return initialState;
  };
  const [value, setValue] = useState(get());
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);
  return [value, setValue];
};
const storeStateInLocalStorage = (count) => {
  localStorage.setItem('counterState', JSON.stringify({ count }));
};
const Counter = ({ max, step }) => {
  // const [count, setCount] = useState(getStateFromLocalStorage());

  const [count, setCount] = useLocalStorage(0, 'count');

  const increment = () => {
    // setCount(inc(step, count, max, 'count'));
    setCount((c) => {
      if (c >= max) return c;
      return c + step;
    });
  };
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);
  useEffect(() => {
    document.title = `counter: ${count}`;
  }, [count]);

  // useEffect(() => {
  //   storeStateInLocalStorage(count)
  // }, [count])

  // useEffect()

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
