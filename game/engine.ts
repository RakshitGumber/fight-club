import * as THREE from "three";
import { startCamera, poseData } from "./mediapipe";
import { updateCombat, playerMove } from "./combat";
import { createPlayer, updatePlayer } from "./fighter";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let skeletonLines: THREE.LineSegments;

export function start() {
  initScene();
  createPlayer(scene);
  startCamera();
  animate();
}

function initScene() {
  // Canvas created by React
  const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101010);

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 6);
  camera.lookAt(0, 1, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lights
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5, 10, 7);
  scene.add(dir);

  // Floor (boxing ring)
  const floorGeo = new THREE.PlaneGeometry(20, 20);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Simple ring center mark
  const ringGeo = new THREE.CircleGeometry(2, 32);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x4444ff });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.01;
  scene.add(ring);

  // Skeleton
  const mat = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const geo = new THREE.BufferGeometry();
  skeletonLines = new THREE.LineSegments(geo, mat);
  scene.add(skeletonLines);

  // Resize handler
  window.addEventListener("resize", onResize);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateSkeleton() {
  if (!poseData || !poseData.landmarks) return;

  const lm = poseData.landmarks[0];
  if (!lm) return;

  const points: number[] = [];

  const pairs = [
    [11, 13],
    [13, 15], // left arm
    [12, 14],
    [14, 16], // right arm
    [11, 12], // shoulders
    [23, 24], // hips
    [11, 23],
    [12, 24], // torso
  ];

  for (const [a, b] of pairs) {
    const p1 = lm[a];
    const p2 = lm[b];

    points.push(
      (p1.x - 0.5) * 4,
      2 - p1.y * 3,
      -p1.z,
      (p2.x - 0.5) * 4,
      2 - p2.y * 3,
      -p2.z
    );
  }

  skeletonLines.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points, 3)
  );
}

function animate() {
  requestAnimationFrame(animate);
  updatePlayer();

  updateCombat();

  if (playerMove !== "IDLE") {
    console.log(playerMove);
  }

  updateSkeleton();
  renderer.render(scene, camera);
}
