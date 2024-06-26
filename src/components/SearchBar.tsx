"use client";

import { useState, ChangeEvent } from "react";

type TProps = {
  filterBySearch: (searchQuery: string) => void;
};

export default function SearchBar({ filterBySearch }: TProps) {
  const [searchQuery, setSearchQuery] = useState("");

  /** Handles the search input change */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    filterBySearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by continent, country, or city..."
      className="w-full h-9 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      onChange={handleSearchChange}
      value={searchQuery}
    />
  );
}
