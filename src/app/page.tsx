import { gql } from "@urql/core";

import { TCountry, TOption } from "@/types";
import { getClient } from "@/utils/getItems";

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

  return (
    <main className="bg-[#f5f5f7]">
      <h1 className="px-8 text-center pt-16 pb-2">
        The perfect country search for your special trip
      </h1>

      <p className="px-8 text-center text-xl">
        Discover dreamy holiday countries and cities all over the world
      </p>

      <CountryCardList
        continentsOptions={continentsOptions}
        countries={countries}
      />
    </main>
  );
}
