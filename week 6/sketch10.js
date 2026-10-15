let flowers=[]

let rabbitX = 80
let rabbitY = 100
let rabbitSpeed =5

let tunnelRotation = 0;
let tunnelSize = 30;

let layer1;
let xLoc = [];
let yLoc = [];
let numSegments = 250;
let counter = 0;

function setup() {
    createCanvas(windowWidth, windowHeight)
    angleMode(DEGREES)

    layer1 = createGraphics(width, height)

    rabbitX= width/2
    rabbitY= height/2;

    for (let i =0; i< numSegments; i++){
    xLoc[i] = width/2
    yLoc[i] = height/2;

    for (let i =0; i< 30; i++){
    flowers.push(new TunnelFlower());
}
    }
}




function draw() {
    background (35, 20, 55)
    drawTunnel();
    

    image(layer1, 0, 0);

    for (let i =0; i< flowers.length; i++){
        flowers[i].move();
        flowers[i].display();
    }

    // drawHole();
    drawSnake();

    if (keyIsDown(LEFT_ARROW)){
        rabbitX -= rabbitSpeed
        // rabbitY += random(-1,1)
        // rabbitAngle = -90;

    }

    if (keyIsDown(RIGHT_ARROW)){
        rabbitX += rabbitSpeed
        // rabbitY += random(-1,1)
        // rabbitAngle = 90;
    }

    if (keyIsDown(UP_ARROW)){
        rabbitY -= rabbitSpeed
        // rabbitX += random(-1,1)
        // rabbitAngle = 0;
    }

    if (keyIsDown(DOWN_ARROW)){
        rabbitY += rabbitSpeed
        // rabbitX += random(-1,1)
        // rabbitAngle = 180;
    }

rabbitX = constrain(rabbitX, 15, width-15)
rabbitY = constrain(rabbitY, 15, height-15)


drawRabbit(rabbitX, rabbitY);
// if (dist(rabbitX, rabbitY, holeX, holeY) < holeSize/2){
//     window.location.href = "week6tunnel.html";

}
      

function drawSnake() {
    layer1.clear();
    layer1.noStroke();

    let x = width * noise(counter + 10);
    let y = height * noise(counter);

    for (let i = numSegments - 1; i > 0; i--) {
        xLoc[i] = xLoc[i - 1];
        yLoc[i] = yLoc[i - 1];
    }

    xLoc[0] = x;
    yLoc[0] = y;

    layer1.noStroke();

    for (let i = 0; i < numSegments; i++) {
        let t = map(i, 0, numSegments - 1, 0, 180);

        let diameter = 100 * sin(t);
        let r = 255 * sin(t);
        let g = 255 - r;

        layer1.fill(r, g, 180, 210);
        layer1.ellipse(xLoc[i], yLoc[i], diameter, diameter);
    }
    image(layer1, 0, 0);

    counter += 0.01;
}

function drawTunnel(){
    push()
    translate(width/2, height/2)
    // noStroke()
    // fill(55,35,75);
    // ellipse(0,0, holeSize*1.5, holeSize);
    noFill()
    // stroke(220,190,220)
    strokeWeight(4);
     for (let i = 0; i < 12; i++) {
        let ringSize = tunnelSize + i * 55;

     stroke( 150 + i * 7, 100 + i * 5, 200 + i * 4);

        push();
        rotate(tunnelRotation + i * 12);

        ellipse(0, 0, ringSize * 1.2, ringSize);
        pop();
    }

    pop();

tunnelRotation += 0.5;
tunnelSize += 0.8;

    if (tunnelSize > 100) { 
        tunnelSize = 30;
    }
}



//     beginShape()
//     for (let a = 0; a<720; a+= 5){

//         let r =map(a, 0, 720,2, holeSize*0.65)
//         let x = cos(a) * r;
//     let y = sin(a) * r * 0.65;
//     vertex(x, y);
//   }
//   endShape();

//   pop();




function drawRabbit(x, y){
    push()
    translate(x, y)
    // rotate(angle)

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
  
// class Flower{
//     constructor(x, y) {
//     this.x = x;
//     this.y = y;
   
   

//     this.numPetals = floor(random(5, 9));
//     this.petalWidth = random(10, 20);
//     this.petalLength = random(20, 35);
//     this.centerDiameter = random(8, 14);

//     let petalColors = [color(240, 175, 205), color(195, 175, 220), color(245, 220, 155), color(170, 210, 205), color(225,205, 235)];

//     this.petalCol = random(petalColors);
//     this.centerCol = color(255, 200, 105);

//     this.rotations = random(360);
//      this.rotationSpeed = random(-1, 1);


//     }

//     display(){
//     push()
//     translate(this.x, this.y)
//     rotate(this.rotations)
    


//     noStroke()
//     fill(this.petalCol)
//     for(let i = 0; i < this.numPetals; i++){
//         push()
//         rotate((360/this.numPetals)*i)
//         translate( this.petalLength/2, 0);
//         ellipse(0, 0, this.petalLength, this.petalWidth);

//         pop()
//     }

//     fill(this.centerCol)
//     ellipse(0, 0, this.centerDiameter);

//     this.rotations += this.rotationSpeed;
//     pop();
// }

// }


class TunnelFlower {
    constructor() {
        this.reset();
    }

    reset() {
    this.angle = random(360);
    this.distance = random(20, 180);
    this.speed = random(0.5, 1.5);
     this.size = random(8, 30);
     this.rotation = random(360);
     this.rotationSpeed = random(-1, 2);
     this.petalCol = color(random(180, 255), random(130, 210), random(186, 255));
    }

move() {
        this.distance += this.speed;
        this.angle += 0.2;
        this.rotation += this.rotationSpeed;

        if (this.distance > max(width, height) / 2 + 50) {
            this.reset();
        }
    }

display() {
        push();

        translate(width / 2, height / 2);
 let x = cos(this.angle) * this.distance;
 let y = sin(this.angle) * this.distance;

        translate(x, y);
        rotate(this.rotation);

        noStroke();
        fill(this.petalCol);

for (let i = 0; i < 6; i++) {
 push();
     rotate(i * 60);
    ellipse(this.size / 2, 0, this.size, this.size / 2);
 pop();
}
 fill(255, 220, 120);
 ellipse(0, 0, this.size / 2);
 pop();
    }
}


function windowResized(){
resizeCanvas(windowWidth, windowHeight)
layer1 = createGraphics(width, height)
}