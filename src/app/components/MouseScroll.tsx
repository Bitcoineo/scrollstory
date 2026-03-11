"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import ScrollText from "./ScrollText";

const FRAME_COUNT = 240;
const BG_COLOR = "#080808";

function getFramePath(index: number): string {
  return `/frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

export default function MouseScroll() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Forward 0→239 in first half, reverse 239→0 in second half
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, FRAME_COUNT - 1, 0]
  );

  // Preload all frames
  useEffect(() => {
    const imageArray: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageArray[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          resolve();
        };
        img.onerror = reject;
        img.src = getFramePath(index);
      });
    };

    Promise.all(
      Array.from({ length: FRAME_COUNT }, (_, i) => loadImage(i))
    ).then(() => {
      setImages(imageArray);
      setIsLoaded(true);
    });
  }, []);

  // Render a frame to the canvas
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images[index]) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const img = images[index];
      const imgAspect = img.width / img.height;
      const canvasAspect = rect.width / rect.height;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasAspect > imgAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [images]
  );

  // Subscribe to scroll changes and render frames
  useEffect(() => {
    if (!isLoaded) return;

    let rafId: number;
    let lastFrame = -1;

    const unsubscribe = frameIndex.on("change", (latest) => {
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
      if (index === lastFrame) return;
      lastFrame = index;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        renderFrame(index);
      });
    });

    // Render first frame immediately
    renderFrame(0);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [isLoaded, frameIndex, renderFrame]);

  // Handle window resize
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const index = Math.round(frameIndex.get());
      renderFrame(Math.min(FRAME_COUNT - 1, Math.max(0, index)));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndex, renderFrame]);

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <div ref={containerRef} className="relative h-[1000vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-hidden="true"
          />

          {isLoaded && (
            <>
              {/* === FORWARD PHASE (0–0.5): Explode === */}
              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.0}
                exitAt={0.08}
                position="left"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white/90">
                  Handsteel X
                </h1>
                <p className="mt-4 text-lg md:text-2xl tracking-tight text-white/60">
                  Elevate your game.
                </p>
              </ScrollText>

              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.11}
                exitAt={0.19}
                position="right"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
                  Precision
                  <br />
                  Engineering.
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/50 max-w-xs">
                  Every curve calculated. Every gram measured.
                </p>
              </ScrollText>

              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.24}
                exitAt={0.33}
                position="left"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
                  Titanium
                  <br />
                  Drivers.
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/50 max-w-xs">
                  Built to outlast everything.
                </p>
              </ScrollText>

              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.39}
                exitAt={0.48}
                position="right"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
                  Feel Everything.
                </h2>
                <p className="mt-6 text-base md:text-lg text-white/50">
                  Coming Q4 2026
                </p>
              </ScrollText>

              {/* === REVERSE PHASE (0.5–1.0): Reassemble === */}
              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.55}
                exitAt={0.65}
                position="left"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
                  Every Detail.
                  <br />
                  Perfected.
                </h2>
              </ScrollText>

              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.7}
                exitAt={0.8}
                position="right"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
                  Born for
                  <br />
                  Champions.
                </h2>
              </ScrollText>

              <ScrollText
                scrollProgress={scrollYProgress}
                enterAt={0.88}
                exitAt={0.98}
                position="left"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white/90">
                  Handsteel X
                </h1>
                <p className="mt-4 text-lg md:text-xl tracking-tight text-white/40">
                  Scroll down to explore
                </p>
              </ScrollText>
            </>
          )}
        </div>
      </div>
    </>
  );
}
