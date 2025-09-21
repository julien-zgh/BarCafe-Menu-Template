"use client";

import { Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <div className="w-full border-t border-gray-300 p-4 mt-8 relative flex flex-col sm:flex-row items-center">
      {/* Instagram logo */}
      <div className="mb-2 sm:mb-0 sm:absolute sm:right-4 flex justify-center w-full sm:w-auto">
        <a
          href="https://www.instagram.com/spacecafebar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 text-pink-500 transition-colors duration-300 hover:text-[conic-gradient(at_top_right, #feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]" />
        </a>
      </div>

      {/* Centered text */}
      <div className="flex-1 text-center text-gray-600">
        <p>
          &#169; {new Date().getFullYear()} Space Cafe Bar. All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <a
            href="https://www.instagram.com/builtbyjulien_/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            BuiltByJulien
          </a>
        </p>
      </div>
    </div>
  );
};
