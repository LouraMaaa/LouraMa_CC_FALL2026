let x= 0
let y= 0
let angle= 0

let r = 0

let w,h;
let numRects =8;

function setup(){
    createCanvas(windowWidth, windowHeight)
    noStroke()
     w = width / numRects;
    h = height / numRects;

    fill(0)
    // stroke(2)
   
    // rectMode(CENTER);
    angleMode(DEGREES);

}

function draw() {

        for (let x = 0; x < numRects; x++) {
        for (let y = 0; y < numRects; y++) {

            let d = dist(mouseX, mouseY, w * x, h * y);

            
            d= map(d, 0, 200, 1, 10)
            d= constrain(d, 0, 2)

        
             push();
             translate(w * x, h * y);
            
            //  rect(x, y,w/2,h/2);
              rotate(angle);

              ellipse(x,y-10,h/2,w/2,10)
              ellipse(x-10, y, w/2, h/2,10)
              ellipse(x+10, y, w/2, h/2,10)
              ellipse(x,y+10,h/2,w/2,10)

              angle +=0.005

        
            //  ellipse(x+200, y+200,w/2,h/2,10);
            //  ellipse(x-100, y-100,w/2,h/2);
             pop()
        }
    }

    background(20,20,100,20)
    // background(0)
    
    fill(10,200,200);
    ellipse(mouseX, mouseY, 10,10)
    
    // stroke(2)
    

    ellipse(x,y-30,200,80)
    ellipse(x-30, y, 80, 200)
    ellipse(x+30, y, 80, 200)
    ellipse(x,y+30,200,80)

    fill(100,100,100,40)

    ellipse(x,y-30,50,80)
    ellipse(x-30, y, 80, 50)
    ellipse(x+30, y, 80, 50)
    ellipse(x,y+30,50,80)
    
    
    

    fill(200,200,200);
    ellipse(x, y, 40, 40)

           translate(w/2, h/2)

    



}

function mousePressed(){
    x=mouseX
    y=mouseY


}

