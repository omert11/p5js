class People {
	constructor(x, y, dir) {
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.speed = 75;
		this.r = 6;
		this.nearest = null;
		this.hungry = 50;
	}
	draw() {
		if (this.hungry < 0) {
				fill(50)
			circle(this.x, this.y, this.r * 2);
		} else {
			this.tick();
			fill(255, this.hungry + 100, 100 + this.hungry);
			circle(this.x, this.y, this.r * 2);
			let startDis = this.r * 5 / 8;
			let x = cos(this.dir) * startDis + this.x;
			let y = sin(this.dir) * startDis + this.y;
			fill(255);
			circle(x, y, 4);
		}
	}
	tick() {
		this.findnearest();
	}
	move() {
		let targetdir = normalizeAngle(createVector(fruit[this.nearest].x - this.x, fruit[this.nearest].y - this.y).heading());
		this.dir += (targetdir - this.dir)
		let speed = this.speed * deltaTime / 1000;
		let x = cos(this.dir) * speed
		let y = sin(this.dir) * speed
		this.x += x;
		this.y += y;
		this.hungry-=0.05
	}
	findnearest() {
		let near = 0;
		let indx = 0
		let dis = 100000;
		let me = this;
		fruit.forEach(function(item) {
			let di = dist(me.x, me.y, item.x, item.y)
			if (di < dis) {
				dis = di;
				near = indx
			}
			indx++;
		})
		if (dis < 2 * this.r) {
			fruit.splice(near, 1);
			this.hungry += 25
			this.findnearest();
		} else {
			this.nearest = near;
			if (fruit.length != 0) {
				this.move();
			} else {
				area.endDay();
			}
		}

	}
}