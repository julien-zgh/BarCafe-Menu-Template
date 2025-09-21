"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f2e6d3] text-[#3a2e2b] p-6">
      {/* Animated coffee cup */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-40 h-40 mb-8"
      >
        <Image
          src="/coffee-cup.webp"
          alt="Coffee Cup"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl mb-6 text-center max-w-md"
      >
        Oops! The page you are looking for is brewing somewhere else. Maybe
        enjoy a coffee while we get you back on track.
      </motion.p>

      {/* Go Home Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/"
          className="px-6 py-3 bg-[#6b4226] text-white rounded hover:bg-[#8b5e3c] transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
