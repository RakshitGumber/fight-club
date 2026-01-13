import * as THREE from "three";
import { GLTFLoader } from "three/GLTFLoader";

let mixer: THREE.AnimationMixer;
let actions: any = {};
let active = "";

export async function loadFighter(scene: THREE.Scene) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync("/game/models/boxer.glb");

  const model = gltf.scene;
  model.position.set(0, 0, 0);
  model.scale.set(1.2, 1.2, 1.2);
  scene.add(model);

  mixer = new THREE.AnimationMixer(model);

  gltf.animations.forEach((clip) => {
    actions[clip.name.toLowerCase()] = mixer.clipAction(clip);
  });

  play("idle");
}

export function updateFighter(dt: number) {
  if (mixer) mixer.update(dt);
}

export function play(name: string) {
  if (active === name || !actions[name]) return;

  for (const a in actions) actions[a].stop();
  actions[name].reset().play();
  active = name;
}
