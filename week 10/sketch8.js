
let handPose;
let cam;
let hands = [];

let song;
let delay;
let reverb;

let songLoaded = false;
let audioReady = false;

// Visual settings
let scale = 12;
let effectAmount = 0;
let targetEffect = 0;

// Gesture settings
let currentGesture = "none";
let candidateGesture = "none";
let candidateFrames = 0;
let lastGesture = "none";

let modelReady = false;
let cameraReady = false;



function preload() {
  song = loadSound(
    "song.wav",

    () => {
      songLoaded = true;
      console.log("Song loaded!");
    },

    () => {
      console.error("Song failed to load!");
    }
  );
}



async function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  pixelDensity(1);
  rectMode(CENTER);

  // Mouse click controls music
  canvas.mousePressed(toggleMusic);

  // Start camera
  console.log("Starting camera...");

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  // Wait for camera
  await new Promise((resolve, reject) => {

    if (cam.elt.readyState >= 2) {
      resolve();
    } else {
      cam.elt.addEventListener(
        "loadeddata",
        resolve,
        { once: true }
      );

      cam.elt.addEventListener(
        "error",
        reject,
        { once: true }
      );
    }
  });

  cameraReady = true;
  console.log("Camera ready!");

  
  console.log("Loading HandPose...");

  handPose = await ml5.handPose();

  modelReady = true;
  console.log("HandPose ready!");

  // Start detecting hands
  handPose.detectStart(cam, gotHands);

  // Create audio effects
  delay = new p5.Delay();
  reverb = new p5.Reverb();

  delay.process(song, 0.35, 0.7, 3000);
  reverb.process(song, 8, 4);

  // Start with original sound
  delay.drywet(0);
  reverb.drywet(0);

  console.log("Project ready!");
}



async function toggleMusic() {

  await userStartAudio();

  audioReady = true;

  if (!songLoaded) {
    console.log("Waiting for song to load...");
    return;
  }

  if (song.isPlaying()) {

    song.pause();
    console.log("Music paused");

  } else {

    song.loop();
    console.log("Music playing");

  }
}



function isFingerExtended(hand, tipIndex, pipIndex) {

  let wrist = hand.keypoints[0];
  let tip = hand.keypoints[tipIndex];
  let pip = hand.keypoints[pipIndex];

  let tipDistance = dist(
    wrist.x,
    wrist.y,
    tip.x,
    tip.y
  );

  let pipDistance = dist(
    wrist.x,
    wrist.y,
    pip.x,
    pip.y
  );

  return tipDistance > pipDistance * 1.2;
}



function detectGesture(hand) {

  let indexUp = isFingerExtended(hand, 8, 6);
  let middleUp = isFingerExtended(hand, 12, 10);
  let ringUp = isFingerExtended(hand, 16, 14);
  let pinkyUp = isFingerExtended(hand, 20, 18);

  // Open palm = play
  if (
    indexUp &&
    middleUp &&
    ringUp &&
    pinkyUp
  ) {
    return "open";
  }

  // Closed fist = pause
  if (
    !indexUp &&
    !middleUp &&
    !ringUp &&
    !pinkyUp
  ) {
    return "fist";
  }

  return "none";}

function updateGesture(gesture) {

  if (gesture === candidateGesture) {
    candidateFrames++;
  } else {
    candidateGesture = gesture;
    candidateFrames = 0;
  }

  // Gesture must stay stable for several frames
  if (candidateFrames >= 6 && gesture !== currentGesture) {

    currentGesture = gesture;

    if (gesture !== "none") {
      handleGesture(gesture);
    }
  }
}


function handleGesture(gesture) {

  if (!audioReady || !songLoaded) return;

  if (gesture !== lastGesture) {

    if (gesture === "open" && !song.isPlaying()) {
      song.loop();
      console.log("Open palm: PLAY");
    }

    if (gesture === "fist" && song.isPlaying()) {
      song.pause();
      console.log("Fist: PAUSE");
    }
  }

  lastGesture = gesture;
}



function draw() {

  background(0);

  // Wait for camera
  if (!cameraReady || !modelReady) {

    fill(255);
    textSize(22);
    textAlign(CENTER, CENTER);

    text(
      !cameraReady
        ? "Loading camera..."
        : "Loading hand tracking...",
      width / 2,
      height / 2
    );

    return;
  }

  

  let gesture = "none";

  if (hands.length > 0) {
    gesture = detectGesture(hands[0]);
  }

  updateGesture(gesture);



  targetEffect = 0;

  if (hands.length >= 2) {

    let hand1 = hands[0].keypoints[9];
    let hand2 = hands[1].keypoints[9];

    let handDistance = dist(
      hand1.x,
      hand1.y,
      hand2.x,
      hand2.y
    );

    targetEffect = map(
      handDistance,
      250,
      70,
      0,
      1
    );

    targetEffect = constrain(
      targetEffect,
      0,
      1
    );
  }

  // Smooth transition
  effectAmount = lerp(
    effectAmount,
    targetEffect,
    0.05
  );



  if (delay && reverb) {

    delay.delayTime(
      map(effectAmount, 0, 1, 0.2, 0.5)
    );

    delay.feedback(
      map(effectAmount, 0, 1, 0.3, 0.85)
    );

    delay.drywet(effectAmount);
    reverb.drywet(effectAmount);
  }

  

  cam.loadPixels();

  if (cam.pixels.length > 0) {

    colorMode(HSB, 360, 100, 100);

    for (
      let y = 0;
      y < cam.height;
      y += scale
    ) {

      for (
        let x = 0;
        x < cam.width;
        x += scale
      ) {

        let index = (y * cam.width + x) * 4;

        let r = cam.pixels[index];
        let g = cam.pixels[index + 1];
        let b = cam.pixels[index + 2];

        let bright = (r + g + b) / 3;

        let px = map(
          x,
          0,
          cam.width,
          0,
          width
        );

        let py = map(
          y,
          0,
          cam.height,
          0,
          height
        );

        // Square size changes with brightness
        let size = map(
          bright,
          0,
          255,
          2,
          scale + effectAmount * 14
        );

        // Blue color
        let blueBrightness = map(
          bright,
          0,
          255,
          30,
          100
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

 

//   fill(255);
//   noStroke();
//   textAlign(LEFT, TOP);
//   textSize(16);

//   text("Hands: " + hands.length, 20, 20);
//   text("Gesture: " + currentGesture, 20, 45);
//   text("Music: " + (song.isPlaying() ? "PLAYING" : "PAUSED"), 20, 70);
//   text("Audio ready: " + audioReady, 20, 95);

}



function gotHands(results) {
  hands = results;
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
