import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import "@public/global.css";

function App() {
  useEffect(() => {
    import("../../game/engine").then((m) => m.start());
  }, []);

  return (
    <>
      <canvas id="game-canvas" className="w-full h-full" />;
      <video
        id="camera-preview"
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          width: "200px",
          borderRadius: "12px",
          border: "2px solid #00ff00",
          zIndex: 10,
          transform: "scaleX(-1)", // mirror like a real mirror
        }}
      />
    </>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
