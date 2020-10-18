var area=null;
var people=[];
var fruit=[];
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	angleMode(DEGREES);
	noStroke();
	area=new Area();
}
function normalizeAngle(angle)
{
    let newAngle = angle;
    if (newAngle < 0) newAngle += 360;
    return newAngle;
}
function draw() {
	background(unhex(['26', '19', '1B']));
	area.draw();
	fill(255,200,200)
	textSize(25);
	circle(100, 100, 60);
	text('not hungry', 140, 110);
	fill(255,150,150)
	circle(100, 200, 60);
	text('hungry', 140, 210);
	fill(255,100,100)
	circle(100, 300, 60);
	text('very hungry', 140, 310);
	fill(50)
	circle(100, 400, 60);
	text('dead', 140, 410);
}


