import { WebHaptics } from "web-haptics";

let instance: WebHaptics | null = null;

function getHaptics(): WebHaptics | null {
  if (typeof window === "undefined") return null;
  if (!instance) instance = new WebHaptics();
  return instance;
}

export const haptics = {
  light: () => getHaptics()?.trigger("light"),
  medium: () => getHaptics()?.trigger("medium"),
  heavy: () => getHaptics()?.trigger("heavy"),
  success: () => getHaptics()?.trigger("success"),
  tick: () => getHaptics()?.trigger("selection"),
};
