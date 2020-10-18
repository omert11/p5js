let listC = []
let Cclass = null;
let r=20;
let cCount=45
function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	for (i = 1; i < cCount+1; i++) {
		listC.push(new CircleS (new createVector((windowWidth / 2), r * i+5, r),15+i*2,i,cCount));
	}
	cClass=new Area(r,listC);
}

function draw() {	
	fill(0, 25);
	noStroke();
	rect(0, 0, windowWidth, windowHeight);
	cClass.draw();
}class Area {
	constructor(r, listC) {
		this.r = r;
		this.listC = listC;
	}
	draw() {
		circle(windowWidth / 2, 0, 10)
		this.listC.forEach(function(item, indx) {
			item.draw();
		});
	}
}
class CircleS {
	constructor(vec, startArc,i,cCount) {
		this.startArc = startArc;
		this.center = new createVector(windowWidth / 2, 0);
		this.vec = vec;
		this.myPoint = new createVector(sin(startArc) * vec.y + this.center.x, cos(startArc) * vec.y*i + this.center.y, vec.z)
		this.hasForce = new createVector(0, 0);
		this.forceFactor =0.5;
		this.g = 100;
		this.c=color(i/cCount*255,125 ,(cCount-i)/cCount*255);

	}
	draw() {
		let item = this.myPoint;
		stroke(this.c);
		circle(item.x, item.y, item.z)
		this.move();
	}
	move() {
		this.myPoint = new createVector(sin(this.startArc) * this.vec.y + this.center.x, cos(this.startArc) * this.vec.y + this.center.y, this.vec.z)
		this.startArc -= this.forceFactor;
		this.forceFactor+=sin(this.startArc)
	}
}