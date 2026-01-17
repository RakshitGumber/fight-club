import { createRoot } from "react-dom/client";

import "@web/global.css";

function App() {
  return <div>Hello, World!</div>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
