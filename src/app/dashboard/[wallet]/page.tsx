import React from "react";
import request from "graphql-request";

import { QueryClient } from "@tanstack/react-query";
import { ITEMS_BY_WALLET, API, filterImagesFromWallet } from "./utils";
import Dashboard from "@/app/components/Dashboard/Dashboard";

type SearchParamsP = {
  params: {
    per_page: number;
    wallet: string;
  };
};

const DashboardPage = async ({ params, searchParams }: SearchParamsP) => {
  const queryClient = new QueryClient();

  const name = params?.wallet;
  const limit = Number(searchParams.per_page);

  let data;
  let error;

  try {
    data = await queryClient.fetchQuery({
      queryKey: [name],
      queryFn: async () =>
        request(API, ITEMS_BY_WALLET, { owner: name, limit }),
    });
  } catch (e) {
    error = e;
  }

  console.log("data", data);

  return (
    <div>
      <Dashboard data={data?.tokens?.tokens} />
    </div>
  );
};

export default DashboardPage;
