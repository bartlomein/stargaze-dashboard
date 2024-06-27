import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const WalletSearch = ({ onButtonClick }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div className="flex">
      <Input
        color="black"
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Input wallet address"
        className="placeholder-black-900"
      />
      <Button onClick={() => onButtonClick(searchInput)}>Search</Button>
    </div>
  );
};

export default WalletSearch;
