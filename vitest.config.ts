import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [tsconfigPaths()],
  };
});
