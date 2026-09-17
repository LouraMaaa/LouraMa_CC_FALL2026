let diameter = 300;
let duration = 500;
let startTime = 0;
function setup(){
    createCanvas(windowWidth, windowHeight)
    noStroke()
}
function draw() {
    background(20,200,200, 20)

    let elapsedTime = millis() - startTime;
    let r= map(mouseX, 0, width, 0, 255);
    let g= map(mouseY, 0, height, 0, 255);
    let b= map(mouseX, 0, width, 255, 0);
    if (elapsedTime < duration) {
    fill(r,g,b)
    ellipse(mouseX, mouseY, diameter);
    ellipse(mouseX, mouseY, diameter/2);
    }
}
function mousePressed() {
    diameter = random(50, 300);
    duration = random(50, 300);
    startTime = millis();
}