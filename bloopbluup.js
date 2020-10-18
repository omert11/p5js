function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noLoop();
}
var cap = 50;
var cap2 = 100;
var kat = 355;
var xm = 0;
var ym = 0;

function draw() {
	for (let x = 0; x < windowWidth; x += cap) {
		for (let y = 0; y < windowHeight; y += cap) {
			var uzaklik = dist(x, y, xm, ym);
			noStroke();
			fill(255 - (kat*uzaklik / windowHeight)  > 0 ? 255 - (kat*uzaklik / windowHeight)  : 0,45 , 135)
			circle(x, y, cap - (cap2 * uzaklik / windowHeight) > cap ? cap : cap - (cap2 * uzaklik / windowHeight)< 5 ? 5 : cap - (cap2 * uzaklik / windowHeight));
		}
	}
}

function mouseMoved() {
	xm = winMouseX;
	ym = winMouseY;
	clear();
	draw();
}