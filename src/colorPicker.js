const data = [
  { color: "red" },
  { color: "blue" },
  { color: "green" },
  { color: "orange" },
];

const colors = [
  "yellow",
  "purple",
  "pink",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
];

let random = Math.floor(Math.random() * colors.length);
let picked = colors[random];

let check = () => {
  let duplicate = data.some((item) => item.color === picked);
  return duplicate;
};

let ans = check();
console.log(ans);
if (ans) {
  console.log("The color exists");
} else {
  console.log("The color does not exist");
}
