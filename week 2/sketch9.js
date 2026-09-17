let x,y;
let duration =1000;

function setup(){
    createCanvas(windowWidth, windowHeight)
    noStroke();
}

function draw(){
    background (10);
    

    for (let i = 0; i < 3; i++){
        x = random(width);
        y = random(height);
        let r = map(y,0, height, 0, 255)
        let b = map(x,0, width, 0, 255)
        let g = map(x,0, width, 255, 0)
        fill(r + random (-8,8), g + random (-8,8), b + random (-8,8))
        ellipse(x,y,random(20,200));
    }
}



