"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";
import Navbar from "@/Components/Navigation";
import CafeMenu from "@/Components/Menu";
import { Footer } from "@/Components/Footer";
import { Location } from "@/Components/Location";

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
];

export default function Home() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height, width } = dimension;
  const isMobile = width <= 768;

  // Adjust motion distance for mobile
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 1 : 2)]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 1.2 : 3.3)]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 0.8 : 1.25)]
  );
  const y4 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * (isMobile ? 1 : 3)]
  );

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} delay={0} />
        <Column images={[images[3], images[4], images[5]]} y={y2} delay={0.1} />
        <Column images={[images[6], images[7], images[8]]} y={y3} delay={0.2} />
        <Column
          images={[images[9], images[10], images[11]]}
          y={y4}
          delay={0.3}
        />
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
  delay?: number;
}

const Column: React.FC<ColumnProps> = ({ images, y, delay = 0 }) => {
  return (
    <motion.div
      className={styles.column}
      style={{ y, willChange: "transform" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      {images.map((src: string, i: number) => (
        <div key={i} className={styles.imageContainer}>
          <Image
            src={`/${src}`}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={60}
            priority={i < 2} // load first two eagerly
            loading={i < 2 ? "eager" : "lazy"}
            className="object-cover pointer-events-none"
          />
        </div>
      ))}
    </motion.div>
  );
};
