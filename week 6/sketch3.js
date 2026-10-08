// object oriented proogramming

let flower = {
    x: 500,
    y: 500,
    numPetals: 6,
    petalWidth: 40,
    petalLength: 100,
    centerDiameter: 50,
}
let f = 0

function setup() {
    // print(flower.x)

    createCanvas(windowWidth, windowHeight)
    background(0)
    angleMode(DEGREES)

// push()
translate(flower.x, flower.y)
    for (let r = 0; r < flower.numPetals; r++) {
        // do something with each petal

        // ellipse(0, 0, flower.petalWidth, flower.petalLength)
push()
        rotate(360 / flower.numPetals) *r
        translate(flower.petalLength)
        ellipse(0, 0, flower.petalWidth, flower.petalLength)
pop()
    }
ellipse(0,0, flower.centerDiameter)
// pop()
}

// Create constructor to set up function, run once and produce different variables

function draw() {
    let f = new Flower(mouseX, mouseY)
    print(f)
}


class Flower {
    constructor(x, y){

        this.x = x
        this.y = y
        this.numPetals = floor(random(3,16))
        this.petalWidth = floor(random(20,40))
        this.petalLength = random(50,150)
        this.centerDiameter = random(30,80)
        this.centerCol = color(random(255),random(255),random(255))
        this.petalCol = color(random(255),random(255),random(255))
        this.xV = random(-5,5)
        this.yV = random(-5,5)
        this.rotations = 0
        this.rV = random(-5,5)

    }

display(){
translate(this.x, this.y)
    for (let r = 0; r < this.numPetals; r++) {
        push()
        rotate(360 / this.numPetals) *r
        translate(this.petalLength)
        ellipse(0, 0, this.petalWidth, this.petalLength)
        pop()
    }
ellipse(0,0, this.centerDiameter)
}

}