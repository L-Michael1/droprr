import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InstructionModal from "~/components/InstructionModal";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import ProductCard from "~/components/ProductCard";
import Searchbar from "~/components/Searchbar";
import { api } from "~/utils/api";

const Products = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/auth/signin");
    },
  });

  const [isMutationLoading, setIsMutationLoading] = useState(false);

  const { data, isLoading, isError } = api.product.getAll.useQuery();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-96 items-center justify-center">
          <Loading />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return <span>Something went wrong...</span>;
  }

  if (data.length === 0) {
    // TODO: No tracked products component
    return <div>No tracked products yet</div>;
  }

  return (
    <Layout>
      <InstructionModal />
      <Searchbar setIsMutationLoading={setIsMutationLoading} />
      <div
        className={
          isMutationLoading
            ? `pointer-events-none flex w-full justify-center px-6 py-12 opacity-40 md:px-20`
            : `flex w-full justify-center px-6 py-12 md:px-20`
        }
      >
        <div className="flex w-full flex-wrap gap-x-9 gap-y-16">
          {data?.map((product) => {
            return <ProductCard {...product} key={product.id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
