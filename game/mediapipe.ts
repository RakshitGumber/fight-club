import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export let poseData: any = null;

let video: HTMLVideoElement;

export async function startCamera() {
  video = document.getElementById("camera-preview") as HTMLVideoElement;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  await new Promise((resolve) => {
    video.onloadedmetadata = () => resolve(true);
  });

  await video.play();

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );

  const pose = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
    },
    runningMode: "VIDEO",
    numPoses: 1,
  });

  async function loop() {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      poseData = pose.detectForVideo(video, performance.now());
    }
    requestAnimationFrame(loop);
  }

  loop();
}
