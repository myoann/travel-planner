"use client";

import { useState, ChangeEvent } from "react";

import { TCountry, TOption } from "@/types";

import CountryCard from "@/components/CountryCard";
import CountriesComparisonFooter from "@/components/CountriesComparisonFooter";
import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";

type TProps = {
  continentsOptions: TOption[];
  countries: TCountry[];
  findRandomCountry: (content: string) => void;
};

const hasOpenAiKey = process.env.NEXT_PUBLIC_HAS_OPEN_AI_KEY === "true";

export default function CountryCardList({
  continentsOptions,
  countries,
  findRandomCountry,
}: TProps) {
  const [selectedCountries, setSelectedCountries] = useState<TCountry[]>([]);
  const [displayedCountries, setDisplayedCountries] =
    useState<TCountry[]>(countries);
  const [selectedContinent, setSelectedContinent] = useState<TOption | null>(
    null
  );

  /** Toggles the selection of a country */
  const toggleCountrySelection = (
    country: TCountry,
    event?: ChangeEvent<HTMLInputElement>
  ) => {
    event?.stopPropagation();
    const isSelected = selectedCountries.find((c) => c.code === country.code);

    if (isSelected) {
      setSelectedCountries(
        selectedCountries.filter((c) => c.code !== country.code)
      );
    } else if (selectedCountries.length < 2) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  /** Filters the countries by continent */
  const filterByContinent = (continent: TOption) => {
    if (continent.value === "") {
      setDisplayedCountries(countries);
      setSelectedContinent(null);
    } else {
      setDisplayedCountries(
        countries.filter(
          (country) => country.continent.code === continent.value
        )
      );
      setSelectedContinent(continent);
    }
  };

  /** Filters the countries by search query */
  const filterBySearch = (searchQuery: string) => {
    setSelectedContinent(null);

    const filteredCountries = countries.filter((country) => {
      const query = searchQuery.toLowerCase();
      const matchesCountry = country.name.toLowerCase().includes(query);
      const matchesContinent = country.continent.name
        .toLowerCase()
        .includes(query);
      const matchesCity = country.capital?.toLowerCase().includes(query);

      return matchesCountry || matchesContinent || matchesCity;
    });

    setDisplayedCountries(filteredCountries);
  };

  /** Removes a country from the selected countries */
  const removeCountry = (countryToRemove: TCountry) => {
    setSelectedCountries(
      selectedCountries.filter(
        (country) => country.code !== countryToRemove.code
      )
    );
  };

  return (
    <div>
      {hasOpenAiKey && (
        <div className="mx-8 mb-10">
          <h3 className="text-xl mt-12 mb-4">
            Find your dream destination{" "}
            <span className="font-black text-blue-500">
              with our AI recommendation
            </span>
          </h3>

          <div className="font-light text-xs mb-4">
            Some examples you can ask:
            <div className="font-medium pt-1 pl-1">
              "a country where I can see the house of Dracula",
            </div>
            <div className="font-medium pl-1">
              "the best place to eat pasta",
            </div>
            <div className="font-medium pl-1">
              "I want to go to the highest mountain of the world",
            </div>
            <div className="font-medium pl-1">
              "I would like to visit the country where there are beautiful
              landscapes"
            </div>
          </div>

          <SearchBar
            onSubmit={findRandomCountry}
            placeholder="Ask me anything"
          />
        </div>
      )}

      {hasOpenAiKey && <hr className="mx-8 my-8 border-gray-300" />}

      <h3 className="text-xl ml-8 mt-10 mb-4">
        Find your dream destination{" "}
        <span className="font-black text-green-500">by browsing</span>
      </h3>

      <div className="flex justify-between items-center px-8 mb-10 gap-8">
        <SearchBar
          filterBySearch={filterBySearch}
          placeholder="Search by continent, country, or city..."
        />

        <Dropdown
          defaultSelectName="Filter By Region"
          onClick={filterByContinent}
          options={continentsOptions}
          selectedOption={selectedContinent}
        />
      </div>

      <ul className="w-full flex flex-wrap items-center gap-8 px-8">
        {displayedCountries.map((country) => {
          const isChecked = !!selectedCountries.find(
            (c) => c.code === country.code
          );

          return (
            <li key={country.code}>
              <CountryCard
                country={country}
                onCompare={(event) => toggleCountrySelection(country, event)}
                isChecked={isChecked}
                isDisabled={selectedCountries.length === 2 && !isChecked}
              />
            </li>
          );
        })}
      </ul>

      {selectedCountries.length > 0 && (
        <CountriesComparisonFooter
          selectedCountries={selectedCountries}
          removeCountry={removeCountry}
        />
      )}
    </div>
  );
}
