function setup(){
    createCanvas(windowWidth, windowHeight)
    noStroke()
}

function draw(){
    background(100, 20)
    x = random(width);
    y = random(height);
    fill(random(255), random(255), random(255))
    if (x > width/2) {ellipse(x, y, 100, 100)}
    else {rect(x, y, 100, 100)}
//triangle( x, y, x + 50, y + 100, x - 50, y + 100)
}