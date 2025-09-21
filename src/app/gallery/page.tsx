"use client";

import Navbar from "@/Components/Navigation";
import { ColumnsPhotoAlbum, Photo } from "react-photo-album";
import "react-photo-album/columns.css";
import {getPhotos} from "@/Components/GalleryPhotos";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    getPhotos().then(setPhotos);
  }, []);

  return (
    <>
      <Navbar />
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // className="w-full fixed top-0 left-0 z-50 bg-white/20 backdrop-blur-md shadow-md"
      >
        <div className="w-full h-[110px] bg-[#f2e6d3]"></div>
      </motion.nav>

      <div className="relative top-5 p-4">
        <ColumnsPhotoAlbum
          photos={photos}
          onClick={({ index: current }) => setIndex(current)}
        />

        <Lightbox
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>
    </>
  );
};

export default Gallery;
