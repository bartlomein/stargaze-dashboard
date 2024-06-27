"use client";
import React, { useState } from "react";
import SortButton from "../SortButton/SortButton";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import SavedDisplays from "./SavedDisplays";
import { SortT } from "./utils";
import { Token } from "@/app/dashboard/[wallet]/types";

type DashboardToolbarP = {
  selectedSort: SortT | null;
  onSortClick: () => void;
  color: string;
  setColor: (color: string) => void;
  walletAddress: string;
  cards: Token[];
  setCards: (nfts: Token[]) => void;
};

const DashboardToolbar = ({
  selectedSort,
  onSortClick,
  color,
  setColor,
  walletAddress,
  cards,
  setCards,
}: DashboardToolbarP) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  return (
    <div className="flex px-4 justify-between relative">
      <SavedDisplays
        walletAddress={walletAddress}
        cards={cards}
        setCards={setCards}
      />
      <SortButton selectedSort={selectedSort} setSelectedSort={onSortClick} />
      <Button onClick={() => setColorPickerOpen(!colorPickerOpen)}>
        {`${colorPickerOpen ? `Close` : `Open`} color picker`}
      </Button>
      {colorPickerOpen ? (
        <div className="absolute right-0 top-[50px] z-10">
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      ) : null}
    </div>
  );
};

export default DashboardToolbar;
