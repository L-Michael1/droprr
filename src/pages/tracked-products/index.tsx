import { useSession } from "next-auth/react";
import React from "react";
import Layout from "~/components/Layout";
import ProductCard from "~/components/ProductCard";
import Searchbar from "~/components/Searchbar";
import { api } from "~/utils/api";

const Products = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return {
        redirect: {
          destination: "/auth/signin",
        },
      };
    },
  });

  const { data, isLoading } = api.product.getAll.useQuery();

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Searchbar />
      <div className="flex w-full justify-center px-6 py-12 md:px-20">
        <div className="flex w-full flex-wrap gap-x-9 gap-y-16">
          {data.map((product) => {
            return <ProductCard {...product} key={product.id} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
