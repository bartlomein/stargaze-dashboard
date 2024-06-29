import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useRef, CSSProperties } from "react";

import { CSS } from "@dnd-kit/utilities";
import { formatStat } from "./utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { Token } from "@/app/dashboard/[wallet]/types";
import { useSortable } from "@dnd-kit/sortable";

type NFTCardP = {
  index: number;
  id: string | number;
  onDelete: (id: string) => void;
  image?: Token;
  cards?: Token[];
  height: number;
  width: number;
  isDraggingOverlay?: boolean;
};

const NFTCard = ({
  image,
  index,
  id,
  onDelete,
  height,
  width,
  isDraggingOverlay,
  cards,
}: NFTCardP) => {
  const ref = useRef<HTMLInputElement>(null);

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  const inlineStyles: CSSProperties = {
    opacity: isDragging ? "0.5" : "1",
  };

  const draggingCard = cards?.find((card) => card.id === id);

  return (
    <div
      className="shadow-lg rounded-2xl"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card>
        <div ref={ref} style={inlineStyles}>
          <div className="py-2 px-2 flex flex-row-reverse cursor-pointer rounded-md">
            <AiTwotoneDelete
              size={24}
              onClick={() => image && onDelete(image?.id)}
            />
          </div>
          <div
            className="flex cursor-pointer rounded-md"
            style={{
              position: "relative",
              height: height,
              maxWidth: width,
              width: "100%",
            }}
          >
            {!isDraggingOverlay ? (
              <Image
                fill
                sizes={`${width}px`}
                src={image?.media?.visualAssets?.md?.url || ""}
                style={{ objectFit: "cover" }}
                priority={index < 10}
                alt={image?.description || ""}
              />
            ) : (
              <Image
                fill
                sizes={`${width}px`}
                src={draggingCard?.media?.visualAssets?.md?.url || ""}
                style={{ objectFit: "cover" }}
                priority={index < 10}
                alt={image?.description || ""}
              />
            )}
          </div>

          <div className="py-2 mx-auto text-lg px-8 flex justify-center items-center">
            <div className="font-bold">Last sale price</div>
            <div className="text-lg pl-8">
              {formatStat(
                "en-US",
                "USD",
                image?.lastSalePrice?.amountUsd
                  ? image?.lastSalePrice?.amountUsd
                  : 0
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NFTCard;
