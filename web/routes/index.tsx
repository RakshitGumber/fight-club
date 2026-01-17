import { createRoot } from "react-dom/client";

import "@web/global.css";

function App() {
  return (
    <div>
      <button onClick={() => (window.location.pathname = "./fight")}>
        fight
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
