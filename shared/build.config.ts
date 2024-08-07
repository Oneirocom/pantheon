import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  declaration: "compatible",

  entries: [
    {
      input: "./src/index.ts",
      outDir: "dist",
      declaration: "compatible",
    },
  ],

  externals: ["@colyseus/schema"],

  rollup: {
    emitCJS: true,
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
});
