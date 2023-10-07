import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as HeroCarousel } from "react-responsive-carousel";
import Image from "next/image";

const images = [
  {
    src: "/assets/images/nikon.svg",
    alt: "nikon camera",
  },
  {
    src: "/assets/images/macbook.png",
    alt: "macbook pro",
  },
  {
    src: "assets/images/apple-watch.svg",
    alt: "smartwatch",
  },
  {
    src: "/assets/images/xm4.png",
    alt: "sony xm4",
  },
];

const Carousel = () => {
  return (
    <div className="flex h-full w-full max-w-[560px] items-center rounded-[30px] bg-[#F2F4F7] py-5 pb-5 sm:mx-auto sm:px-10 sm:pt-20">
      <HeroCarousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        showArrows={false}
        showStatus={false}
        swipeable={true}
      >
        {images.map((image) => {
          return (
            <Image
              src={image.src}
              alt={image.alt}
              key={image.alt}
              width={484}
              height={484}
              className="object-fill"
            />
          );
        })}
      </HeroCarousel>
    </div>
  );
};

export default Carousel;
