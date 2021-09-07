"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
	document.querySelector("input").addEventListener("input", getSelectedColor);
}

function getSelectedColor() {
	const selectedColor = document.querySelector("input").value;

	displayColor(selectedColor);
	displayHex(selectedColor);
	//get rgb numbers and display in html
	const rgbNumbers = getRgb(selectedColor);
	displayRgb(rgbNumbers);
	//get the HSL numbers and display in HTML
	const hslNumbers = getHsl(rgbNumbers.subR, rgbNumbers.subG, rgbNumbers.subB);
	displayHsl(hslNumbers);
}

function displayColor(color) {
	document.querySelector("#displayColor").style.backgroundColor = color;
}

function displayHex(hexColor) {
	document.querySelector("#hex").textContent = hexColor;
}

function getRgb(rgbColor) {
	const subR = parseInt(rgbColor.substring(1, 3), 16);
	const subG = parseInt(rgbColor.substring(3, 5), 16);
	const subB = parseInt(rgbColor.substring(5), 16);

	return { subR, subG, subB };
}

function displayRgb(rgbNumbers) {
	document.querySelector(
		"#rgb"
	).textContent = `${rgbNumbers.subR}, ${rgbNumbers.subG}, ${rgbNumbers.subB}`;
}

function getHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let h, s, l;

	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = 60 * (0 + (g - b) / (max - min));
	} else if (max === g) {
		h = 60 * (2 + (b - r) / (max - min));
	} else if (max === b) {
		h = 60 * (4 + (r - g) / (max - min));
	}

	if (h < 0) {
		h = h + 360;
	}

	l = (min + max) / 2;

	if (max === 0 || min === 1) {
		s = 0;
	} else {
		s = (max - l) / Math.min(l, 1 - l);
	}
	// multiply s and l by 100 to get the value in percent, rather than [0,1]
	s *= 100;
	l *= 100;

	return { h, s, l };
}

function displayHsl(hslNumbers) {
	document.querySelector("#hsl").innerHTML = `${Math.ceil(hslNumbers.h)}, ${Math.ceil(
		hslNumbers.s
	)}%, ${Math.ceil(hslNumbers.l)}%`;
}
