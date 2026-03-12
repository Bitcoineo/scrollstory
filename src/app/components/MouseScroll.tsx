"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ScrollText from "./ScrollText";
import { haptics } from "../utils/haptics";

const FRAME_COUNT = 240;
const BG_COLOR = "#050708";

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

type ScrollSection = {
  enterAt: number;
  exitAt: number;
  position: "left" | "right";
  heading: string;
  tag: "h1" | "h2";
  sub?: string;
};

const scrollSections: ScrollSection[] = [
  {
    enterAt: 0.0,
    exitAt: 0.18,
    position: "left",
    heading: "Handsteel X",
    tag: "h1",
    sub: "Engineered to disappear in your hand.",
  },
  {
    enterAt: 0.25,
    exitAt: 0.38,
    position: "left",
    heading: "16K DPI Sensor",
    tag: "h2",
    sub: "Sub-micron precision. Zero smoothing.\nEvery micro-adjustment, captured.",
  },
  {
    enterAt: 0.38,
    exitAt: 0.5,
    position: "right",
    heading: "Titanium Scroll Wheel",
    tag: "h2",
    sub: "CNC-machined with magnetic detents.\nInfinite scroll or tactile steps.",
  },
  {
    enterAt: 0.5,
    exitAt: 0.62,
    position: "left",
    heading: "45g Magnesium Shell",
    tag: "h2",
    sub: "Lighter than a tennis ball.\nStronger than aluminum.",
  },
  {
    enterAt: 0.62,
    exitAt: 0.74,
    position: "right",
    heading: "80-Hour Battery",
    tag: "h2",
    sub: "Marathon sessions without the cable.\n10 minutes gets you 20 more hours.",
  },
  {
    enterAt: 0.8,
    exitAt: 0.96,
    position: "right",
    heading: "Engineered for\nyour hand.",
    tag: "h1",
  },
];

const headingClass: Record<"h1" | "h2", string> = {
  h1: "text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white/90",
  h2: "text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-white/90",
};

const subClass: Record<"h1" | "h2", string> = {
  h1: "mt-3 text-sm sm:text-lg md:text-xl lg:text-2xl text-white/50 max-w-[250px] sm:max-w-sm",
  h2: "mt-2 text-sm sm:text-base md:text-lg text-white/50 max-w-[250px] sm:max-w-sm",
};

