import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import React from "react";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import PriceInfoCard from "~/components/PriceInfoCard";
import { api } from "~/utils/api";
import { PiChartLine, PiChartLineDown, PiChartLineUp } from "react-icons/pi";
import { IoIosPricetag } from "react-icons/io";

const ProductDetails = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isLoadingError, isError } =
    api.product.getById.useQuery({ id });

  const { mutate, isLoading: isMutationLoading } =
    api.product.delete.useMutation({
      onSuccess: () => {
        toast.success("Removed from tracked products");
        void router.push("/tracked-products");
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors?.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error(e.message);
        }
      },
    });

  if (isLoadingError) {
    return <span>Unauthorized</span>;
  }

  if (isMutationLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <span>Someg went wrong...</span>;
  }

  if (!data) {
    return <span>Hmm...this page doesn&apos;t exist</span>;
  }

  return (
    <Layout>
      <div className="flex flex-col flex-wrap gap-16 px-6 py-10 md:px-20">
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-28">
          {/* Image container */}
          <div className="flex max-w-full flex-grow rounded-[17px] border border-gray-200 py-16 xl:max-w-[50%]">
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
                <div>
                  <Link
                    href={data.url}
                    target="_blank"
                    className="hover:text-accent text-lg opacity-60 transition-all duration-200"
                  >
                    Visit Product
                  </Link>
                </div>
              </div>

              <div className="flex w-full flex-wrap items-center gap-10 border-y border-y-[#E4E4E4] py-6">
                <div className="flex flex-col gap-2">
                  <p className="text-[34px] font-bold">
                    {data.currency} {data.currentPrice.toFixed(2)}
                  </p>
                  {data.currentPrice < data.originalPrice && (
                    <p className="text-[21px] text-black line-through opacity-50">
                      {data.currency} {data.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {/* Price cards  */}
              <div className="my-7 flex flex-col gap-5">
                <div className="flex flex-wrap gap-5">
                  <PriceInfoCard
                    title="Current Price"
                    icon={
                      <IoIosPricetag size={28} className="text-green-400" />
                    }
                    value={`${data.currency} ${data.currentPrice.toFixed(2)}`}
                  />
                  <PriceInfoCard
                    title="Average Price"
                    icon={<PiChartLine size={28} className="text-slate-400" />}
                    value={`${data.currency} ${data.averagePrice.toFixed(2)}`}
                  />
                  <PriceInfoCard
                    title="Highest Price"
                    icon={<PiChartLineUp size={28} className="text-red-400" />}
                    value={`${data.currency} ${data.highestPrice.toFixed(2)}`}
                  />
                  <PriceInfoCard
                    title="Lowest Price"
                    icon={
                      <PiChartLineDown size={28} className="text-blue-400" />
                    }
                    value={`${data.currency} ${data.lowestPrice.toFixed(2)}`}
                  />
                </div>
              </div>

              <div className="flex w-full">
                <button
                  className="w-full rounded-md bg-red-400 p-3 text-lg font-semibold transition-all duration-200 hover:brightness-90"
                  onClick={() => {
                    mutate({ id: data.id });
                  }}
                >
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
