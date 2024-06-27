"use client";
import React, { useState, useEffect } from "react";
import WalletSearch from "../WalletSearch/WalletSearch";
import { usePathname, useRouter } from "next/navigation";
import useConnectKeplrWallet from "@/hooks/useConnectKeplrWallet";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/app/store/walletStore";
import QueryAmountDropdown from "../QueryAmountDropdown/QueryAmountDropdown";
import { SiWalletconnect } from "react-icons/si";
import { useSearchParams } from "next/navigation";

const Navbar = () => {
  const [walletButtonClicked, setWalletButtonClicked] = useState(false);
  const [queryAmount, setQueryAmount] = useState<number>(20);
  const pathname = usePathname();
  const walletAddress = pathname.replace("/dashboard/", "");
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = Number(searchParams.get("per_page"));

  useEffect(() => {
    if (search !== queryAmount) {
      setQueryAmount(search);
    }
  }, [search]);

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
    <div className="flex justify-between max-w-screen-2xl items-center  mx-auto mt-5 py-4 rounded-lg bg-slate-700 px-4 shadow-2xl">
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
          <div className="flex">
            <div>{address ? address : "Connect Keplr Wallet"}</div>
            <div className="pl-4">
              <SiWalletconnect size={20} />
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
