var loc;
var points = [];

function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	loc = new Localizer();
}

function draw() {
	fill(0, 25);
	noStroke();
	rect(0, 0, windowWidth, windowHeight);
	loc.draw();

}

function keyPressed() {
	points.forEach(function(item) {
		k = 0;
		switch (key) {
			case '1':
				k = 1;
				break;
			case '2':
				k = 2;
				break;
			case '3':
				k = 3;
				break;
			case '4':
				k = 4;
				break;
			case '5':
				k = 5;
				break;
			case '6':
				k = 6;
				break;
			case '7':
				k = 7;
				break;
			case '8':
				k = 8;
				break;
			case '9':
				k = 9;
				break;
		}
		item.loc = createVector(item.loc.x + random(-100, 100) * k / 10, item.loc.y + random(-100, 100) * k / 100)
	});
}
class Localizer {
	constructor() {
		this.dimensions = 50;
		this.dimRange = 5;
		this.mid = createVector(windowWidth / 2, windowHeight / 2)
		this.createPoints();
	}
	createPoints() {
		let pointnum = 0;
		for (let k = 1; k < this.dimensions; k++) {
			let range = k * this.dimRange;
			let dimPow = range * PI /10;
			for (let i = 0; i < dimPow; i++) {
				let angle = i * (360 / dimPow);
				let x = cos(angle) * range + this.mid.x;
				let y = sin(angle) * range + this.mid.y;
				points.push(new Points(createVector(x, y), pointnum, angle, range,this.mid));
				pointnum++;
			}
		}
	}
	draw() {
		points.forEach(function(item) {
			item.draw();
		});
	}

}
class Points {
	constructor(orbital, id, angle, range,mid) {
		this.id = id
		this.loc = createVector(orbital.x, orbital.y);
		this.orbital = orbital;
		this.rand = random(255)
		this.speed = range/5
		this.c = color(this.loc.x*2/windowWidth*255,125 , this.loc.y /windowHeight*2*255);
		this.angle=angle;
		this.range=range;
		this.mid=mid;
	}
	turnOrbital() {
		this.angle+=-10*deltaTime/1000;
		this.orbital.x = cos(this.angle) * this.range + this.mid.x;
		this.orbital.y = sin(this.angle) * this.range + this.mid.y;
	}
	moveOrbital() {
		let targetdir = createVector(this.orbital.x - this.loc.x, this.orbital.y - this.loc.y).heading();
		let speed = this.speed * deltaTime / 1000;
		let x = cos(targetdir) * speed
		let y = sin(targetdir) * speed
		this.loc.x += x;
		this.loc.y += y;
	}
	draw() {
		stroke(this.c);
		point(this.loc.x, this.loc.y);
		this.moveOrbital();
		this.turnOrbital();
	}
}