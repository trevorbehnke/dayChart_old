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
  {
    id: 1,
    name: "Eat",
    start: "06:00",
    end: "07:00",
    color: "red",
    completed: false,
  },
  {
    id: 2,
    name: "Code",
    start: "09:00",
    end: "12:00",
    color: "blue",
    completed: false,
  },
  {
    id: 3,
    name: "Sleep",
    start: "15:00",
    end: "17:00",
    color: "green",
    completed: false,
  },
  {
    id: 4,
    name: "Repeat",
    start: "20:00",
    end: "00:00",
    color: "orange",
    completed: false,
  },
];

export const todos = localStore("data", initial);
