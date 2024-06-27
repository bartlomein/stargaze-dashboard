import React, { useState, useEffect } from "react";
import { useWalletStore } from "@/app/store/walletStore";
import { KeprlT } from "./types";

const useConnectKeplrWallet = (
  setWalletButtonClicked: (clicked: boolean) => void,
  walletButtonClicked: boolean
) => {
  const [walletAddress, setWalletAddress] = useState<null | string>(null);

  useEffect(() => {
    if (walletButtonClicked && window.keplr) {
      window.keplr
        .getKey("stargaze-1")
        .then((key: KeprlT) => {
          useWalletStore.setState({ address: key.bech32Address });

          setWalletAddress(key.bech32Address);
          setWalletButtonClicked(false);
        })
        .catch(() => {
          alert(
            "There was an error connecting to your Keprl wallet, please try again"
          );
        });
    }
  }, [walletButtonClicked]);
};

export default useConnectKeplrWallet;
