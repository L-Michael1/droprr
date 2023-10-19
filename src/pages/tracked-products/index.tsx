import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Layout from "~/components/Layout";
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

  const { data, isLoading, isError } = api.product.getAll.useQuery();

  if (isLoading) {
    // TODO: Loading component
    return <div>Loading...</div>;
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
      <Searchbar />
      <div className="flex w-full justify-center px-6 py-12 md:px-20">
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
