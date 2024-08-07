import React from "react";
import request from "graphql-request";

import { QueryClient } from "@tanstack/react-query";
import { ITEMS_BY_WALLET, API } from "./utils";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Token } from "./types";

type PageParamsT = {
  params: {
    wallet: string;
  };
  searchParams: {
    per_page?: number;
  };
};

const DEFAULT_LIMIT = 20;

type ReturnDataT = {
  tokens: {
    tokens: Token[];
  };
};

type ErrorT = {
  response: {
    errors: string[];
  };
};

const DashboardPage = async ({ params, searchParams }: PageParamsT) => {
  const queryClient = new QueryClient();

  const wallet = params?.wallet;
  const limit = Number(searchParams.per_page) || DEFAULT_LIMIT;

  let data: ReturnDataT | undefined;
  let error: ErrorT | unknown;

  try {
    data = await queryClient.fetchQuery({
      queryKey: [wallet],
      queryFn: async () =>
        request(API, ITEMS_BY_WALLET, { owner: wallet, limit }),
    });
  } catch (e) {
    error = e;
  }

  return (
    <div>
      {!error && data && data.tokens ? (
        <Dashboard data={data?.tokens?.tokens} walletAddress={wallet} />
      ) : null}

      {!error && !data ? (
        <div className="text-2xl text-white">LOADING</div>
      ) : null}

      {error && (error as any).response ? (
        <div className="max-w-screen-2xl mx-auto my-8">
          <div className="text-2xl text-white">
            Please contact us with the above error and we will look into it as
            soon as possible
          </div>
          {(error as any)?.response?.errors.map((err: string) => (
            <div className="text-center	text-red-600" p-8>
              {JSON.stringify(err)}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardPage;
