import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CgColorPicker } from "react-icons/cg";
import { HexColorPicker } from "react-colorful";

type ColorPickerDropdownP = {
  color: string;
  setColor: (color: string) => void;
};
const ColorPickerDropdown = ({ color, setColor }: ColorPickerDropdownP) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <div className="flex">
              <div>Color picker</div>
              <div className="pl-4">
                <CgColorPicker size={20} />
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Saved Layouts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <HexColorPicker color={color} onChange={setColor} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ColorPickerDropdown;
