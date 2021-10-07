let obj1 = { start: "00:00", end: "00:11" };
let obj2 = { start: "00:05", end: "00:20" };

const convert = (start, end) => {
  let splitStart = start.split(":");
  let splitEnd = end.split(":");
  let startMinutes = +splitStart[0] * 60 + +splitStart[1];
  let endMinutes = +splitEnd[0] * 60 + +splitEnd[1];
  return { startMinutes, endMinutes };
};

const range = (min, max) => [...Array(max - min).keys()].map((i) => i + min);

let ans1 = convert(obj1.start, obj1.end);
let ans2 = convert(obj2.start, obj2.end);

let arr1 = range(ans1.startMinutes, ans1.endMinutes);
let arr2 = range(ans2.startMinutes, ans2.endMinutes);

console.log(`obj1: ${arr1}`);
console.log(`obj2: ${arr2}`);

const found = arr1.some((r) => arr2.includes(r));
console.log(`Do these overlap? ${found}`);
