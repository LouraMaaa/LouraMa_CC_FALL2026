
let xLoc = []
let yLoc = []
let numSegments = 100;


function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < numSegments; i++) {
        xLoc[i] =  width / 2
        yLoc[i] =  height / 2
    }

    print(xLoc, yLoc);



}

let counter = 0;
function draw() {
    background(0);
    stroke (255)
    fill(0)

    xLoc[numSegments - 1] = width * noise(counter)
    yLoc[numSegments - 1] = height * noise(counter + 1000);
    
    // the last array location is set to the last mouse location
    // the previous location is gonna be set to the next location
    // passing value down the line, along the array

    for (let i = 0; i < numSegments - 1; i++) {
        xLoc[i] = x  [i+1]
        yLoc[i] = y  [i+1]

        let diameter = 200*sin(map(i, 0, numSegments - 1, 0, PI))

        let r = diameter
        let g = 200- diameter 
        let b = 200* cos(map(i, 0, numSegments - 1, 0, PI))

        
        stroke(r, g, b)

        ellipse(xLoc[i], yLoc[i], diameter)
    }
        
    counter += 0.01;

}