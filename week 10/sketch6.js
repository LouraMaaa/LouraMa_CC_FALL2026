let cam;
let hands = [];

let song;
let delay;
let reverb;

let scale = 12;
let effectAmount = 0;
let targetEffect = 0;

let playButton;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  rectMode(CENTER);
 cam = createCapture(VIDEO, { flipped: true });
  cam.size(width / scale, height / scale);
  cam.hide();

   handPose = await ml5.handPose({ flipped: true });
  handPose.detectStart(cam, gotHands);
  delay = new p5.Delay();
  reverb = new p5.Reverb();
  delay.process(song, 0.25, 0.35, 3000);
  reverb.process(delay, 3, 2);

playButton = createButton("PLAY MUSIC");
playButton.position(20, 20);
playButton.mousePressed(startMusic);
}

function startMusic() {
  userStartAudio();

  if (!song.isPlaying()) {
    song.loop();
  }
}

function preload() {
  song = loadSound("song.wav");
}

function draw() {
  background(0);

  targetEffect = 0;

  if (hands.length >= 2) {
    // Use the middle finger base as an approximate palm position
    let hand1 = hands[0].keypoints[9];
    let hand2 = hands[1].keypoints[9];

    let handDistance = dist(
      hand1.x, hand1.y,
      hand2.x, hand2.y
    );

    // Close hands = strong effect
    // Far hands = no effect
    targetEffect = map(handDistance, 50, 300, 1, 0);
    targetEffect = constrain(targetEffect, 0, 1);
  }


  effectAmount = lerp(effectAmount, targetEffect, 0.05);

  delay.drywet(effectAmount * 0.8);
  reverb.drywet(effectAmount);



  cam.loadPixels();

  let index = 0;

  colorMode(HSB, 360, 100, 100);

  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {

      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let bright = (r + g + b) / 3;

      let px = x * scale + scale / 2;
      let py = y * scale + scale / 2;

      // Pixel squares become larger when hands come together
      let size = map(
        bright, 0, 255,
        2, scale + effectAmount * 14
      );

      // Colors shift as the audio effect increases
      let hue = (
        x * 3 +
        y * 2 +
        effectAmount * 180 +
        frameCount * 0.2
      ) % 360;

      fill(
        hue,
        80 + effectAmount * 20,
        map(bright, 0, 255, 40, 100)
      );

      noStroke();
      rect(px, py, size, size);

      index += 4;
    }
  }

  colorMode(RGB, 255);



  for (let i = 0; i < hands.length; i++) {
    let palm = hands[i].keypoints[9];

    noFill();
    stroke(255);
    strokeWeight(3);
circle(
      palm.x * scale,
      palm.y * scale,
      25
    );
  }



  noStroke();
  fill(255);
  textSize(16);

  text(
    "Audio effect: " + round(effectAmount * 100) + "%",
    20,
    65
  );

  if (hands.length < 2) {
    text("Show both hands to control the sound", 20, 90);
  }
}

function gotHands(results) {
  hands = results;
}