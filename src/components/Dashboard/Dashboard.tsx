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
import {
  DndContext,
  closestCenter,
  MouseSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  KeyboardSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type DashboardP = {
  data: Token[];
  walletAddress: string;
};

const Dashboard = ({ data, walletAddress }: DashboardP) => {
  const [cards, setCards] = useState<Token[] | []>([]);
  const [selectedSort, setSelectedSort] = useState<SortT | null>(null);
  const [color, setColor] = useState<string>("");
  const [activeId, setActiveId] = useState<
    DragStartEvent["active"]["id"] | null
  >(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setCards(data);
  }, [data]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id);
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 2,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor);

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

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    if (event.over && event.over.id && event.active.id !== event.over.id) {
      const oldIndex = cards.findIndex((item) => item.id === event.active.id);
      const newIndex = cards.findIndex((item) => item.id === event?.over?.id);

      const newItems = [...cards];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);

      setCards(newItems);
      setActiveId(null);
    }
  };

  return (
    <div>
      <div
        className="max-w-screen-2xl mx-auto p-12 rounded-md mt-4 shadow-2xl"
        style={{ backgroundColor: color }}
      >
        <div className="text-white text-2xl">Wallet: {walletAddress}</div>
        <DashboardToolbar
          selectedSort={selectedSort}
          onSortClick={onSortClick}
          color={color}
          setColor={setColor}
          walletAddress={walletAddress}
          cards={cards}
          setCards={setCards}
        />
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <SortableContext
            items={cards.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-4 gap-4 p-4">
              {cards?.map((card, i) => (
                <div key={card.id}>
                  <NFTCard
                    key={card.id}
                    image={card}
                    index={i}
                    id={card?.id}
                    onDelete={handleDeleteItem}
                    height={400}
                    width={400}
                  />
                </div>
              ))}
              {data.length === 0 ? (
                <div className="text-4xl text-white">Please buy some NFTs</div>
              ) : null}
            </div>
          </SortableContext>
          <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
            {activeId ? (
              <NFTCard
                id={activeId}
                cards={cards}
                isDraggingOverlay
                height={400}
                width={400}
                index={0}
                onDelete={() => null}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Dashboard;
