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
      value.sort((a, b) =>
        a.start > b.start ? 1 : b.start > a.start ? -1 : 0
      );
      return set(value);
    },
    update,
  };
};

const initial = [
  { id: 1, name: "Repeat", start: "13:00", end: "14:00", completed: false },
  { id: 2, name: "Sleep", start: "11:00", end: "12:00", completed: false },
  { id: 3, name: "Code", start: "12:00", end: "13:00", completed: false },
  { id: 4, name: "Eat", start: "10:00", end: "11:00", completed: false },
];

export const todos = localStore("data", initial);
