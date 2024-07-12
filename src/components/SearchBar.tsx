"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";

type TProps = {
  placeholder: string;
  filterBySearch?: (searchQuery: string) => void;
  onSubmit?: (searchQuery: string) => void;
};

export default function SearchBar({
  placeholder,
  filterBySearch,
  onSubmit,
}: TProps) {
  const [searchQuery, setSearchQuery] = useState("");

  /** Handles the search input change */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    if (filterBySearch) {
      filterBySearch(event.target.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && onSubmit) {
      onSubmit(searchQuery);
    }
  };

  const handleButtonClick = () => {
    if (onSubmit) {
      onSubmit(searchQuery);
    }
  };

  return (
    <div className="flex h-12 w-full items-center rounded border border-gray-300 shadow-md focus-within:ring focus-within:ring-blue-200">
      <input
        type="text"
        placeholder={placeholder || "Search"}
        className={`h-full flex-grow p-4 focus:outline-none ${
          onSubmit ? "rounded-l" : "rounded"
        }`}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        value={searchQuery}
      />

      {onSubmit && (
        <button
          className="h-full rounded-r bg-blue-500 text-white transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none sm:px-3 md:px-6"
          onClick={handleButtonClick}
        >
          Find it
        </button>
      )}
    </div>
  );
}
