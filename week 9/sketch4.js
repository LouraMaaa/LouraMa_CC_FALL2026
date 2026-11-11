let handPose;
let cam;
let hands = [];
let scale = 12

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  rectMode(CENTER);

  cam  = createCapture(VIDEO, {flipped: true});
  cam.size(width / scale, height / scale);
  cam. hide()

  handPose = await ml5.handPose({ flipped: true });
  handPose.detectStart(cam, gotHands);
}

function draw() {
  background(0);

  cam.loadPixels();
let index = 0;

for (let y = 0; y < cam.height; y++) {

for (let x = 0; x < cam.width; x++) {

      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let bright = (r + g + b) / 3;
      let px = x * scale + scale / 2;
      let py = y * scale + scale / 2;
      let hue = (x * 3 + y * 2 + frameCount * 0.5) % 360;

      let size = map(bright, 0, 255, 2, scale);

      
//  fill(r, g, 255 - b);

//       let size = map(bright, 0, 255, 2, scale);

    //   let px = x * scale + scale / 2;
    //   let py = y * scale + scale / 2;

 if (hands.length > 0) {

        let thumb = hands[0].keypoints[4];
        let finger = hands[0].keypoints[8];

        let handX = thumb.x;
        let handY = thumb.y;

        let fingerX = finger.x;
        let fingerY = finger.y;

        let d = dist(handX, handY, fingerX, fingerY);

if (d < 35) {
      let pinchX = fingerX * scale
      let pinchY = fingerY * scale

      let distance = dist(px, py, pinchX, pinchY);

     if (distance < 100) {
     size = 20;
     hue = random(360);
     }
    }
    }
fill ( hue, 90, map(bright, 0, 255, 45,100))
      noStroke();
      rect(px, py, size, size);

      index += 4;
    }
  }
colorMode(RGB, 255)

  if (hands.length > 0) {

    let finger = hands[0].keypoints[8];

    noFill();
    stroke(200);
    strokeWeight(1);

    circle(
      finger.x * scale,
      finger.y * scale,
      35
    );
  }
}
function gotHands(results) {
  hands = results;
}