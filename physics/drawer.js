let map;
let timer = 0;
let engine = null;

function setup() {
	frameRate(60);
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	background(100);
	map = [new Pline(0, windowWidth - 1000, 200, 250), new Pcircle(100, 100, 5, 1), new Pcircle(50, 100, 15, 1), new Pline(windowWidth - 1000, windowWidth - 900, 250, 200), ]
	map[1].doVelocty(createVector(2, 0))
	engine = new physic(map);
}

function draw() {
	background(0);
	tick();
}

function tick() {
	engine.drawer();
}