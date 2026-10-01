let bloom = 0;
let target = 0;
let angle = 0;

let lerpedMouseX = 0;
let lerpedMouseY = 0;

let exportSVG = false;

function keyPressed() {
    if (key == "s") {
        exportSVG = true;
    }
}

function setup() {
    // createCanvas(800, 800);
    createCanvas(576,384)

    noStroke();

    rectMode(CENTER);
    angleMode(DEGREES);
}

function draw() {

    background(230, 220, 240);

    noFill();
    stroke(210, 195, 225);
    strokeWeight(2);

    for (let y = 0; y < height; y += 25) {

    beginShape();

        for (let x = 0; x <= width; x += 10) {

            let waveX = x;
            let waveY = y + sin(x * 0.8 + frameCount * 0.5) * 10;

            vertex(waveX, waveY);
        }

    endShape();
    }

    bloom = lerp(bloom, target, 0.05);

    for (let row = 0; row < 4; row++) {

     push();

    translate(0, 150 + row * 150);

    for (let column = 0; column < 5; column++) {

     push();
            translate(100 + column * 150, 0);
         stroke(100, 150, 100);
            strokeWeight(6);

            line(0, 0, 0, 100);

            noStroke();
            push();
            rotate(row * 15 + column * 20 + angle);

            scale(bloom);

            for (let i = 0; i < 8; i++) {

                push();

                rotate(i * 45);

                fill(245, 240, 225);

                ellipse(0, -35, 25, 60);

                pop();
            }
            fill(245, 190, 70);

            ellipse(0, 0, 35, 35);

            pop();

            pop();
        }

        pop();
    }
 lerpedMouseX = lerp(lerpedMouseX, mouseX, 0.1);
 lerpedMouseY = lerp(lerpedMouseY, mouseY, 0.1);

    push();

    translate(lerpedMouseX, lerpedMouseY);

    rotate(angle);

    for (let i = 0; i < 8; i++) {

        push();

        rotate(i * 45);

        fill(245, 240, 225);

        ellipse(0, -35, 25, 60);

        pop();
    }

   
    fill(245, 190, 70);

    ellipse(0, 0, 35, 35);

    pop();

    angle += 0.5;
}

function mousePressed() {
    target = 1;
}
