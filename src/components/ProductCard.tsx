import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { RouterOutputs } from "~/utils/api";

type Product = RouterOutputs["product"]["getAll"][number];

const ProductCard = ({
  id,
  url,
  image,
  name,
  currentPrice,
  originalPrice,
  lowestPrice,
  highestPrice,
  averagePrice,
  currency,
  isOutOfStock,
  userId,
  createdAt,
}: Product) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 rounded-md border border-gray-200 p-4 sm:w-[292px] sm:max-w-[292px] ">
      <Link href={url} target="_blank" className="flex flex-1 gap-5 p-4">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="h-full max-h-[250px] w-full bg-transparent object-contain"
        />
      </Link>

      <div className="flex flex-col gap-3">
        <Link href={url} target="_blank">
          <h3 className="truncate text-xl font-semibold leading-6 text-gray-900">
            {name}
          </h3>
        </Link>

        <div className="flex justify-between">
          <Link
            href={`products/${id}`}
            className="text-lg capitalize text-black opacity-50"
          >
            View Details
          </Link>

          <p className="text-lg font-semibold text-black">
            <span>{currency}</span>
            <span>{currentPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
