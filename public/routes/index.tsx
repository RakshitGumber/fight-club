import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import "@public/global.css";

function App() {
  useEffect(() => {
    import("../../game/engine").then((m) => m.start());
  }, []);

  return <canvas id="game-canvas" className="w-full h-full" />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
