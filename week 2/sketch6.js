let x, y;
let diameter = 200
let yV = 5, xV = 3

function setup(){
    createCanvas(windowWidth, windowHeight)

    noStroke()
    y = diameter/2
    x = width/2

}

function draw(){
        background (100,20)

        x = x + xV
        y = y + yV; 
        let r = map(y,diameter/2, height-diameter/2, 0, 255)
        let b = map(x,diameter/2, width-diameter/2, 0, 255)
        let g = map(x,diameter/2, width-diameter/2, 255, 0)
    
        // diameter = r
        fill(r + random (-10,10), g + random (-10,10), b + random (-10,10))

    //ellipse(x,y,diameter + +random(-10,10));
    rect(x,y,diameter + +random(-10,10), diameter + +random(-10,10));

print(y);
}
// 
