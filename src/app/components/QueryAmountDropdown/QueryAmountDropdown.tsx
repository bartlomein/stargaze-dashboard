import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QUERY_AMOUNTS } from "./utils";
import { Button } from "@/components/ui/button";

const QueryAmountDropdown = ({ queryAmount, setQueryAmount }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{`Show ${queryAmount} NFTs`}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Query Amount</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {QUERY_AMOUNTS.map((amount, index) => {
            return (
              <DropdownMenuCheckboxItem
                key={index}
                checked={queryAmount === amount.id}
                onCheckedChange={() => setQueryAmount(amount.id)}
              >
                {amount.label}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QueryAmountDropdown;
