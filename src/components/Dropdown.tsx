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
    <div className="relative z-30 inline-block w-64 text-left sm:hidden md:inline">
      <button
        className="inline-flex w-full justify-center gap-x-1.5 py-2 text-sm font-semibold text-gray-900 hover:font-bold hover:text-gray-950"
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
        } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        {options.map((option) => (
          <button
            className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
              selectedOption?.value === option.value &&
              "bg-gray-200 font-bold text-gray-900 hover:bg-gray-200"
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
