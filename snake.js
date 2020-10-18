var yon = 0;
var body = 25;
var gap = 0;
var area = gap + body;
var gameState = 2;
var timer = 1;
var lastcor;
var speed = 5;
var yem = null;
var boy = 1;
var listyilan = [];
var ui;
let slider_speed;
let slider_body;
let slider_gap;
let button;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);
	background(100);
	noStroke();
	ui = new Ui();
	slider_speed = ui.cosSlider(0, 10, 11 - speed, new Kordinat(windowWidth / 2 - 75, 450), 150);
	slider_speed.input(sliderChange);
	slider_body = ui.cosSlider(5, 50, body, new Kordinat(windowWidth / 2 - 75, 500), 150);
	slider_body.input(sliderChange);
	slider_gap = ui.cosSlider(0, 10, gap, new Kordinat(windowWidth / 2 - 75, 550), 150);
	slider_gap.input(sliderChange);
	button = ui.cosButton('Play!', new Kordinat(windowWidth / 2 - 75, 350), '#2C8693', 'white', 10, 12, 150);
	button.mousePressed(play);
}


function draw() {
	if (gameState == 0) {
		noLoop();
		var center = BulKor(lastcor.x, lastcor.y)
		square(center.x, center.y, body);
	} else if (gameState == 1) {
		if (timer == speed) {
			clear();
			YemKontrol(BulKor(lastcor.x, lastcor.y));
			fill(25, 245, 0);
			square(yem.x, yem.y, body);
			timer = 0;
			if (yon == 0) {
				listyilan.pop();
				listyilan.unshift(new Kordinat(lastcor.x + 1, lastcor.y))
				lastcor = new Kordinat(lastcor.x + 1, lastcor.y);

			} else if (yon == 1) {
				listyilan.pop();
				listyilan.unshift(new Kordinat(lastcor.x, lastcor.y + 1))
				lastcor = new Kordinat(lastcor.x, lastcor.y + 1);
			} else if (yon == 2) {
				listyilan.pop();
				listyilan.unshift(new Kordinat(lastcor.x - 1, lastcor.y))
				lastcor = new Kordinat(lastcor.x - 1, lastcor.y);
			} else if (yon == 3) {
				listyilan.pop();
				listyilan.unshift(new Kordinat(lastcor.x, lastcor.y - 1))
				lastcor = new Kordinat(lastcor.x, lastcor.y - 1);
			}
			for (let i = 0; i < boy; i++) {
				let ind=i%40;
				let r;
				let g;
				let b;
				if (ind <= 10) {
					r = map(ind, 0, 10, 0, 255);
					g=0;
					b = map(ind, 10, 0, 0, 134);
					
				}else if(ind<20){
					r = 255;
					g = map(ind, 10, 20, 0, 255);
					b=  map(ind, 10, 20, 0, 204);
				}else if(ind<30){
					r = map(ind, 30, 20, 0, 255);
					g = 255;
					b=  204;
				}else if(ind<40){
					r = 0;
					g = map(ind, 40, 30, 0, 255);
					b=  map(ind, 40, 30, 134, 255);
				}


				fill(r, g, b);
				let center = BulKor(listyilan[i].x, listyilan[i].y)
				square(center.x, center.y, body);
			}
			let indx = 0;
			listyilan.forEach(function(item) {
				if (indx != 0) {
					if (listyilan[0].x == item.x && listyilan[0].y == item.y) {
						gameState = 3;
					}
				}
				indx++;
			});

		} else {
			timer++;
		}
	} else if (gameState == 2) {
		background(100);
		textSize(100);
		textAlign(CENTER, CENTER);
		text('SNAKE', windowWidth / 2, 200);
		textSize(15);
		text('Speed :' + (11 - speed), windowWidth / 2, 440);
		text('Body :' + body, windowWidth / 2, 490);
		text('Gap :' + gap, windowWidth / 2, 540);
	} else if (gameState == 3) {
		noLoop();
		background(100);
		textSize(100);
		textAlign(CENTER, CENTER);
		text('Game Over', windowWidth / 2, 200);
		let button_restart = ui.cosButton('Restart', new Kordinat(windowWidth / 2 - 75, 350), '#2C8693', 'white', 10, 12, 150);
		button_restart.mousePressed(restart);
	}
}

function sliderChange() {
	speed = 11 - slider_speed.value();
	body = slider_body.value();
	gap = slider_gap.value();
	area = gap + body;
}

function restart() {
	listyilan = [(new Kordinat((windowWidth / area) / 2, (windowHeight / area) / 2))];
	lastcor = listyilan[0];
	boy = 1;
	clear();
	removeElements();
	gameState = 2;
	draw();
	loop();
	setup();
}

function play() {
	listyilan.push(new Kordinat((windowWidth / area) / 2, (windowHeight / area) / 2));
	lastcor = listyilan[0];
	clear();
	removeElements();
	removeElements();
	removeElements();
	removeElements();
	gameState = 0;
	draw();
}

function BulKor(xbox, ybox) {
	return new Kordinat(xbox * area, ybox * area);
}

function YemKontrol(headpos) {
	if (headpos.x < 0 || headpos.x > windowWidth || headpos.y > windowHeight || headpos.y < 0) {
		gameState = 3;
	}
	let k = new Kordinat((windowWidth / area) / 2, (windowHeight / area) / 2)
	if (yem == null) {
		yem = BulKor(round(random(0, k.x)), round(random(0, k.y)));

	} else if (headpos.x === yem.x && headpos.y === yem.y) {
		yem = BulKor(round(random(0, k.x)), round(random(0, k.y)));
		boy++;
		listyilan.push(headpos)
	}
}

class Kordinat {
	constructor(x, y) {
		this.x = round(x);
		this.y = round(y);
	}
}

function keyPressed() {
	if (key == ' ') {
		noLoop();
	} else if (key == 's') {
		if (gameState == 1) {
			if (yon != 3) {
				yon = 1;
			}
		} else if (gameState == 0) {

			gameState = 1;
			yon = 1;
			loop();
		}
	} else if (key == 'd') {
		if (gameState == 1) {
			if (yon != 2) {
				yon = 0;
			}
		} else if (gameState == 0) {
			gameState = 1;
			yon = 0;
			loop();
		}
	} else if (key == 'a') {
		if (gameState == 1) {
			if (yon != 0) {
				yon = 2;
			}
		} else if (gameState == 0) {
			gameState = 1;
			yon = 2;
			loop();

		}
	} else if (key == 'w') {
		if (gameState == 1) {
			if (yon != 1) {
				yon = 3;
			}
		} else if (gameState == 0) {
			gameState = 1;
			yon = 3;
			loop();
		}
	}
}

class Ui {

	cosButton(text,pos,backgraund,textcolor,padding,border,widh) {
		let button;
		button = createButton(text);
		button.position(pos.x,pos.y);
		button.style('border', 'none');
		button.style('background-color', backgraund);
		button.style('color', textcolor);
		button.style('padding', padding+'px');
		button.style('border-radius', border+'px');
		button.style('width', widh+'px');
		return button
	}
	cosSlider(min,max,value,pos,widh) {
		let slider;
		slider=createSlider(min,max,value);
		slider.position(pos.x , pos.y);
		slider.style('width', widh+'px');
		return slider
	}

}