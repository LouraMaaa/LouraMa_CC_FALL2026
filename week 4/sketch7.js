let bloom = 1;
let angle = 0;

let lerpedMouseX = 288;
let lerpedMouseY = 192;

let exportSVG = false;


function setup() {    
    createCanvas(576, 384);

    angleMode(DEGREES);

    noFill();
    stroke(0);
    strokeWeight(1);
}

function  draw() {  
    if (exportSVG) {
        beginRecordSvg("flower_plotter.svg");
    }
background(255);

noFill();
 stroke(180);
    strokeWeight(0.7);

    for (let y = 0; y < height; y += 10) {

        beginShape();

        for (let x = 0; x <= width; x += 8) {
            let waveY = y + sin(x * 2 + y * 0.5) * 5;
         let waveX = x + cos(y * 0.8) * 3;
            vertex(waveX, waveY);
        }

        endShape();
    }

 for (let row = 0; row < 3; row++) {

        push();

        translate(70, 80 + row * 125);


        for (let column = 0; column < 4; column++) {

  push();

    translate(column * 145, 0);

    stroke(6);
    strokeWeight(1);

    line(0, 0, 0, 50);
  push();
    rotate(row * 15 + column * 25 + angle);

        for (let i = 0; i < 8; i++) {

 push();

     rotate(i * 45)
     noFill();
     stroke(0);
     strokeWeight(1);

    ellipse(0, -25, 18, 40);

pop();
}
     noFill();
     stroke(0);

     ellipse(0, 0, 25, 25);

pop();

pop();
}

pop();
}
lerpedMouseX = lerp(
        lerpedMouseX,
        mouseX,
        0.05
    );

 lerpedMouseY = lerp(
        lerpedMouseY,
        mouseY,
        0.05
    );

push();

    translate(
        lerpedMouseX,
        lerpedMouseY
    );


    rotate(angle);
    for (let i = 0; i < 8; i++) {

        push();

        rotate(i * 45);

        noFill();
        stroke(0);

        ellipse(0, -25, 18, 40);

        pop();
    }
  noFill();
    stroke(0);

    ellipse(0, 0, 25, 25);

    pop();
angle += 0.3;


if (exportSVG) {

        endRecordSvg();

        exportSVG = false;
        console.log("SVG exported!");

}
}

function keyPressed() {

    if (key == "s" || key == "S") {
     exportSVG = true;
    }
}
