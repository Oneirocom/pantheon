import { defineNitroConfig } from "nitro/config";
import { pantheonModule } from "@magickml/pantheon-connector";

export default defineNitroConfig({
  compatibilityDate: "2024-08-07",
  modules: [pantheonModule],

  typescript: {
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
});
