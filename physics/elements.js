class Pline {
	constructor(x1, x2, y1, y2) {
		this.elementCode=0;
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.m = (y1 - y2) / (x1 - x2);
		this.b = y1 - this.m * x1;
	}
	draw() {
		stroke(126);
		line(this.x1, this.y1, this.x2, this.y2);
	}
}
class Pcircle {
	constructor(x, y, r, d) {
		this.elementCode=1;
		this.x = x;
		this.y = y;
		this.r = r;
		this.d = d;
		this.m = 2 * r * PI;
		this.v = createVector(0, 0);
		this.fo = createVector(0, 0);
		this.ic = false;
		this.obj_i=null
	}
	doVelocty(v) {
		this.v = v;
	}
	calForge(obj_i) {
		if (this.ic) {
			let deg = atan(obj_i.m)
			this.fo.y = 0;
			this.fo.x = sin(deg) * engine.g / (1000 / deltaTime) * (obj_i.y1 > obj_i.y2 && obj_i.x2 < obj_i.x1 ? -1 : 1);
		} else {
			this.fo.y = (engine.g + (this.v.y > 0 ? -engine.af : engine.af)) / (1000 / deltaTime);
			this.fo.x = 0;
		}
	}
	draw(){
		this.calForge(this.obj_i);
		this.move();
		circle(this.x, this.y, this.r * 2);
		this.ic=false;
	}
	move() {
		this.v.x += this.fo.x;
		this.v.y += this.fo.y;
		this.y += this.v.y;
		this.x += this.v.x;
	}
}