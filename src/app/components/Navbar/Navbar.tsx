"use client";
import React, { useState, useEffect } from "react";
import WalletSearch from "../WalletSearch/WalletSearch";
import { usePathname, useRouter } from "next/navigation";
import useConnectKeplrWallet from "@/app/hooks/useConnectKeplrWallet";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/app/store/walletStore";
import QueryAmountDropdown from "../QueryAmountDropdown/QueryAmountDropdown";

const Navbar = () => {
  const [walletButtonClicked, setWalletButtonClicked] = useState(false);
  const [queryAmount, setQueryAmount] = useState<number>(20);
  const pathname = usePathname();
  const walletAddress = pathname.replace("/dashboard/", "");
  const router = useRouter();

  // adding zustand as most likely the connected wallet will need to be passed around the application
  const { address } = useWalletStore();

  const onButtonPress = (wallet: string) => {
    router.push(`/dashboard/${wallet}?per_page=${queryAmount}`);
  };

  const onQueryAmountChange = (amount: number) => {
    setQueryAmount(amount);
    router.push(`/dashboard/${walletAddress}?per_page=${amount}`);
  };

  useConnectKeplrWallet(setWalletButtonClicked, walletButtonClicked);

  return (
    <div className="flex justify-between max-w-screen-2xl items-center  mx-auto mt-20 py-4 rounded-lg bg-slate-700 px-4 shadow-2xl">
      <WalletSearch onButtonClick={onButtonPress} />
      <QueryAmountDropdown
        queryAmount={queryAmount}
        setQueryAmount={onQueryAmountChange}
      />
      <div>
        <Button
          onClick={
            address
              ? () => onButtonPress(address)
              : () => setWalletButtonClicked(true)
          }
        >
          {address ? address : "Connect Keplr Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
