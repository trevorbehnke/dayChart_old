// localStore.js
import { writable } from "svelte/store";

export const localStore = (key, initial) => {
  const toString = (value) => JSON.stringify(value, null, 2);

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initial));
  }

  const { subscribe, set, update } = writable(
    JSON.parse(localStorage.getItem(key))
  );

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
  };
};

const initial = [
  { id: 1, name: "Eat", completed: false },
  { id: 2, name: "Sleep", completed: false },
  { id: 3, name: "Code", completed: false },
  { id: 4, name: "Repeat", completed: false },
];

export const todos = localStore("data", initial);
