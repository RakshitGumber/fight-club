import { useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
  useEffect(() => {
    import("../../game/engine").then((m) => m.start());
  }, []);

  return <canvas id="game-canvas" />;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
