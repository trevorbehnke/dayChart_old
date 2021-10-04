// stores.js
import { writable } from "svelte/store";
import { localStore } from "./localStore.js";

export const alert = writable("Welcome to the To-Do list app!");

const initial = [
  { id: 1, name: "Eat", completed: false },
  { id: 2, name: "Sleep", completed: false },
];

export const todos = localStore("data", initial);
