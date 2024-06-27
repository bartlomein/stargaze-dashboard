import React, { useState } from "react";
import SortButton from "../SortButton/SortButton";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";

const DashboardToolbar = ({ selectedSort, onSortClick, color, setColor }) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  return (
    <div className="flex px-4 justify-between relative">
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