export default function MouseScroll() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const layoutRef = useRef({
    dpr: 1,
    width: 0,
    height: 0,
    drawWidth: 0,
    drawHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const firedThresholdsRef = useRef(new Set<number>());

  const { scrollYProgress } = useScroll({ target: containerRef });

  const HAPTIC_THRESHOLD_COUNT = 3 + scrollSections.length; // ticks + sections

  // Haptic feedback at scroll milestones
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const fired = firedThresholdsRef.current;
    if (fired.size >= HAPTIC_THRESHOLD_COUNT) return;

    // Tick at 25/50/75%
    for (const t of [0.25, 0.5, 0.75]) {
      if (latest >= t && !fired.has(t)) {
        fired.add(t);
        haptics.tick();
      }
    }

    // Milestone at each section enterAt
    for (const s of scrollSections) {
      const key = s.enterAt + 100; // offset to avoid collision with tick thresholds
      if (latest >= s.enterAt && !fired.has(key)) {
        fired.add(key);
        haptics.success();
      }
    }
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [0, FRAME_COUNT - 1, FRAME_COUNT - 1]
  );

  const updateLayout = useCallback((imgWidth: number, imgHeight: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = rect.width / rect.height;

    const layout = layoutRef.current;
    layout.dpr = dpr;
    layout.width = targetWidth;
    layout.height = targetHeight;

    if (canvasAspect > imgAspect || window.innerWidth < 768) {
      layout.drawHeight = canvas.height;
      layout.drawWidth = layout.drawHeight * imgAspect;
      layout.offsetX = (canvas.width - layout.drawWidth) / 2;
      layout.offsetY = 0;
    } else {
      layout.drawWidth = canvas.width;
      layout.drawHeight = layout.drawWidth / imgAspect;
      layout.offsetX = 0;
      layout.offsetY = (canvas.height - layout.drawHeight) / 2;
    }

    const ctx = ctxRef.current;
    if (ctx) ctx.fillStyle = BG_COLOR;
  }, []);

  // Preload all frames into ref (not state)
  useEffect(() => {
    let cancelled = false;
    const imageArray: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;
    let lastReportedProgress = 0;

    const loadImage = (index: number): Promise<void> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          if (cancelled) return resolve();
          imageArray[index] = img;
          loadedCount++;
          const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
          if (progress >= lastReportedProgress + 5 || loadedCount === FRAME_COUNT) {
            lastReportedProgress = progress;
            setLoadProgress(progress);
          }
          resolve();
        };
        img.onerror = reject;
        img.src = getFramePath(index);
      });

    Promise.all(Array.from({ length: FRAME_COUNT }, (_, i) => loadImage(i)))
      .then(() => {
        if (cancelled) return;
        imagesRef.current = imageArray;
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load frames:", err);
        if (!cancelled) {
          imagesRef.current = imageArray;
          setIsLoaded(true);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // Initialize canvas context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext("2d");
    if (ctxRef.current) ctxRef.current.fillStyle = BG_COLOR;
  }, []);

  // Render a frame to the canvas (hot path)
  const renderFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !img) return;

    const { width, height, drawWidth, drawHeight, offsetX, offsetY } = layoutRef.current;
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Subscribe to scroll changes and render frames
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    updateLayout(imagesRef.current[0].width, imagesRef.current[0].height);

    let rafId: number;
    let lastFrame = -1;

    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
      if (index === lastFrame) return;
      lastFrame = index;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => renderFrame(index));
    });

    renderFrame(0);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [isLoaded, frameIndex, renderFrame, updateLayout]);

  // Handle window resize with rAF throttle
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    let resizeRafId: number;

    const handleResize = () => {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        updateLayout(imagesRef.current[0].width, imagesRef.current[0].height);
        renderFrame(Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex.get()))));
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(resizeRafId);
    };
  }, [isLoaded, frameIndex, renderFrame, updateLayout]);

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-hidden="true"
          />

          {/* Quality badge — covers watermark */}
          <div
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-6 md:right-6 pointer-events-none z-10 flex items-center gap-1.5 sm:gap-2 md:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-white/60 uppercase">Precision Certified</span>
          </div>

          {isLoaded &&
            scrollSections.map((s) => (
              <ScrollText
                key={s.heading}
                scrollProgress={scrollYProgress}
                enterAt={s.enterAt}
                exitAt={s.exitAt}
                position={s.position}
              >
                {s.tag === "h1" ? (
                  <h1 className={headingClass.h1}>
                    {s.heading.includes("\n")
                      ? s.heading.split("\n").map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))
                      : s.heading}
                  </h1>
                ) : (
                  <h2 className={headingClass.h2}>{s.heading}</h2>
                )}
                {s.sub && (
                  <p className={subClass[s.tag]}>
                    {s.sub}
                  </p>
                )}
              </ScrollText>
            ))}
        </div>
      </div>

      {/* Screen-reader accessible product description */}
      <section className="sr-only" aria-label="Product description">
        <h2>Handsteel X Gaming Mouse</h2>
        <p>
          The Handsteel X is a precision-engineered gaming mouse featuring a 16,000 DPI
          optical sensor, CNC-machined titanium scroll wheel, 45-gram magnesium alloy shell,
          80-hour battery life, tri-mode wireless connectivity (2.4GHz, Bluetooth 5.3, USB-C),
          and 16.8 million color RGB underglow. Priced at $149 with free worldwide shipping.
        </p>
      </section>
    </>
  );
}
