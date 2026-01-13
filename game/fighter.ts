import * as THREE from "three";
import { poseData } from "./mediapipe";

let leftArm: THREE.Mesh;
let rightArm: THREE.Mesh;
let leftFist: THREE.Mesh;
let rightFist: THREE.Mesh;

export function createPlayer(scene: THREE.Scene) {
  const mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

  leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), mat);
  rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), mat);

  leftFist = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), mat);
  rightFist = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), mat);

  scene.add(leftArm, rightArm, leftFist, rightFist);
}

export function updatePlayer() {
  if (!poseData || !poseData.landmarks) return;
  const lm = poseData.landmarks[0];
  if (!lm) return;

  // mirror correction
  const lw = lm[15];
  const rw = lm[16];
  const le = lm[14];
  const re = lm[13];

  setBox(leftArm, le, lw);
  setBox(rightArm, re, rw);

  setPoint(leftFist, lw);
  setPoint(rightFist, rw);
}

function mp(p: any) {
  return new THREE.Vector3((p.x - 0.5) * 4, 2 - p.y * 3, -p.z);
}

function setPoint(obj: THREE.Object3D, p: any) {
  const v = mp(p);
  obj.position.lerp(v, 0.5);
}

function setBox(box: THREE.Mesh, a: any, b: any) {
  const v1 = mp(a);
  const v2 = mp(b);

  const mid = v1.clone().add(v2).multiplyScalar(0.5);
  box.position.lerp(mid, 0.5);

  box.lookAt(v2);
  box.scale.set(1, v1.distanceTo(v2), 1);
}
