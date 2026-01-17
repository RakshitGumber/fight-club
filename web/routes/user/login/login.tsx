import { createRoot } from "react-dom/client";

import "@web/global.css";

function App() {
  return <div>from login!</div>;
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
