
let frames = []

async function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(12)
    // frameRate(24) (60)  faster
    rectMode(CENTER)
    imageMode(CENTER)

    // let img= awaitloadImage("png_sequence/1.png")

    // image(img, width/2, height/2)

    for (let i = 1; i <= 12; i++) {
        frames[i-1] = awaitloadImage("walk_cycle_png_sequence/" + i + ".png")
    }

    // print(frames.length)
}


let counter = 0
let xLoc = 0
let xV = 7.5
let dir = 1

function draw() {
    background(200)

    let currrentFrame = frames[counter % frames.length]
      
      
      translate(xLoc, height/2)
      scale(dir,1)

      if (xLoc > width){
        dir = -1
        xV = -7.5
      }
      else if (xLoc < 0){
        dir = 1
        xV = 7.5
      }

      image(currrentFrame, 0,0)


      counter ++
      xLoc += xV
}

