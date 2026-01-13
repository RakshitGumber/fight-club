import { poseData } from "./mediapipe";

let lastTime = performance.now();

let lastRight = 0;
let lastLeft = 0;

export let playerMove = "IDLE";

export function updateCombat() {
  if (!poseData || !poseData.landmarks) return;
  const lm = poseData.landmarks[0];
  if (!lm) return;

  const rw = lm[16]; // actually right hand
  const lw = lm[15]; // actually left hand
  const rs = lm[11];
  const ls = lm[12];

  const head = lm[0];

  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  if (dt === 0) return;

  // Relative forward distance
  const rForward = rs.z - rw.z;
  const lForward = ls.z - lw.z;

  const rSpeed = (rForward - lastRight) / dt;
  const lSpeed = (lForward - lastLeft) / dt;

  lastRight = rForward;
  lastLeft = lForward;

  playerMove = "IDLE";

  // Right jab
  if (rSpeed > 1.2 && Math.abs(rw.x - rs.x) < 0.25 && rw.y < rs.y + 0.2) {
    playerMove = "RIGHT_JAB";
  }

  // Left jab
  if (lSpeed > 1.2 && Math.abs(lw.x - ls.x) < 0.25 && lw.y < ls.y + 0.2) {
    playerMove = "LEFT_JAB";
  }

  // Guard (hands near face)
  if (Math.abs(rw.y - head.y) < 0.15 && Math.abs(lw.y - head.y) < 0.15) {
    playerMove = "GUARD";
  }
}
