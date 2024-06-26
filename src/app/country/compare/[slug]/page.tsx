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
        <div className="relative w-full h-96">
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
      <h3 className="font-bold pb-4 mb-8 border-b border-[#e8e8ed]">{title}</h3>

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
    {}
  );
  const secondCountryRes = await getClient().query(
    CountryQuery(countryCode2),
    {}
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
    `${firstCountry.name} ${firstCountry.capital} city`
  );

  const secondCapitalPhoto = await getPhoto(
    `${secondCountry.name} ${secondCountry.capital} city`
  );

  return (
    <div className="pt-8 pb-16">
      <div className="flex px-16 gap-8">
        <div className="w-1/2 ">
          <CountryMainInfos country={firstCountry} photo={firstCapitalPhoto} />
        </div>

        <div className="w-1/2">
          <CountryMainInfos
            country={secondCountry}
            photo={secondCapitalPhoto}
          />
        </div>
      </div>

      <div className="flex flex-col px-16 gap-8 mt-8">
        <CountryDetailedSection title="General Information">
          <div className="w-full flex gap-8">
            <div className="flex flex-col w-1/2 gap-2">
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

            <div className="flex flex-col w-1/2 gap-2">
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
          <div className="w-full flex gap-8">
            <div className="flex flex-col w-1/2 gap-2">
              <div className="flex flex-col">
                <strong>Continent</strong>
                <span>{firstCountry.continent.name}</span>
              </div>
              <div className="flex flex-col">
                <strong>Capital</strong>
                <span>{firstCountry.capital}</span>
              </div>
            </div>

            <div className="flex flex-col w-1/2 gap-2">
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
          <div className="w-full flex gap-8">
            <div className="flex flex-col w-1/2 gap-2">
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

            <div className="flex flex-col w-1/2 gap-2">
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
