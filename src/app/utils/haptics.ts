const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const vibrate = (pattern: number | number[]) => {
  if (isTouch()) navigator?.vibrate?.(pattern);
};

export const haptics = {
  light: () => vibrate(10),
  medium: () => vibrate(25),
  heavy: () => vibrate(50),
  milestone: () => vibrate([15, 50, 15]),
  success: () => vibrate([10, 30, 10, 30, 40]),
  tick: () => vibrate(5),
};
