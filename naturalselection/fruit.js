class Fruit{
    constructor(x,y){
         this.x=x;
           this.y=y;
           this.r=6;
     }
       draw() {
           fill(unhex(['F6', 'AC', 'C8']))
           circle(this.x, this.y, this.r * 2)
       }
   }