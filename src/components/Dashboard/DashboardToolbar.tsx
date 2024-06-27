"use client";
import React, { useState } from "react";
import SortButton from "../SortButton/SortButton";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import SavedDisplays from "./SavedDisplays";
import { SortT } from "./utils";
import { Token } from "@/app/dashboard/[wallet]/types";
import { CgColorPicker } from "react-icons/cg";
import ColorPickerDropdown from "../ColorPickerDropdown/ColorPickerDropdown";

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
    <div className="flex px-4 justify-between relative bg-slate-700 p-4 shadow-2xl  rounded-lg ">
      <SavedDisplays
        walletAddress={walletAddress}
        cards={cards}
        setCards={setCards}
      />
      <div className="flex gap-8">
        <SortButton selectedSort={selectedSort} setSelectedSort={onSortClick} />

        <ColorPickerDropdown color={color} setColor={setColor} />
      </div>
    </div>
  );
};

export default DashboardToolbar;
