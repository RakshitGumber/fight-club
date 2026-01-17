import * as THREE from "three";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

export const initScene = () => {
  console.log("Scene intialized");
  try {
    const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 3, 6);
    camera.lookAt(0, 1, 0);

    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const hemi = new THREE.HemisphereLight(0xeedd82, 0xffffff, 0.5);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // Floor (boxing ring)
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x383e5a,
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

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    console.log("Scene Loaded");
  } catch (error) {
    alert("Unable to load Screen: \n" + error);
  }
};

export function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
