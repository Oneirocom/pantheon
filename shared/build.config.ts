import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  declaration: true,

  entries: [{ input: "src/index.ts", outDir: "dist" }],

  externals: ["@colyseus/schema"],
  rollup: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
});
