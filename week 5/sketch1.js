
// create an array
let students=
[ "1","2","3","4","5"]
let student=""
let font
let col = 0;


async function setup() {

    font = await loadFont('fonts/SourceSansPro-Regular.otf');

    textAlign(CENTER);
    textFont(font);
    textSize(32);
    fill(0)
}

function draw(){
   background(255);
   fill(col)

//    background(0);
//    fill(255-col);

//    text("test",width/2, height/2)
   text(student,width/2, height/2)

//    col = col*0.99
      col*= 0.99
   
}

function mousePressed() {
    // array
    let length = students.length;

    // floor goes down to the next full number
    let i = floor (random (length-1))

    if(students.length > 0){
        student = students[i];
        
        students.splice(i,1)
    }

    
    print(students)
    col = 255

    // print(student);
}
