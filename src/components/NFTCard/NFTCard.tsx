import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { formatStat } from "./utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { Token } from "@/app/dashboard/[wallet]/types";

type NFTCardP = {
  index: number;
  id: string;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
  image: Token;
  height: number;
  width: number;
};

const NFTCard = ({
  image,
  index,
  id,
  moveCard,
  onDelete,
  height,
  width,
}: NFTCardP) => {
  const ref = useRef<HTMLInputElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div className="shadow-lg rounded-2xl">
      <Card>
        <div ref={ref}>
          <div
            className="py-2 px-2 flex flex-row-reverse cursor-pointer rounded-md"
            onClick={() => onDelete(image.id)}
          >
            <AiTwotoneDelete size={24} />
          </div>
          <div
            className="flex cursor-pointer rounded-md"
            style={{
              opacity,
              position: "relative",
              height: height,
              maxWidth: width,
              width: "100%",
            }}
          >
            <Image
              fill
              sizes={`${width}px`}
              src={image?.media?.visualAssets?.md?.url}
              style={{ objectFit: "cover" }}
              priority={index < 10}
              alt={image.description || ""}
            />
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
