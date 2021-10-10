const data = [
	{ start: '00:00', end: '04:00', color: 'red' },
	{ start: '06:00', end: '08:00', color: 'blue' },
	{ start: '9:00', end: '12:00', color: 'green' },
	{ start: '12:00', end: '13:00', color: 'orange' },
	{ start: '15:00', end: '19:00', color: 'yellow' },
	{ start: '19:00', end: '20:00', color: 'purple' },
	{ start: '22:00', end: '00:00', color: 'pink' }
];

// Initialize Canvas
let c = document.getElementById('myCanvas');
let ctx = c.getContext('2d');

// Total minutes in 1 day
const TOTAL_MIN = 1440;

// Function to convert object time to minutes and radians
const convert = (start, end, color) => {
	let splitStart = start.split(':');
	let splitEnd = end.split(':');
	let minStart = +splitStart[0] * 60 + +splitStart[1];
	let minEnd = +splitEnd[0] * 60 + +splitEnd[1];
	let radStart = (minStart / TOTAL_MIN) * 360 * (Math.PI / 180);
	let radEnd = (minEnd / TOTAL_MIN) * 360 * (Math.PI / 180);
	return {
		minStart,
		minEnd,
		createArc: createArc(radStart, radEnd, color)
	};
};

// Function to create arc on canvas
const createArc = (start, end, color) => {
	ctx.beginPath();
	ctx.arc(200, 200, 150, start, end);
	ctx.strokeStyle = color;
	ctx.lineWidth = 30;
	ctx.stroke();
};

// For each
data.forEach(({ start, end, color }) => {
	convert(start, end, color);
});

// Range of object in minutes
// const range = (min, max) => [...Array(max - min).keys()].map((i) => i + min);

// let arr1 = range(ans1.startMinutes, ans1.endMinutes);
// let arr2 = range(ans2.startMinutes, ans2.endMinutes);

// console.log(`obj1: ${arr1}`);
// console.log(`obj2: ${arr2}`);
// const found = arr1.some((r) => arr2.includes(r));
// console.log(`Do these overlap? ${found}`);
