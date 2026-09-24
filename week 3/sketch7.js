
let lerpedMouseX=0
let lerpedMouseY=0
let target = 0;

let flowers=[]

function setup(){
    createCanvas(windowWidth,windowHeight);
    noStroke()
    
    rectMode(CENTER);
    angleMode(DEGREES);
}

function mouseClicked() {
    flowers.push({
        x: lerpedMouseX,
        y: lerpedMouseY
    
    });
}


function draw(){
    background (100,0,200,20)



    stroke(70,140,80);
    strokeWeight(6)


    line(width/2, -height,width/2, height/2);
    // beginShape();
    // fill(80,110,110)
    // curveVertex(width/2, height)
    // curveVertex(120, height)
    // curveVertex(160, height-400)
    // curveVertex(180, height-400)
    // curveVertex(200, height-600)

    // curveVertex(150, height/2)
    // endShape()
    // beginShape();
    // fill(20,130,90)
    // curveVertex(-400, height)
    // curveVertex(-200, height)
    // curveVertex(-180, height-100)
    // curveVertex(-150, height-200)
    // curveVertex(120, height-400)
    // curveVertex(200, height-600)

    // curveVertex(-200, height-600)
    // endShape()

    // beginShape();
    // fill(7,120,90)
    // curveVertex(width, 400)
    // curveVertex(width, 200)
    // curveVertex(width-200, 120)
    // curveVertex(width, height-200)
    // curveVertex(200, height-600)

    // curveVertex(-200, height-600)
    // endShape()

    noStroke();
    


    push()
    translate(width/2, height/2);

    fill(180, 90, 200,50)
    ellipse(0, -60, 60, 120)

    fill(210,120,200)
    ellipse(-50,-10,100,60)

    fill(210,120,220)
    ellipse(50,-10,100,60)

    fill(190,100,200)
    ellipse(30,50,60,90)

    fill(190,100,200)
    ellipse(-30,50,60,90)

    fill(240,180,20)
    ellipse(0,10,50,40)

    rotate(20)
    
    // fill(200,100,200)
    // ellipse(0,-30,50,80)
    // ellipse(-30,0,80,50)
    // ellipse(30,0,80,50)

    // fill(240,180,50)
    // ellipse(0,0,30,30);
    pop()

    push()
    translate(width/2-20, height/2-200);

    fill(180, 90, 200)
    ellipse(0, -60, 60, 120)

    fill(210,120,220)
    ellipse(-50,-10,100,60)

    fill(210,120,220)
    ellipse(50,-10,100,60)

    fill(190,100,210)
    ellipse(30,50,60,90)

    fill(190,100,210)
    ellipse(-30,50,60,90)

    fill(240,180,50)
    ellipse(0,10,50,40)

    // fill(180,100,200)
    // ellipse(0,-30,50,80)
    // ellipse(-30,0,80,50)
    // ellipse(30,0,80,50)

    // fill(240,180,50)
    // ellipse(0,0,30,30);
    pop()

    push()
    translate(width/2+20, height/2-100);

     fill(180, 90, 200)
    ellipse(0, -60, 60, 120)

    fill(210,120,220)
    ellipse(-50,-10,100,60)

    fill(210,120,220)
    ellipse(50,-10,100,60)

    fill(190,100,210)
    ellipse(30,50,60,90)

    fill(190,100,210)
    ellipse(-30,50,60,90)

    fill(240,180,50)
    ellipse(0,10,50,40)

    // fill(180,100,200)
    // ellipse(0,-30,50,80)
    // ellipse(-30,0,80,50)
    // ellipse(30,0,80,50)

    // fill(240,180,50)
    // ellipse(0,0,30,30);
    pop()

    for (let flower of flowers) {

    push();

    translate(flower.x, flower.y);

    fill(180, 90, 200);
    ellipse(0, -60, 60, 120);

    fill(210, 120, 220);
    ellipse(-50, -10, 100, 60);
    ellipse(50, -10, 100, 60);

    fill(190, 100, 210);
    ellipse(30, 50, 60, 90);
    ellipse(-30, 50, 60, 90);

    fill(240, 180, 50);
    ellipse(0, 10, 50, 40);

    pop();
}

lerpedMouseX= lerp(lerpedMouseX, mouseX, 0.05)
lerpedMouseY= lerp(lerpedMouseY, mouseY, 0.05)

push()
translate(lerpedMouseX, lerpedMouseY)
 fill(180, 90, 200)
    ellipse(0, -60, 60, 120)

    fill(210,120,220)
    ellipse(-50,-10,100,60)

    fill(210,120,220)
    ellipse(50,-10,100,60)

    fill(190,100,210)
    ellipse(30,50,60,90)

    fill(190,100,210)
    ellipse(-30,50,60,90)

    fill(240,180,50)
    ellipse(0,10,50,40)
pop()
}

