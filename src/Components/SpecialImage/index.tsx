import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import { defaultMarkerImage } from "./default";

type SpecialImageProps = {
  src?: string;
  alt?: string;
} & Omit<ImageProps, "src" | "alt">;

const SpecialImage = ({
  src,
  alt,
  width,
  height,
  fill,
  ...props
}: SpecialImageProps) => {
  const [imgSrc, setImgSrc] = useState(src || defaultMarkerImage);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      placeholder="blur"
      blurDataURL={defaultMarkerImage}
      quality="100"
      {...(!fill
        ? {
            width: width ?? 100,
            height: height ?? 100,
          }
        : { fill: true })}
      data-loaded="false"
      onLoad={(event) => {
        event.currentTarget.setAttribute("data-loaded", "true");
      }}
      onError={() => {
        if (imgSrc !== defaultMarkerImage) {
          setImgSrc(defaultMarkerImage);
        }
      }}
    />
  );
};

export default SpecialImage;
