import { gql } from "@urql/core";

import { TCountry, TOption } from "@/types";
import { getClient } from "@/utils/getItems";
import { findSuitableCountryWithOpenAI } from "@/utils/prompts";

import CountryCardList from "@/components/CountryCardList";
import { redirect } from "next/navigation";

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
      <h1 className="px-8 pt-16 pb-6 text-6xl">
        The perfect country search for your special trip
      </h1>

      <p className="px-8 text-3xl">
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
