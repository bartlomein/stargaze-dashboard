"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiLayout } from "react-icons/fi";

import useLocalStorage from "@/hooks/useLocalStorage";
import { formatLayoutJSON, parseLayouts, stringifyLayouts } from "./utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { Token } from "@/app/dashboard/[wallet]/types";

type SavedDisplaysP = {
  walletAddress: string;
  cards: Token[];
  setCards: (nfts: Token[]) => void;
};

const SavedDisplays = ({ walletAddress, cards, setCards }: SavedDisplaysP) => {
  const [newLayoutName, setNewLayoutName] = useState<string>("");
  const [value, setValue] = useLocalStorage(walletAddress, []);

  const parsed = parseLayouts(value);

  const onButtonPress = () => {
    const containsNamedLayout = [...parsed].find(
      (layout) => layout.name === newLayoutName
    );
    if (containsNamedLayout) {
      alert(
        "Already contains a layout with this name, please choose another one"
      );
      return;
    }

    const JSONLayout: string = formatLayoutJSON(newLayoutName, cards);
    const allLayouts: any = [...value];
    allLayouts.push(JSONLayout);
    setValue(allLayouts);
    setNewLayoutName("");
  };

  const onLayoutDelete = (name: string) => {
    const filtered = [...parsed].filter((layout) => layout.name !== name);

    setValue(stringifyLayouts(filtered) as any);
  };

  return (
    <div className="flex gap-8">
      <div className="flex gap-4">
        <Input
          className="text-white	"
          value={newLayoutName}
          placeholder="Enter name of new layout"
          onChange={(e) => setNewLayoutName(e.target.value)}
        />
        <Button onClick={onButtonPress} className="">
          Press to save layout
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"}>
            <div className="flex">
              <div>Saved Layouts</div>
              <div className="pl-4">
                <FiLayout size={20} />
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Saved Layouts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {parsed.map((layout, index) => {
            return (
              <div className="flex justify-between items-center" key={index}>
                <div className="grow">
                  <DropdownMenuCheckboxItem
                    key={index}
                    onCheckedChange={() => setCards(layout.items)}
                  >
                    {layout.name}
                  </DropdownMenuCheckboxItem>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => onLayoutDelete(layout.name)}
                >
                  <AiTwotoneDelete size={20} />
                </div>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SavedDisplays;
