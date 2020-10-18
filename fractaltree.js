var area;
var listcizgi=[];
function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);
	background(100);
	area=new Drawarea(200);
}

function draw() {
	area.draw();
}
class Drawarea {
	constructor(uzunluk) {
		this.ilkuzunluk = uzunluk;
		this.cizgiOlustur();
	}
	cizgiOlustur() {
		listcizgi.push(new Cizgi(windowWidth / 2, windowHeight, windowWidth / 2, windowHeight - this.ilkuzunluk,this.ilkuzunluk,-90,0));
		console.log(listcizgi)
	}
	draw() {
		listcizgi.forEach(function(item) {
			item.draw();
		});
	}
}class Cizgi {
	constructor(x1, y1, x2, y2, uzunluk, aci,katman) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.aci = aci;
		this.uzunluk = uzunluk;
		this.bendensonrakicizgi();
		this.kirilimacisi = 45;
		this.katman=katman
		this.bendensonrakicizgi();
	}
	bendensonrakicizgi() {
		//YENİ OLUŞTURULACAK ÇİZGİ
		if(this.katman<10){
		let x = this.x2 //x1
		let y = this.y2 //y1
		let x2 = cos(this.aci + this.kirilimacisi) * this.uzunluk / 2 + x
		let y2 = sin(this.aci + this.kirilimacisi) * this.uzunluk / 2 + y
		let x3 = cos(this.aci - this.kirilimacisi) * this.uzunluk / 2 + x
		let y3 = sin(this.aci - this.kirilimacisi) * this.uzunluk / 2 + y
		listcizgi.push(new Cizgi(x, y, x2, y2, this.uzunluk / 2, this.aci + this.kirilimacisi,this.katman+1));
		listcizgi.push(new Cizgi(x, y, x3, y3, this.uzunluk / 2, this.aci - this.kirilimacisi,this.katman+1));
		}
	}
	draw() {
		line(this.x1, this.y1, this.x2, this.y2);
	}
}