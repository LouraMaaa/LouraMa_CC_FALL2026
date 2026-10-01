
// let wavesPerCanvas =16
// let amplitude = 50;
// let offset = 0;
// let yLoc
// let speed=0.01
let numWaves= 10

function setup(){
    createCanvas(windowWidth, windowHeight)
    // yLoc = height/2
    noFill()
}

function draw(){
    background(230)

    let v = floor(random(3,20))
    nShape (mouseX, mouseY, v, 50)

//     // sinWave(4,150, height/2, 0.05)
//     // sinWave(8,80, height*0.8, 0.1)
//     // sinWave(100,80, height*0.2, 0.01)

//            for (let i=0; i<numWaves; i++){
//             let yLoc = map(i, 0, numWaves, 0,1)*height
//             let speed

//             if (i%2 == 0) {
//                 speed = 0.1
                
//             }
//             else{
//                 speed = -0.1
//             }
            
//             sinWave(i, 20, yLoc, speed)
//             // sinWave(i, 20, yLoc, i*0.01)
            


//         }

//     // print(wavePerFunction)


}

function sinWave(wavesPerCanvas, amplitude, yLoc, speed){

    let offset = frameCount*speed
    push()

    translate(0,yLoc)

    beginShape()

    for(let i=0; i<width; i++){

        mappedI= map(i,0,width,0, wavesPerCanvas*TWO_PI)
        

        let y= sin(mappedI-offset)*amplitude

        let x = i

        vertex(x,y)
    

    }
    endShape()
    pop()


}

function nShape(xLoc, yLoc, numVertices, radius){

    push()
    translate (xLoc, yLoc)

    beginShape()
         for (let i=0; i< numVertices; i++){

              let mappedI = map(i, 0, numVertices, 0, TWO_PI)

        let x = sin(mappedI) *radius
        let y = cos(mappedI) *radius

        vertex(x, y)


        }
    endShape()
    pop()
    

}

function noise(){
    
}

function mousePressed(){
    let v = floor (random(3,20))
    nShape(mouseX,mouseY,v,v+4)


}