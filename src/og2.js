let obj1 = { start: "00:00", end: "06:00" };
let obj2 = { start: "06:00", end: "12:00" };
let obj3 = { start: "12:00", end: "18:00" };
let obj4 = { start: "18:00", end: "00:00" };

// Total minutes in 1 day
const TOTAL_MIN = 1440;

// Function to convert object time to minutes and radians
const convert = (start, end) => {
  let splitStart = start.split(":");
  let splitEnd = end.split(":");
  let startMinutes = +splitStart[0] * 60 + +splitStart[1];
  let endMinutes = +splitEnd[0] * 60 + +splitEnd[1];
  let startRadians = (startMinutes / TOTAL_MIN) * 360 * (Math.PI / 180);
  let endRadians = (endMinutes / TOTAL_MIN) * 360 * (Math.PI / 180);

  return { startMinutes, endMinutes, startRadians, endRadians };
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

// Convert the object
let obj1Convert = convert(obj1.start, obj1.end);
let obj2Convert = convert(obj2.start, obj2.end);
let obj3Convert = convert(obj3.start, obj3.end);
let obj4Convert = convert(obj4.start, obj4.end);

// Create arc on canvas
createArc(obj1Convert.startRadians, obj1Convert.endRadians, "blue");
createArc(obj2Convert.startRadians, obj2Convert.endRadians, "red");
createArc(obj3Convert.startRadians, obj3Convert.endRadians, "green");
createArc(obj4Convert.startRadians, obj4Convert.endRadians, "orange");

// Range of object in minutes
// const range = (min, max) => [...Array(max - min).keys()].map((i) => i + min);

// let arr1 = range(ans1.startMinutes, ans1.endMinutes);
// let arr2 = range(ans2.startMinutes, ans2.endMinutes);

// console.log(`obj1: ${arr1}`);
// console.log(`obj2: ${arr2}`);
// const found = arr1.some((r) => arr2.includes(r));
// console.log(`Do these overlap? ${found}`);
