let diameter =300;
function setup(){
    createCanvas(windowWidth, windowHeight)
    noStroke()}
function mousePressed(){
    diameter = random(50, 300);
}
function doubleClicked(){
    diameter = random(20,100);
}
let duration = 500;
let startTime = 0;
function mousePressed() {
    duration = random(50, 300);
    startTime = millis();
}
function draw() {
    background(240);
    let elapsedTime = millis() - startTime;
    if (elapsedTime < duration) {
        fill(150, 50, 200);
        ellipse(mouseX, mouseY, diameter);
        ellipse(mouseX, mouseY, diameter / 2);
    }
}
