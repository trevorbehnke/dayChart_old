let obj1 = { start: "00:00", end: "06:00" };
let obj2 = { start: "06:00", end: "12:00" };
let obj3 = { start: "12:00", end: "18:00" };
let obj4 = { start: "18:00", end: "00:00" };

// Total minutes in 1 day
const TOTAL_MIN = 1440;

// Function to convert object time to minutes and radians
const convert = (start, end, color) => {
  let splitStart = start.split(":");
  let splitEnd = end.split(":");
  let startMinutes = +splitStart[0] * 60 + +splitStart[1];
  let endMinutes = +splitEnd[0] * 60 + +splitEnd[1];
  let startRadians = (startMinutes / TOTAL_MIN) * 360 * (Math.PI / 180);
  let endRadians = (endMinutes / TOTAL_MIN) * 360 * (Math.PI / 180);
  return {
    startMinutes,
    endMinutes,
    createArc: createArc(startRadians, endRadians, color),
  };
};

// Function to create arc on canvas
const createArc = (start, end, color) => {
  ctx.beginPath();
  ctx.arc(200, 200, 150, start, end);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.stroke();
};

// Initialize Canvas
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let a = convert(obj1.start, obj1.end, "blue");
console.log(a.endMinutes);
convert(obj2.start, obj2.end, "red");
convert(obj3.start, obj3.end, "green");
convert(obj4.start, obj4.end, "orange");

// Range of object in minutes
// const range = (min, max) => [...Array(max - min).keys()].map((i) => i + min);

// let arr1 = range(ans1.startMinutes, ans1.endMinutes);
// let arr2 = range(ans2.startMinutes, ans2.endMinutes);

// console.log(`obj1: ${arr1}`);
// console.log(`obj2: ${arr2}`);
// const found = arr1.some((r) => arr2.includes(r));
// console.log(`Do these overlap? ${found}`);
