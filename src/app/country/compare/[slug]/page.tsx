import React from "react";
import Image from "next/image";
import { gql } from "@urql/core";
import { Basic } from "unsplash-js/dist/methods/photos/types";

import { TCountry } from "@/types";

import { getClient } from "@/utils/getItems";
import { getPhoto } from "@/utils/getPhotos";

import ErrorMessage from "@/components/ErrorMessage";

const CountryQuery = (code: string) => gql`
  query {
    country(code: "${code}") {
      capital
      code
      continent {
        code
        name
      }
      currency
      emoji
      languages {
        code
        name
        native
      }
      name
      native
      phone
    }
  }
`;

function CountryMainInfos({
  country,
  photo,
}: {
  country: TCountry;
  photo: Basic | undefined;
}) {
  return (
    <div className="flex flex-col pt-4">
      <h1 className="pb-4">
        {country.emoji} {country.name}
      </h1>

      {photo && (
        <div className="relative h-96 w-full">
          <Image
            src={photo.urls.regular}
            alt={`Photo of ${country.capital}`}
            fill
            style={{
              objectFit: "cover",
              borderRadius: "1rem",
            }}
            priority
          />
        </div>
      )}
    </div>
  );
}

function CountryDetailedSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-8 border-b border-[#e8e8ed] pb-4 font-bold">{title}</h3>

      {children}
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const [countryCode1, countryCode2] = params.slug.split("-");

  if (!countryCode1 || !countryCode2) {
    return (
      <ErrorMessage message="Please provide two country codes to compare" />
    );
  }

  const firstCountryRes = await getClient().query(
    CountryQuery(countryCode1),
    {},
  );
  const secondCountryRes = await getClient().query(
    CountryQuery(countryCode2),
    {},
  );

  if (!firstCountryRes?.data?.country) {
    return (
      <ErrorMessage
        message={`The country with the code ${countryCode1} was not found`}
      />
    );
  } else if (!secondCountryRes?.data?.country) {
    return (
      <ErrorMessage
        message={`The country with the code ${countryCode2} was not found`}
      />
    );
  }

  const firstCountry = firstCountryRes.data.country;
  const secondCountry = secondCountryRes.data.country;

  const firstCapitalPhoto = await getPhoto(
    `${firstCountry.name} ${firstCountry.capital} city`,
  );

  const secondCapitalPhoto = await getPhoto(
    `${secondCountry.name} ${secondCountry.capital} city`,
  );

  return (
    <div className="pb-16 pt-8">
      <div className="flex gap-8 px-16">
        <div className="w-1/2">
          <CountryMainInfos country={firstCountry} photo={firstCapitalPhoto} />
        </div>

        <div className="w-1/2">
          <CountryMainInfos
            country={secondCountry}
            photo={secondCapitalPhoto}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 px-16">
        <CountryDetailedSection title="General Information">
          <div className="flex w-full gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Country name (english)</strong>
                <span>{firstCountry.name}</span>
              </div>
              <div className="flex flex-col">
                <strong>Country name (native)</strong>
                <span>{firstCountry.native}</span>
              </div>

              <div className="flex flex-col">
                <strong>Code</strong>
                <span>{firstCountry.code}</span>
              </div>
              <div className="flex flex-col">
                <strong>Currency</strong>
                <span>{firstCountry.currency}</span>
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Country name (english)</strong>
                <span>{secondCountry.name}</span>
              </div>
              <div className="flex flex-col">
                <strong>Country name (native)</strong>
                <span>{secondCountry.native}</span>
              </div>
              <div className="flex flex-col">
                <strong>Code</strong>
                <span>{secondCountry.code}</span>
              </div>
              <div className="flex flex-col">
                <strong>Currency</strong>
                <span>{secondCountry.currency}</span>
              </div>
            </div>
          </div>
        </CountryDetailedSection>

        <CountryDetailedSection title="Geographical Information">
          <div className="flex w-full gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Continent</strong>
                <span>{firstCountry.continent.name}</span>
              </div>
              <div className="flex flex-col">
                <strong>Capital</strong>
                <span>{firstCountry.capital}</span>
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Continent</strong>
                <span>{secondCountry.continent.name}</span>
              </div>
              <div className="flex flex-col">
                <strong>Capital</strong>
                <span>{secondCountry.capital}</span>
              </div>
            </div>
          </div>
        </CountryDetailedSection>

        <CountryDetailedSection title="Communication">
          <div className="flex w-full gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Telephone Prefix</strong>
                <span>+{firstCountry.phone}</span>
              </div>
              <div className="flex flex-col">
                <strong>Languages</strong>
                <ul>
                  {firstCountry.languages.map((language: any) => (
                    <li key={language.code}>
                      {language.name} ({language.native})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex w-1/2 flex-col gap-2">
              <div className="flex flex-col">
                <strong>Telephone Prefix</strong>
                <span>+{secondCountry.phone}</span>
              </div>
              <div className="flex flex-col">
                <strong>Languages</strong>
                <ul>
                  {secondCountry.languages.map((language: any) => (
                    <li key={language.code}>
                      {language.name} ({language.native})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CountryDetailedSection>
      </div>
    </div>
  );
}
