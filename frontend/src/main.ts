import App from "./App.svelte";
import { setup } from "twind/shim";
import { withForms } from "@twind/forms";

setup({
  mode: "silent",
  preflight: withForms(),
  theme: {
    extend: {
      padding: {
        "17": "4.25rem",
      },
      inset: {
        "3-px": "3px",
      },
    },
  },
});

var app = new App({
  target: document.getElementById("app"),
});

export default app;
