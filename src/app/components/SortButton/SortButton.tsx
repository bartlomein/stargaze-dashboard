import React from "react";

import { Button } from "@/components/ui/button";
import { SortT } from "../Dashboard/utils";

type SortButtonT = {
  selectedSort: SortT | null;
  setSelectedSort: any;
};

const SortButton = ({ selectedSort, setSelectedSort }: SortButtonT) => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2">
        <div>
          <Button variant="outline" onClick={setSelectedSort}>
            {`Sort by ${
              selectedSort === "desc" || selectedSort === null
                ? `descending`
                : `ascending`
            }`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortButton;
