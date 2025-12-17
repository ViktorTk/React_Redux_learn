import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { worker } from "./api/server.js";

async function main() {
  await worker.start({ onUnhandledRequest: "bypass" });

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
}

main();
