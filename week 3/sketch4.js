let r = 0
function setup() {
    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);
    angleMode(DEGREES);

frameRate(1)


    // loop
    // for(let i=0; i<10; i++)
    //     push()
    //     translate(random(0,width), random(0,height))
    //     rect(0,0,random(100),random(100))
    //     pop()

}

function draw() {
    background (0);
    for(let i=0; i<100; i++)
        push()
        translate(random(0,width), random(0,height))
        rect(0,0,random(100),random(100))
        pop()
}