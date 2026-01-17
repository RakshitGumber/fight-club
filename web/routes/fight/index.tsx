import { useEffect } from "react";
import { createRoot } from "react-dom/client";

import "@web/global.css";

function App() {
  useEffect(() => {
    import("@engine/engine").then((m) => m.start());
  }, []);

  return <canvas id="game-canvas" />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
