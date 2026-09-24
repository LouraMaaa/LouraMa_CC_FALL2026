// function setup(){
//     createCanvas(windowWidth, windowHeight);
//     noStroke();
// }
// function draw(){
//     background (240);
//     translate(width/2, height/2);

//     // for (let i=0; i<5; i++ ) {
//     //     rotate(PI/2.5)
//     //     fill(190,100,210)
//     //     ellipse(0,-50, 50, 100)
//     // }

//     // fill(240, 180, 50);
//     // ellipse(0, 0, 40, 40)

//     // fill(180, 90, 200)
//     // ellipse(0, -60, 60, 120)

//     // fill(210,120,220)
//     // ellipse(-50,-10,100,60)

//     // fill(210,120,220)
//     // ellipse(50,-10,100,60)

//     // fill(190,100,210)
//     // ellipse(30,50,60,90)

//     // fill(190,100,210)
//     // ellipse(-30,50,60,90)

//     // fill(240,180,50)
//     // ellipse(0,10,50,40)


// }

// let lerpedMouseX=0
// let lerpedMouseY=0
// let bloom = 0
// let target = 0

// function setup(){
//     createCanvas(windowWidth,windowHeight);
//     noStroke()
    
//     rectMode(CENTER);
//     angleMode(DEGREES);

   
//     }
// function doubleClicked() {
//     flowers.push({
//         x: lerpedMouseX,
//         y: lerpedMouseY
//         // size: random(0.55,0.85),
//         // rotation: random(-10,10),
//         // bloom:0.15,

    
//     });
// }
// function draw(){
//     background(230,220,240);

//  for (let y=0; y<height; y +=10){
//     let r=map ( y,0, height, 220, 245);
//     let g=map ( y,0, height, 230, 215);
//     let b=map ( y,0, height, 235, 225);
//     stroke(r,g,b)

//     fill(r,g,b,100);
//     ellipse(150, 150, 300, 300)
//     fill(r,g,b,100);
//     ellipse(width-150, 250, 350, 350)
//     fill(r,g,b,100);
//     ellipse(width /2, height, 500, 300)
//  }


// bloom = lerp(bloom, target, 0.05);



//  for(let row=0; row <4; row++){
//     push()
//     translate(0,150+row* 150);

    
//     for(let column=0; column <4; column++){
      
//         push()

//         translate(120 + column * 150 ,0 );

//         stroke(r, g, b)
//         strokeWeight(4);
//         line(0, 0, 0, 100)
//         noStroke()

//         push()
//         translate(0,0)

//         scale(bloom);

//         for(let i=0; i<8; i++){
//             push();
//             rotate(i*45);


//           fill(210, 230, 220, 80);
//     ellipse(0, -35,25,60);

   
//     pop()}

//     fill(r,g,b,80);
//     ellipse(0,0,35,35)
// pop()
// pop()
//     }
//     pop()
// }
//  }

// function mousePressed(){
//     target = 1;
// }
let bloom = 0;
let target = 0;
let angle =0;

let lerpedMouseX=0
let lerpedMouseY=0

function setup() {
    createCanvas(800, 800);
    noStroke();

    rectMode(CENTER);
    angleMode(DEGREES);
}

function draw() {

    background(230, 220, 240);

    for (let y = 0; y < height; y += 10) {

    let r = map(y, 0, height, 200, 245);
    let g = map(y, 0, height, 220, 215);
    let b = map(y, 0, height, 205, 225);
        noStroke()

        // stroke(r, g, b);

        fill(random(r, g, b, 100));
        ellipse(150, 150, 300, 300);

        fill(random(r, g, b, 100));
        ellipse(width - 150, 250, 350, 350);

        fill(random(r, g, b, 100,20));
        ellipse(width / 2, height, 300, 300);
    }


    bloom = lerp(bloom, target, 0.05);


    for (let row = 0; row < 4 ; row++) {

        push();

        translate(0, 150 + row * 150);

    for (let column = 0; column < width/2; column++) {

    push();

    translate(120 + column * 150, 0);

            stroke(100, 150, 100);
            strokeWeight(6);

            line(0, 0, 0, 10);

            noStroke();

            push();
    translate(0, 0);
            rotate(angle)
            scale(bloom);


for (let i = 0; i < 8; i++)
   {

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


lerpedMouseX= lerp(lerpedMouseX, mouseX, 0.1)
lerpedMouseY= lerp(lerpedMouseY, mouseY, 0.1)

push()
translate(lerpedMouseX, lerpedMouseY)
for (let i = 0; i < 8; i++) {
    noStroke()

    push();

    rotate(i * 45);

    fill(245, 240, 225);

 ellipse(0, -35, 25, 60);

pop();
}

fill(245, 190, 70);

ellipse(0, 0, 35, 35);
angle += 0.5

}


function mousePressed() {

    target = 1;

}


