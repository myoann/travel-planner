import { redirect } from "next/navigation";
import { gql } from "@urql/core";

import { TCountry, TOption } from "@/types";
import { getClient } from "@/utils/getItems";
import { findSuitableCountryWithOpenAI } from "@/utils/prompts";

import CountryCardList from "@/components/CountryCardList";

const CountriesQuery = gql`
  query {
    countries {
      capital
      code
      continent {
        code
        name
      }
      name
    }
  }
`;

export default async function Home() {
  const countriesResult = await getClient().query(CountriesQuery, {});
  const countries = countriesResult.data.countries;

  let continentsOptions: TOption[] = [{ key: "", name: "All", value: "" }];

  const continentCodes = new Set();
  countries.forEach((country: TCountry) => {
    const { code, name } = country.continent;
    if (!continentCodes.has(code)) {
      continentCodes.add(code);
      continentsOptions.push({
        key: code,
        name: name,
        value: code,
      });
    }
  });

  /** Finds a random country based on the user's preferences */
  const findRandomCountry = async (content: string) => {
    "use server";

    const countryCode = await findSuitableCountryWithOpenAI(content);

    // Redirect the user to the country page
    redirect(`/country/${countryCode}`);
  };

  return (
    <main className="bg-[#f5f5f7]">
      <h1 className="sm:pb-3 sm:pt-8 sm:text-3xl md:px-8 md:pb-6 md:pt-16 md:text-6xl">
        The perfect country search{" "}
        <span className="bg-black px-2 py-1 text-white sm:inline-block">
          for your special trip
        </span>
      </h1>

      <p className="px-8 text-3xl sm:hidden md:inline">
        Discover dreamy holiday countries and cities all over the world
      </p>

      <CountryCardList
        continentsOptions={continentsOptions}
        countries={countries}
        findRandomCountry={findRandomCountry}
      />
    </main>
  );
}
