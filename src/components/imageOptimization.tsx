import React from "react";

type ImageType = {
  id: number;
  image: string; 
  width?: number;
  height?: number;
  name?: string;
};

type Props = {
  src: ImageType;
  alt: string;
  className?: string;
};

export default function ImageOptimize({
  src,
  alt = "image",
  className,
}: Props) {
  return (
    <img
      className={className}
      src={src.image}
      alt={alt}
      width={src.width}
      height={src.height}
      loading="lazy"
      decoding="async"
    />
  );
}
