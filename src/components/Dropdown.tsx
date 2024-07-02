"use client";

import { useState } from "react";
import Image from "next/image";

import { TOption } from "@/types";

type TProps = {
  defaultSelectName: string;
  onClick: (value: TOption) => void;
  options: TOption[];
  selectedOption?: TOption | null;
};

export default function Dropdown({
  defaultSelectName,
  onClick,
  options,
  selectedOption,
}: TProps) {
  const [isOpen, setIsOpen] = useState(false);

  /** Toggles the dropdown visibility */
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /** Handles the click on an option */
  const onClickOption = (value: TOption) => {
    onClick(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-64 z-30">
      <button
        className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-950 hover:font-bold"
        id="menu-button"
        data-testid="dropdown"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {selectedOption?.name || defaultSelectName}

        <Image src="arrowDown.svg" alt="Arrow down" width={20} height={20} />
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {options.map((option) => (
          <button
            className={`w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 text-gray-700 ${
              selectedOption?.value === option.value &&
              "bg-gray-200 text-gray-900 font-bold hover:bg-gray-200"
            }`}
            role="menuitem"
            tabIndex={-1}
            id={`menu-item-${option.key}`}
            data-testid="dropdown-option"
            key={option.key}
            onClick={() => onClickOption(option)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
