import { defineNovaModule } from "@gtc-nova/kit";
import { pantheonFeatures, type PantheonFeatures } from "./features";

export const pantheonModule = defineNovaModule<PantheonFeatures>({
  name: "pantheon",
  features: pantheonFeatures,
  featureTypeFunctions: {
    actions: () => {},
    worlds: () => {},
  },
  pluginsDir: "./../src/runtime/plugins",
  metaUrl: import.meta.url,
  hooks: [],
});

export type * from "./types";
