import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import PriceInfoCard from "~/components/PriceInfoCard";
import { api } from "~/utils/api";

const ProductDetails = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isLoadingError, isError } =
    api.product.getById.useQuery({ id });

  if (isLoadingError) {
    return <span>Unauthorized</span>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <span>Something went wrong...</span>;
  }

  if (!data) {
    return <span>Hmm...this page doesn&apos;t exist</span>;
  }

  return (
    <Layout>
      <div className="flex flex-col flex-wrap gap-16 px-6 py-10 md:px-20">
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-28">
          {/* Image container */}
          <div className="flex max-w-full flex-grow rounded-[17px] border border-[#CDDBFF] py-16 xl:max-w-[50%]">
            <Image
              src={data.image}
              alt={data.name}
              width={250}
              height={250}
              className="mx-auto my-auto max-h-[36rem] object-contain"
            />
          </div>

          {/* Content container */}
          <div className="flex flex-1 flex-col">
            <div className="flex flex-wrap items-start justify-between gap-5 pb-6">
              {/* Content Header */}
              <div className="flex flex-col gap-3">
                <p className="text-[28px] font-semibold">{data.name}</p>
                <Link href={data.url} target="_blank" className="opacity-50">
                  Visit Product
                </Link>
              </div>

              <div className="flex w-full flex-wrap items-center gap-10 border-y border-y-[#E4E4E4] py-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[34px] font-bold">
                    {data.currency} {data.currentPrice}
                  </p>
                  {data.currentPrice < data.originalPrice && (
                    <p className="text-[21px] text-black line-through opacity-50">
                      {data.currency} {data.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* Price cards  */}
              <div className="my-7 flex flex-col gap-5">
                <div className="flex flex-wrap gap-5">
                  <PriceInfoCard
                    title="Current Price"
                    iconSrc="/assets/icons/price-tag.svg"
                    value={`${data.currency} ${data.currentPrice}`}
                  />
                  <PriceInfoCard
                    title="Average Price"
                    iconSrc="/assets/icons/chart.svg"
                    value={`${data.currency} ${data.averagePrice}`}
                  />
                  <PriceInfoCard
                    title="Highest Price"
                    iconSrc="/assets/icons/arrow-up.svg"
                    value={`${data.currency} ${data.highestPrice}`}
                  />
                  <PriceInfoCard
                    title="Lowest Price"
                    iconSrc="/assets/icons/arrow-down.svg"
                    value={`${data.currency} ${data.lowestPrice}`}
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button className="w-full rounded-md bg-red-400 p-3 text-lg font-semibold transition-all duration-200 hover:bg-red-500">
                  Untrack
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
