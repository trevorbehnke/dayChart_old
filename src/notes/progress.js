window.onload = getTime();

// Update every 1 second
setInterval(() => {
	getTime();
}, 1000);

// Clock Function
function getTime() {
	// Time variables
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	let currentSeconds = hours * 60 * 60 + minutes * 60 + seconds;
	const totalSeconds = 86400;
	let ratio = (currentSeconds / totalSeconds).toFixed(4);

	// SVG variables
	let width = 300;
	let viewBox = `0 0 ${width} ${width}`;
	let strokeWidth = 0.1 * width;
	let radius = width / 2 - strokeWidth / 2;
	let circumference = 2 * Math.PI * radius;
	let remaining = circumference * (1 - ratio);
	let cx = 0.5 * width;
	let cy = 0.5 * width;

	// Draw SVG
	document.querySelector(
		'#svg-container'
	).innerHTML = `<svg id="my-SVG" width="${width}" height="${width}" viewBox="${viewBox}">
  <circle
    id="circle1"
    cx="${cx}"
    cy="${cy}"
    r="${radius}"
    fill="none"
    stroke="rgb(256, 256, 256)"
    stroke-width="${strokeWidth}"
  />
  <circle
    id="circle2"
    cx="${cx}"
    cy="${cy}"
    r="${radius}"
    fill="none"
    stroke="rgb(78, 169, 255)"
    stroke-width="${strokeWidth}"
    stroke-dasharray="${circumference}"
    stroke-dashoffset="${remaining}"
  />
</svg>`;

	// Show Text
	document.querySelector('#text').innerHTML = `Today is ${ratio} Complete`;
}

<div id="svg-container"></div>;
