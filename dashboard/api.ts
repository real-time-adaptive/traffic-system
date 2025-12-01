import { hc } from "../backend/src/utils/client.ts";
import type { AppType } from "../backend/src";

const api = hc<AppType>("http://localhost:8787/", {
  init: {
    credentials: "include",
  },
});

export default api;
