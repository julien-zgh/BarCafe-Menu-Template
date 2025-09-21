// photos.ts
import type { Photo } from "react-photo-album";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const imageFiles: { src: string; alt: string }[] = [
  { src: "1.jpg", alt: "Hiking boots" },
  { src: "2.jpg", alt: "Purple petaled flowers near a mountain" },
  { src: "3.jpg", alt: "A person pointing at a beige map" },
  { src: "4.jpg", alt: "Two hikers walking toward a snow-covered mountain" },
  {
    src: "5.jpg",
    alt: "A silver and black coffee mug on a brown wooden table",
  },
  { src: "6.jpg", alt: "A worm's eye view of trees at night" },
  { src: "7.jpg", alt: "A pine tree forest near a mountain at sunset" },
  { src: "8.jpg", alt: "Silhouette photo of three hikers near tall trees" },
  { src: "9.jpg", alt: "A person sitting near a bonfire surrounded by trees" },
  { src: "10.jpg", alt: "Green moss on gray rocks in a river" },
  { src: "11.jpg", alt: "Landscape photography of mountains" },
  { src: "12.jpg", alt: "A pathway between green trees during daytime" },
  {
    src: "14.jpg",
    alt: "A man wearing a black jacket and backpack standing on a grass field during sunset",
  },
  {
    src: "15.jpg",
    alt: "Green pine trees under white clouds during the daytime",
  },
  { src: "16.jpg", alt: "A hiker sitting near the cliff" },
];

// Function to detect image sizes
function getImageSize(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
  });
}

// Build photos array dynamically
export async function getPhotos(): Promise<Photo[]> {
  const photos: Photo[] = [];

  for (const file of imageFiles) {
    const { width, height } = await getImageSize(`/${file.src}`);
    photos.push({
      src: `/${file.src}`,
      alt: file.alt,
      width,
      height,
      srcSet: breakpoints.map((b) => ({
        src: `/${file.src}`,
        width: b,
        height: Math.round((height / width) * b),
      })),
    });
  }

  return photos;
}
