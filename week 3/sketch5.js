let r = 0

let w,h;
let numRects =20;


function setup() {
    createCanvas(800, 800);

    w = width / numRects;
    h = height / numRects;

    // rectMode(CENTER);
    angleMode(DEGREES);
    
    stroke(255);
background(0);
fill(0)
strokeWeight(2)

frameRate(2)

}

function draw() {
    background (0);
    // translate(20,20)

    // for( let x = 0; x< 20; x++){

    //     push()
    //     translate(w*x, 0)
    //     rect(0,0,w/2,100)

    //     pop()
    // }

    // for (let x = 0; x < numRects; x++) {
    //     for (let y = 0; y < numRects; y++) {
    //         push();
    //         translate(w * x, w * y);
    //         rect(0, 0, 10+y*2, height / 2);
    //         pop();
    //     }
    // }
    // translate(w/2, h/2)
    //   for (let x = 0; x < numRects; x++) {
    //     for (let y = 0; y < numRects; y++) {

    //         for (let i = 0; i < 5; i++) {

    //             push();
    //             translate( w* x, h*y );
    //             rotate(r*y)
    //             rect(0,0,w-20*i,h-20*i);
    //             pop()
    //         }
    //     }
    // }
    // r++

    // translate(w/2, h/2)

    // for (let x = 0; x < numRects; x++) {
    //     for (let y = 0; y < numRects; y++) {

    //         let d = dist(mouseX, mouseY, w * x, h * y);

    //         d= map(d, 0, width, 1, 10)
    //          push();
    //          translate(w * x, h * y);
    //          // rotate(r);


    //          rect(0, 0, w/d, h/d);
    //          pop()
    //     }

        translate(w/2, h/2)

    for (let x = 0; x < numRects; x++) {
        for (let y = 0; y < numRects; y++) {

            let d = dist(mouseX, mouseY, w * x, h * y);

            d= map(d, 0, 1000, 1, 10)
            d= constrain(d, 0, 1)

        
             push();
             translate(w * x, h * y);
             // rotate(r);
             rotate(r*d)
             rect(0, 0, w/d, h/d);
             pop()
        }



}
}