let wWidth = null;
let wHeight = null;
let gridCount = 25;
let cellClass =null;
let fr=120
let directionJson = {
  top: {
    x: 0,
    y: -1,
  },
  bottom: {
    x: 0,
    y: 1,
  },
  left: {
    x: -1,
    y: 0,
  },
  right: {
    x: 1,
    y: 0,
  },
};
function setup() {
	noStroke()
  frameRate(fr);
	let a=windowWidth<windowHeight?windowWidth:windowHeight;
	wWidth = a;
	wHeight = a;
  createCanvas(wWidth, wHeight);
  background(200);
  cellClass= new Cells(gridCount, wWidth);
}

function draw() {
  background(200);
  cellClass.controller();
}
function getRandomColor() {
	let c=random(255)
  return color(c, 45,145 );
}
function getDirection(num) {
  let l = ["top", "bottom", "left", "right"];
  return directionJson[l[round(random(3))]];
}
class Cells {
  constructor(gridCount, screenW) {
    this.gridCount = gridCount;
    this.screenW = screenW;
    this.cellW = screenW / gridCount;
    this.cellsList = [];
    this.maxCell = 150;
    this.cellMaxGrowSeeds = 3;
    this.createUnicCell()
  }
  controller() {
    this.drawCells();
  }
  drawCells() {
    this.cellsList.forEach(function (i, indx) {
      i.myLifeCiycle();
    });
    this.controlCellS();
  }
  createUnicCell() {
    if (this.cellsList.length < this.maxCell) {
      let growSeed = round(random(this.cellMaxGrowSeeds));
      let yPixel=round(random(this.gridCount))
      let cellVec = createVector(this.cellW * yPixel, 0);
      this.cellsList.push(new Cell(growSeed, cellVec, this.cellW,this));
      this.cellNum++;
    }
  }
  
  controlCellS(){
    let mClass=this
    let movedCell=this.cellsList[this.cellsList.length-1]
    if(movedCell.myBottom+this.cellW>this.screenW-this.cellW){
      movedCell.mMoved=false;
      this.createUnicCell();
    }
    if(this.cellsList.length>1){
      movedCell.listOfCellPoints.forEach(function(cellPoints,idx){
        mClass.cellsList.forEach(function(item,indx){
          if(indx!=mClass.cellsList.length-1){
          let otherCellPoints=item.listOfCellPoints
            otherCellPoints.forEach(function(point,ix){
              if(point.x==cellPoints.x&&point.y==cellPoints.y+mClass.cellW){
                if(movedCell.mMoved)mClass.createUnicCell();
                movedCell.mMoved=false
              
              }
            })
          }
        })
      })
    }
    
  }
 
}
class Cell {
  constructor(growSeed, startVec, width,parent) {
    this.parent=parent;
    this.growSeed = growSeed;
    this.colorCell = getRandomColor();
		this.colorStroke=color(255);
    this.startVec = startVec;
    this.cellW = width;
    this.myBottom=0;
    this.myBottomIndx=0;
    this.mMoved = true;
    this.listOfCellPoints = [this.startVec];
    this.getCellPoints()
  }
  myLifeCiycle() {
    this.drawMe();
    if(this.mMoved)this.moveMe();
  }
  moveMe() {
    let mClass = this;
    this.listOfCellPoints.forEach(function (i, indx) {
        i.y += mClass.cellW;
        if(i.y>mClass.myBottom){
          mClass.myBottom=i.y
          mClass.myBottomIndx=indx
        }
    });
  }
  getCellPoints() {
    while (this.listOfCellPoints.length < this.growSeed) {
      let direction = getDirection();
      let listrandom = this.listOfCellPoints[round(random( this.listOfCellPoints.length - 1))];
      let newPoint = createVector(listrandom.x + this.cellW * direction.x, listrandom.y + this.cellW * direction.y);
      if(!this.hasPoint(newPoint)) this.listOfCellPoints.push(newPoint);
    }
  }
  hasPoint(point){
    let returned=false
    this.listOfCellPoints.forEach(function(item,index){
      if(item==point){
        returned=true
      }
    })
    return returned
  }
  drawMe() {
    let mClass = this;
    this.listOfCellPoints.forEach(function (item, inex) {
      fill(mClass.colorCell);
			stroke(mClass.colorStroke);
      rect(item.x, item.y, mClass.cellW, mClass.cellW);
    });
  }
}


