import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type WalletSearchP = {
  onButtonClick: (wallet: string) => void;
};

const WalletSearch = ({ onButtonClick }: WalletSearchP) => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="flex">
      <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Input wallet address"
        className="placeholder-black-900 text-white mr-4"
      />
      <Button onClick={() => onButtonClick(searchInput)}>Search</Button>
    </div>
  );
};

export default WalletSearch;
