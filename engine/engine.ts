import * as THREE from "three";
import { animate, initScene } from "./scene";

export const start = async () => {
  console.log("Game engine booted");
  initScene();
  animate();
};
