import React, { useState, useEffect } from "react";
import { useWalletStore } from "@/app/store/walletStore";

const useConnectKeplrWallet = (setWalletButtonClicked, walletButtonClicked) => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (walletButtonClicked && window.keplr) {
      window.keplr
        .getKey("stargaze-1")
        .then((key) => {
          useWalletStore.setState({ address: key.bech32Address });

          setWalletAddress(key.bech32Address);
          setWalletButtonClicked(false);
        })
        .catch(() => {});
    }
  }, [walletButtonClicked]);
};

export default useConnectKeplrWallet;
