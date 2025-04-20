import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

type ImageType = {
  id: number;
  image: StaticImageData;
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
    <Image
      className={className}
      src={src.image}
      alt={alt}
      width={src.width}
      height={src.height}
    />
  );
}
