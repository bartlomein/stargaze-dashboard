import React, { useState, useEffect } from "react";
import { useWalletStore } from "@/app/store/walletStore";
import { KeprlT } from "./types";
import { useRouter } from "next/navigation";

const useConnectKeplrWallet = (
  setWalletButtonClicked: (clicked: boolean) => void,
  walletButtonClicked: boolean,
  address: string
) => {
  const [walletAddress, setWalletAddress] = useState<null | string>(null);
  const router = useRouter();
  useEffect(() => {
    if (walletButtonClicked && window.keplr && !address) {
      window.keplr
        .getKey("stargaze-1")
        .then((key: KeprlT) => {
          useWalletStore.setState({ address: key.bech32Address });

          setWalletAddress(key.bech32Address);
          setWalletButtonClicked(false);
          router.push(`/dashboard/${key.bech32Address}?per_page=${20}`);
        })
        .catch(() => {
          alert(
            "There was an error connecting to your Keprl wallet, please try again"
          );
        });
    }
    if (walletButtonClicked && window.keplr && address) {
      window.keplr.disable();
    }
  }, [walletButtonClicked, address]);
};

export default useConnectKeplrWallet;
