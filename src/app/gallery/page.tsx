"use client";

import { ColumnsPhotoAlbum, Photo } from "react-photo-album";
import "react-photo-album/columns.css";
import { getPhotos } from "@/Components/GalleryPhotos";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import useSmoothScroll from "@/lib/hooks/SmoothScroll";

// Skeleton component with image background and glow effect
const PhotoSkeleton = ({ height }: { height: number }) => (
  <div
    className="animate-pulse rounded-lg overflow-hidden relative bg-cover bg-center bg-no-repeat"
    style={{
      height: `${height}px`,
      backgroundImage: 'url("/logo-normal.png")',
    }}
  >
    {/* Overlay to create skeleton effect */}
    <div className="absolute inset-0 bg-gray-200/70"></div>
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
  </div>
);

// Generate skeleton items with random heights for natural look
const SkeletonGrid = ({ columns }: { columns: number }) => {
  const skeletonItems = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    height: Math.floor(Math.random() * 200) + 200, // Random height between 200-400px
  }));

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {skeletonItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          <PhotoSkeleton height={item.height} />
        </motion.div>
      ))}
    </div>
  );
};

const Gallery = () => {
  useSmoothScroll(0.85);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const getColumns = (containerWidth: number) => {
    if (containerWidth < 640) return 2; // small screens
    if (containerWidth < 1024) return 3; // medium screens
    return 4; // large screens
  };

  useEffect(() => {
    setIsLoading(true);
    getPhotos()
      .then(setPhotos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full h-[110px] bg-[#f2e6d3]"></div>
      </motion.nav>

      <div className="relative top-5 p-4">
        {isLoading ? (
          <SkeletonGrid
            columns={getColumns(
              typeof window !== "undefined" ? window.innerWidth : 1024
            )}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ColumnsPhotoAlbum
              photos={photos}
              onClick={({ index: current }) => setIndex(current)}
              columns={getColumns}
            />
          </motion.div>
        )}

        <Lightbox
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default Gallery;
