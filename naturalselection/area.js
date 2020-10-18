class Area {
	constructor() {
		this.people = 25;
		this.fruit = 20;
		this.x = windowWidth / 2;
		this.y = windowHeight / 2;
		this.r = 450;
		this.createpeople();
		this.createFruits();
	}
	createpeople() {
		let startDis = this.r * 7 / 8
		for (let i = 0; i < this.people; i++) {
			let angle = i * (360 / this.people);
			let x = cos(angle) * startDis + this.x;
			let y = sin(angle) * startDis + this.y;
			people.push(new People(x, y, angle + 180))
		}
	}
	createFruits() {
		for (let i = 0; i < this.fruit; i++) {
			this.createF();
		}
	}
	draw() {
		this.drawgraund();
		this.drawfruit();
		this.drawpeople();

	}
	drawgraund() {
		fill(unhex(['AF', '8B', 'AF']));
		circle(this.x, this.y, this.r * 2);
	}
	drawpeople() {
		people.forEach(function(item) {
			item.draw();
		});
	}
	drawfruit() {
		fruit.forEach(function(item) {
			item.draw();
		});
	}
	createF() {
		let startDis = random(0, this.r)
		let angle = random(0, 360);
		let x = cos(angle) * startDis + this.x;
		let y = sin(angle) * startDis + this.y;
		let collisioned = false;
		people.forEach(function(item) {
			let di = dist(x, y, item.x, item.y)
			if (di < 6 + item.r) {
				collisioned = true;
			}
		});
		if (collisioned) {
			this.createF()
		} else {
			fruit.push(new Fruit(x, y))
		}
	}
	endDay() {
				let living = 0;
		let startDis = this.r * 7 / 8
		for (let i = 0; i < this.people; i++) {
			let angle = i * (360 / this.people);
			people[i].hungry -= 25;
			if (people[i].hungry > 0) {
				people[i].x = cos(angle) * startDis + this.x;
				people[i].y = sin(angle) * startDis + this.y;
				living++;
			}

		}
		this.people = people.length;
		this.fruit = living - 3<0?living:living-3;
		this.createFruits();
	}
}