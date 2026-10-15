let flowers=[]

let rabbitX = 80
let rabbitY = 100
let rabbitSpeed =5

let holeX;
let holeY;
let holeSize = 75;



function setup() {
    createCanvas(windowWidth, windowHeight)
    angleMode(DEGREES)

    holeX= width*0.8
    holeY= height*0.5;
    for (let i =0; i< 50; i++){
    flowers.push(new Flower(random(width), random(height)))
}

}




function draw() {
    background (180, 200, 180)
    let rabbitAngle = 0;

    for (let i =0; i< flowers.length; i++){
        flowers[i].display();
    }

    drawHole();

    if (keyIsDown(LEFT_ARROW)){
        rabbitX -= rabbitSpeed
        // rabbitY += random(-1,1)
        rabbitAngle = -90;

    }

    if (keyIsDown(RIGHT_ARROW)){
        rabbitX += rabbitSpeed
        // rabbitY += random(-1,1)
        rabbitAngle = 90;
    }

    if (keyIsDown(UP_ARROW)){
        rabbitY -= rabbitSpeed
        // rabbitX += random(-1,1)
        rabbitAngle = 0;
    }

    if (keyIsDown(DOWN_ARROW)){
        rabbitY += rabbitSpeed
        // rabbitX += random(-1,1)
        rabbitAngle = 180;
    }

rabbitX = constrain(rabbitX, 0, width-20)
rabbitY = constrain(rabbitY, 0, height-20)


drawRabbit(rabbitX, rabbitY, rabbitAngle);
if (dist(rabbitX, rabbitY, holeX, holeY) < holeSize/2){
    window.location.href = "week6tunnel.html";

}
}
        



function drawHole(){
    push()
    translate(holeX, holeY)

    noStroke()
    fill(55,35,75);
    ellipse(0,0, holeSize*1.5, holeSize);
    noFill()
    stroke(220,190,220)
    strokeWeight(3);

    beginShape()
    for (let a = 0; a<720; a+= 5){

        let r =map(a, 0, 720,2, holeSize*0.65)
        let x = cos(a) * r;
    let y = sin(a) * r * 0.65;
    vertex(x, y);
  }
  endShape();

  pop();


}

function drawRabbit(x, y, angle){
    push()
    translate(x, y)
    rotate(angle)

    noStroke()
    fill(255, 200, 200)
    ellipse(-8,-18,9,24)
    ellipse(8,-18,9,24)

    fill(225, 155, 175);
    ellipse(-7, -17, 4, 16);
    ellipse(7, -17, 4, 16);

    fill(255, 245, 230);
    ellipse(0, 5, 25, 34);
    ellipse(0, -12, 22, 22);

    fill(255);
    ellipse(0, 24, 10, 10);

    fill(55, 35, 55);
    ellipse(-5, -13, 3, 3);
    ellipse(5, -13, 3, 3);

    pop();
}
  




class Flower{
    constructor(x, y) {
    this.x = x;
    this.y = y;
   
   

    this.numPetals = floor(random(5, 9));
    this.petalWidth = random(10, 20);
    this.petalLength = random(20, 35);
    this.centerDiameter = random(8, 14);

    let petalColors = [color(240, 175, 205), color(195, 175, 220), color(245, 220, 155), color(170, 210, 205), color(225,205, 235)];

    this.petalCol = random(petalColors);
    this.centerCol = color(255, 200, 105);

    this.rotations = random(360);
     this.rotationSpeed = random(-1, 1);


    }

    display(){
    push()
    translate(this.x, this.y)
    rotate(this.rotations)
    


    noStroke()
    fill(this.petalCol)
    for(let i = 0; i < this.numPetals; i++){
        push()
        rotate((360/this.numPetals)*i)
        translate( this.petalLength/2, 0);
        ellipse(0, 0, this.petalLength, this.petalWidth);

        pop()
    }

    fill(this.centerCol)
    ellipse(0, 0, this.centerDiameter);

    this.rotations += this.rotationSpeed;
    pop();
}

}



function windowResized(){
resizeCanvas(windowWidth, windowHeight)
holeX = width*0.8
holeY = height*0.5
}