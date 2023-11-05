import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  clean: true,
  dts: true,
  target: "es2019",
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  ...options,
}));
