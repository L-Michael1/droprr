import { useSession } from "next-auth/react";
import React from "react";
import Layout from "~/components/Layout";
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
      <div>
        {data.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{product.url}</div>
              <div>{product.currentPrice}</div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Products;
