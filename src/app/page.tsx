"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";
import CafeMenu from "@/Components/Menu";
import { Footer } from "@/Components/Footer";
import { Location } from "@/Components/Location";
import { defaultMarkerImage } from "@/Components/SpecialImage/default";

const images: string[] = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
];

export default function Home() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  // Reduce transform intensity on mobile for better performance
  const multiplier = isMobile ? 0.5 : 1;

  // Add rounding to prevent sub-pixel movements
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 2 * multiplier],
    {
      clamp: true,
    }
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 3.3 * multiplier],
    { clamp: true }
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 1.25 * multiplier],
    { clamp: true }
  );
  const y4 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * 3 * multiplier],
    { clamp: true }
  );

  useEffect(() => {
    const lenis = new Lenis({
      // Adjust settings for smoother stop behavior
      lerp: window.innerWidth < 768 ? 0.8 : 0.15, // Slightly higher lerp for desktop
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimension({ width, height });
      setIsMobile(width < 768);
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  // Organize images for mobile (2 columns) vs desktop (4 columns)
  const getColumnImages = () => {
    if (isMobile) {
      return [
        [images[0], images[2], images[4], images[6]], // Column 1
        [images[8], images[10], images[1], images[3]], //Column 2
        [images[5], images[7], images[9], images[11]], // Column 3
      ];
    } else {
      return [
        [images[0], images[1], images[2]], // Column 1
        [images[3], images[4], images[5]], // Column 2
        [images[6], images[7], images[8]], // Column 3
        [images[9], images[10], images[11]], // Column 4
      ];
    }
  };

  const columnImages = getColumnImages();

  return (
    <main className={styles.main}>
      <div ref={gallery} className={styles.gallery}>
        {isMobile ? (
          <>
            <Column images={columnImages[0]} y={y} isMobile={true} />
            <Column images={columnImages[1]} y={y2} isMobile={true} />
          </>
        ) : (
          <>
            <Column images={columnImages[0]} y={y} isMobile={false} />
            <Column images={columnImages[1]} y={y2} isMobile={false} />
            <Column images={columnImages[2]} y={y3} isMobile={false} />
            <Column images={columnImages[3]} y={y4} isMobile={false} />
          </>
        )}
      </div>
      <div className={styles.spacer}>
        <h1
          style={{ fontFamily: "var(--font-pacifico)" }}
          className="text-center pt-4 text-6xl"
        >
          Our Menu
        </h1>

        <section id="menu">
          <CafeMenu />
        </section>

        <section id="location">
          <Location />
        </section>

        <Footer />
      </div>
    </main>
  );
}

interface ColumnProps {
  images: string[];
  y: MotionValue<number>;
  isMobile: boolean;
}

const Column: React.FC<ColumnProps> = ({ images, y, isMobile }) => {
  return (
    <motion.div
      className={styles.column}
      style={{
        y,
        // Use transform3d for better mobile performance and add will-change
        transform: isMobile ? "translate3d(0, 0, 0)" : undefined,
        willChange: "transform",
      }}
      // Add transition for smoother stops
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0,
      }}
    >
      {images.map((src: string, i: number) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <Image
              src={`/${src}`}
              alt="image"
              fill
              sizes={
                isMobile
                  ? "(max-width: 768px) 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              }
              quality={isMobile ? 85 : 100}
              priority={i < 2}
              loading={i < 2 ? "eager" : "lazy"}
              className="object-cover"
              placeholder="blur"
              blurDataURL={defaultMarkerImage}
              onLoad={(event) => {
                event.currentTarget.setAttribute("data-loaded", "true");
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
};
