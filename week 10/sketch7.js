let handPose;
let cam;
let hands = [];

let song;
let delay;
let reverb;

let scale = 12;

let effectAmount = 0;
let targetEffect = 0;

let audioReady = false;
let lastGesture = "none";

function preload() {
  song = loadSound(
    "song.wav",
    () => console.log("Song loaded successfully"),
    () => console.log("Song failed to load")
  );
}
async function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  pixelDensity(1);
  rectMode(CENTER);

  canvas.mousePressed(unlockAudio);

  console.log("Starting camera...");

  // Create webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  // Wait for webcam to load
  await new Promise(resolve => {
    if (cam.elt.readyState >= 2) {
      resolve();
    } else {
      cam.elt.addEventListener("loadeddata", resolve, {
        once: true
      });
    }
  });

  console.log("Camera ready!");

  // Load hand tracking model
  console.log("Loading HandPose...");

  handPose = await ml5.handPose({
    flipped: true
  });

  console.log("HandPose ready!");

  // Start detecting hands
  handPose.detectStart(cam, gotHands);

  // Initialize sound effects
  delay = new p5.Delay();
  reverb = new p5.Reverb();

  delay.process(song, 0.35, 0.7, 3000);
  reverb.process(delay, 8, 4);

  delay.drywet(0);
  reverb.drywet(0);

  console.log("Everything ready!");
}


async function unlockAudio() {
  await userStartAudio();

  audioReady = true;

  if (!song.isPlaying()) {
    song.loop();
  }
}



function isFingerExtended(hand, tipIndex, pipIndex) {
  let tip = hand.keypoints[tipIndex];
  let pip = hand.keypoints[pipIndex];
  let wrist = hand.keypoints[0];

  let tipDistance = dist(
    wrist.x, wrist.y,
    tip.x, tip.y
  );

  let pipDistance = dist(
    wrist.x, wrist.y,
    pip.x, pip.y
  );

  return tipDistance > pipDistance * 1.2;
}

function detectGesture(hand) {
  let indexUp = isFingerExtended(hand, 8, 6);
  let middleUp = isFingerExtended(hand, 12, 10);
  let ringUp = isFingerExtended(hand, 16, 14);
  let pinkyUp = isFingerExtended(hand, 20, 18);

  // Open palm = all four fingers extended
  if (indexUp && middleUp && ringUp && pinkyUp) {
    return "open";
  }

  // Fist = all four fingers folded
  if (!indexUp && !middleUp && !ringUp && !pinkyUp) {
    return "fist";
  }

  return "none";
}

function handleGesture(gesture) {
  if (!audioReady) return;

  if (gesture !== lastGesture && gesture !== "none") {

    if (gesture === "open" && !song.isPlaying()) {
      song.loop();
    }

    if (gesture === "fist" && song.isPlaying()) {
      song.pause();
    }
  }

  lastGesture = gesture;
}

function draw() {

      background(0);

  // Wait until camera is ready
  if (!cam || cam.elt.readyState < 2) {
    fill(255);
    textSize(20);
    text("Loading camera...", 30, 50);
    return;
  }


  let gesture = "none";

  if (hands.length > 0) {
    gesture = detectGesture(hands[0]);
  }

  handleGesture(gesture);
fill(255);
textSize(24);
text("Gesture: " + gesture, 30, 40);

text("Hands detected: " + hands.length, 30, 75);


  targetEffect = 0;

  if (hands.length >= 2) {
    let hand1 = hands[0].keypoints[9];
    let hand2 = hands[1].keypoints[9];

    let handDistance = dist(
      hand1.x, hand1.y,
      hand2.x, hand2.y
    );

    targetEffect = map(
      handDistance,
      250, 70,
      0, 1
    );

    targetEffect = constrain(targetEffect, 0, 1);
  }

  effectAmount = lerp(
    effectAmount,
    targetEffect,
    0.05
  );


  delay.delayTime(
    map(effectAmount, 0, 1, 0.2, 0.5)
  );

  delay.feedback(
    map(effectAmount, 0, 1, 0.3, 0.85)
  );

  delay.drywet(effectAmount);
  reverb.drywet(effectAmount);


  cam.loadPixels();

  colorMode(HSB, 360, 100, 100);

  for (let y = 0; y < cam.height; y += scale) {
    for (let x = 0; x < cam.width; x += scale) {

      let index = (y * cam.width + x) * 4;

      let r = cam.pixels[index];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let bright = (r + g + b) / 3;

      let px = map(x, 0, cam.width, 0, width);
      let py = map(y, 0, cam.height, 0, height);

      let size = map(
        bright, 0, 255,
        2, scale + effectAmount * 14
      );

      // Only blue hues
      let blueBrightness = map(
        bright, 0, 255,
        30, 100
      );

      blueBrightness -= effectAmount * 15;

      fill(205, 55, blueBrightness);
      noStroke();

      rect(
        px + scale / 2,
        py + scale / 2,
        size,
        size
      );
    }
  }

  colorMode(RGB, 255);
}


function gotHands(results) {
  hands = results;
}