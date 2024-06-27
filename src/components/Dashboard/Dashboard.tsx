"use client";
import React, { useEffect } from "react";
import NFTCard from "../NFTCard/NFTCard";
import { DndProvider } from "react-dnd";
import update from "immutability-helper";

import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback, useState } from "react";
import { sortByAmountUsd, SortT } from "./utils";
import DashboardToolbar from "./DashboardToolbar";
import { Token } from "@/app/dashboard/[wallet]/types";

type DashboardP = {
  data: Token[];
  walletAddress: string;
};

const Dashboard = ({ data, walletAddress }: DashboardP) => {
  const [cards, setCards] = useState<Token[] | []>([]);
  const [selectedSort, setSelectedSort] = useState<SortT | null>(null);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setCards(data);
  }, [data]);

  const onSortClick = () => {
    const items = sortByAmountUsd(
      cards,
      selectedSort === null || selectedSort === "desc" ? "asc" : "desc"
    );
    setCards(items);
    setSelectedSort(
      selectedSort === null || selectedSort === "desc" ? "asc" : "desc"
    );
  };

  const handleDeleteItem = (id: string) => {
    const filtered = [...cards].filter((card) => card.id !== id);
    setCards(filtered);
  };

  useEffect(() => {
    // ugly but github recommends this for an error I am getting for now
    if (typeof window !== undefined && window.__isReactDndBackendSetUp) {
      window.__isReactDndBackendSetUp = false;
    }
  }, []);
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setSelectedSort(null);
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card: Token, index: number) => {
      return (
        <NFTCard
          key={card.id}
          image={card}
          index={index}
          id={card?.id}
          moveCard={moveCard}
          onDelete={handleDeleteItem}
        />
      );
    },
    [cards]
  );
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div
          className="max-w-screen-2xl mx-auto p-12 rounded-md mt-4 shadow-2xl"
          style={{ backgroundColor: color }}
        >
          <DashboardToolbar
            selectedSort={selectedSort}
            onSortClick={onSortClick}
            color={color}
            setColor={setColor}
            walletAddress={walletAddress}
            cards={cards}
            setCards={setCards}
          />
          <div className="grid auto-cols-auto lg:grid-cols-4 md:grid-cols-2 p-4 auto-cols-max gap-10 m-auto">
            {cards?.map((card, i) => renderCard(card, i))}
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Dashboard;
