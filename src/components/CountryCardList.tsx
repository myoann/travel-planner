"use client";

import { useState, MouseEvent } from "react";

import { TCountry, TOption } from "@/types";

import CountryCard from "@/components/CountryCard";
import CountriesComparisonFooter from "@/components/CountriesComparisonFooter";
import Dropdown from "@/components/Dropdown";
import SearchBar from "@/components/SearchBar";

type TProps = {
  continentsOptions: TOption[];
  countries: TCountry[];
};

export default function CountryCardList({
  continentsOptions,
  countries,
}: TProps) {
  const [selectedCountries, setSelectedCountries] = useState<TCountry[]>([]);
  const [displayedCountries, setDisplayedCountries] =
    useState<TCountry[]>(countries);
  const [selectedContinent, setSelectedContinent] = useState<TOption | null>(
    null
  );

  /** Toggles the selection of a country */
  const toggleCountrySelection = (country: TCountry, event?: MouseEvent) => {
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
      <div className="flex justify-between items-center pt-16 px-8 mb-10 gap-8">
        <SearchBar filterBySearch={filterBySearch} />

        <Dropdown
          defaultSelectName="Filter By Region"
          onClick={filterByContinent}
          options={continentsOptions}
          selectedOption={selectedContinent}
        />
      </div>

      <ul className="w-full flex flex-wrap items-center justify-center gap-8 px-8">
        {displayedCountries.map((country) => (
          <li key={country.code}>
            <CountryCard
              country={country}
              onCompare={(event) => toggleCountrySelection(country, event)}
            />
          </li>
        ))}
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
