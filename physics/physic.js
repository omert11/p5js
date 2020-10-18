//physics v0.0.101

//Tanımlar
//x kounumu
//y konumu
//r yarıcap
//d yogunluk
//m agırlık
//g yercekimi
//f çarpışma soğurması
//v hiz
//vd hiz yonu

class physic {
	constructor(map) {
		this.g = 10;
		this.f = 0.5;
		this.af = 5;
		this.map = map;
	}
	drawer() {

		let mapU = map.slice();
		for (let i = 0; i < map.length; i++) {
			for (let k = 1; k < mapU.length; k++) {
				let colcal = new Collsioncalculator(mapU[0], mapU[k]);
				if (colcal.isCollisoned()) {
					let obj_a = mapU[k];
					let obj_b = mapU[0];
					switch (colcal.colobjid) {
						case 0:
							{
								if (obj_a.elementCode == 1) {
									obj_a.ic = true;
									obj_a.obj_i = obj_b;
								} else {
									obj_b.ic = true;
									obj_b.obj_i = obj_a;
								}
								break;
							}
						case 1:
							{

								break;
							}
					}

				}
			}
			mapU[0].draw();
			mapU.shift();
		}
	}
}

//collision(carpısma) hesabı
class Collsioncalculator {
	constructor(col1, col2) {
		this.col1 = col1;
		this.col2 = col2;
		this.colobjid = this.idder();
	}
	idder() {
		let id = -230;
		switch (this.col1.elementCode) {
			case 1:
				switch (this.col2.elementCode) {
					case 1:
						id = 1;
						break;
					case 0:
						id = 0;
						break;
				}
				break;
			case 0:
				switch (this.col2.elementCode) {
					case 1:
						id = 0;
						break;
				}
				break;
		}
		return id;
	}
	linePoint(x1, y1, x2, y2, px, py) {
		let d1 = dist(px, py, x1, y1);
		let d2 = dist(px, py, x2, y2);
		let lineLen = dist(x1, y1, x2, y2);
		let buffer = 0.1;
		if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
			return true;
		}
		return false;
	}
	isCollisoned() {
		switch (this.colobjid) {
			case 0:
				{ //Circle-line
					let c = null;
					let l = null;
					if (this.col1.elementCode == 1) {
						c = this.col1;
						l = this.col2;
					} else {
						c = this.col2;
						l = this.col1;
					}
					let distX = l.x1 - l.x2;
					let distY = l.y1 - l.y2;
					let len = sqrt((distX * distX) + (distY * distY));
					let dot = (((c.x - l.x1) * (l.x2 - l.x1)) + ((c.y - l.y1) * (l.y2 - l.y1))) / pow(len, 2);
					let closestX = l.x1 + (dot * (l.x2 - l.x1));
					let closestY = l.y1 + (dot * (l.y2 - l.y1));
					distX = closestX - c.x;
					distY = closestY - c.y;
					let distance = sqrt((distX * distX) + (distY * distY));
					let onSegment = this.linePoint(l.x1, l.y1, l.x2, l.y2, closestX, closestY);
					if (onSegment) {
						if (c.r > distance) {
							const reflecter = createVector(l.x1 - l.x2, l.y1 - l.y2).rotate(90);
							c.v.reflect(reflecter);
							return true
						}
					}
					return false;
				}
			case 1:
				{

					let c1 = this.col1;
					let c2 = this.col2;
					let len = dist(c1.x, c1.y, c2.x, c2.y);
					if (len < c1.r + c2.r) {
						return true;
					}
					return false;
				}
		}
	}
}