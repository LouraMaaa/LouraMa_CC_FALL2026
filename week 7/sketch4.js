let rabbitX = 100;
let rabbitY = 300;
let rabbitSpeed = 4;
let rabbitAngle = 0;

let mushrooms = [];
let spores = [];
let mushroomTime = 0;
let nextMushroomTime = 0;

function setup() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES);

for (let i=0; i<12; i++){
    mushrooms.push({
      x: random(width),
      y: random(height * 0.35, height * 0.85),
      size: random(0.6, 1.5),
      hue: random([285, 320, 190, 45])
    })
}

for (let i=0; i<70; i++){
    spores.push({
      x: random(width),
      y: random(height),
      size: random(2, 6),
      speed: random(0.3, 1.2),
      phase: random(360)
    })
}
rabbitX = width * 0.2;
rabbitY = height * 0.75;
}

function draw() {
 background(15, 8, 35);

mushroomTime += 1;

if (millis() > nextMushroomTime) {
mushrooms.push({
    x: random(width),
    y: random(height * 0.4, height * 0.82),
    size: random(0.6, 1.5),
    hue: random([285, 320, 190, 45])
});

nextMushroomTime = millis() + random(1000, 3000);
}

noStroke();
for (let i = 5; i > 0; i--) {
    fill(90, 30, 150, 8);
    ellipse(width * 0.5, height * 0.55, width * i * 0.35, height * i * 0.25);
}
fill(20, 12, 42);
rect(0, height * 0.82, width, height * 0.18);
for (let m of mushrooms) {
    drawMushroom(m);
}

for (let s of spores) {
    s.y -= s.speed;
    s.x += sin(mushroomTime * 0.7 + s.phase) * 0.4;

if (s.y < -10) {
      s.y = height + 10;
      s.x = random(width);
    
}

let glow = 140 + 100 * sin(mushroomTime * 3 + s.phase);

  noStroke();
    fill(180, 130, 255, 25);
    circle(s.x, s.y, s.size * 5);
    fill(220, 200, 255, glow);
    circle(s.x, s.y, s.size);
}

if (keyIsDown(LEFT_ARROW)) {
    rabbitX -= rabbitSpeed;
    rabbitAngle = -90;
}
if (keyIsDown(RIGHT_ARROW)) {
    rabbitX += rabbitSpeed;
    rabbitAngle = 90;
}
if (keyIsDown(UP_ARROW)) {
    rabbitY -= rabbitSpeed;
    rabbitAngle = 0;
}
if (keyIsDown(DOWN_ARROW)) {
    rabbitY += rabbitSpeed;
    rabbitAngle = 180;
}

  rabbitX = constrain(rabbitX, 20, width - 20)
  rabbitY = constrain(rabbitY, 20, height - 20)

drawRabbit(rabbitX, rabbitY, rabbitAngle)

fill(230, 210, 255, 170);

}

function drawMushroom(m) {
    push()
    translate(m.x, m.y)
    scale(m.size);

let pulse= 1+ 0.08 * sin(mushroomTime *2 + m.x)
let capWidth = 65 * pulse;
let stemHeight =55;

noStroke()
for (let i=5; i>0; i--){
    fill(150, 70, 255, 9);
    ellipse(0, -stemHeight, capWidth + i * 18, 35 + i * 12);
}
// stem
 fill(205, 190, 225);
  rect(-9, -stemHeight, 18, stemHeight, 8);

// cap
fill(m.hue, 80, 100);
  if (m.hue === 285) fill(165, 85, 235);
  else if (m.hue === 320) fill(245, 80, 180);
  else if (m.hue === 180) fill(50, 200, 200);
  else fill(255, 180, 80);

  ellipse(0, -stemHeight, capWidth, 32 * pulse);

fill(255, 230, 255,230)
circle(-15, -stemHeight - 3, 7);
  circle(10, -stemHeight + 2, 5);
  circle(22, -stemHeight - 5, 4);


  pop();
}

// rabbit
function drawRabbit(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);

  noStroke();

  fill(255, 200, 215);
  ellipse(-8, -18, 9, 24);
  ellipse(8, -18, 9, 24);

  fill(225, 155, 175);
  ellipse(-7, -17, 4, 16);
  ellipse(7, -17, 4, 16);

  fill(255, 245, 230);
  ellipse(0, 5, 25, 34);
  ellipse(0, -12, 22, 22);
  ellipse(0, 24, 10, 10);

  fill(55, 35, 55);
  ellipse(-5, -13, 3, 3);
  ellipse(5, -13, 3, 3);

  pop();
}

function mousePressed() {
  mushrooms.push({
    x: mouseX,
    y: mouseY,
    size: random(0.7, 1.4),
    hue: random([285, 320, 190, 45])
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}