import Image from "next/image";
import { gql } from "@urql/core";

import { getClient } from "@/utils/getItems";
import { getPhoto } from "@/utils/getPhotos";

import ErrorMessage from "@/components/ErrorMessage";

const CountryQuery = (code: string) => gql`
  query {
    country(code: "${code}") {
      capital
      code
      continent {
        name
      }
      currencies
      emoji
      languages {
        code
        name
        native
      }
      name
      native
      phones
    }
  }
`;

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await getClient().query(CountryQuery(params.slug), {});

  if (!result?.data?.country) {
    return (
      <ErrorMessage
        message={`The country with the code ${params.slug} was not found`}
      />
    );
  }

  const capitalPhoto = await getPhoto(
    `${result.data.country.name} ${result.data.country.capital}`
  );

  return (
    <div className="bg-[#f5f5f7]">
      {capitalPhoto && (
        <div className="relative h-screen w-screen">
          <Image
            src={capitalPhoto.urls.regular}
            alt={`Photo of ${result.data.country.capital}`}
            style={{ objectFit: "cover" }}
            fill
            priority
          />

          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-8xl text-center">
            {result.data.country.name}
          </h1>
        </div>
      )}

      <div className="flex px-8 pt-8 pb-16">
        <div className="flex flex-col gap-1 text-xl text-[#86868b] w-2/3">
          <h2 className="text-4xl text-black mb-2">
            {result.data.country.emoji} {result.data.country.name}{" "}
          </h2>

          <p>
            The {result.data.country.name} ({result.data.country.native}) is a
            country based in the continent of{" "}
            {result.data.country.continent.name}
          </p>

          <p>
            Its country code is {result.data.country.code} and the telephone
            prefix is +{result.data.country.phones[0]}
          </p>

          {result.data.country.capital && (
            <p>
              The capital of {result.data.country.name} is{" "}
              {result.data.country.capital}
            </p>
          )}

          <p>
            {result.data.country.currencies.length &&
              (result.data.country.currencies.length > 1 ? (
                <>
                  There are multiple currencies used, mainly{" "}
                  {result.data.country.currencies.join(", ")}
                </>
              ) : (
                <>
                  There is one currency used which is{" "}
                  {result.data.country.currencies[0]}
                </>
              ))}

            {result.data.country.languages.length &&
              (result.data.country.languages.length > 1 ? (
                <>
                  {" "}
                  and the languages spoken are{" "}
                  {result.data.country.languages
                    .map((language: any) => language.name)
                    .join(", ")}
                </>
              ) : (
                <>
                  {" "}
                  and the main language spoken is{" "}
                  {result.data.country.languages[0].name}
                </>
              ))}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-1/3">
          <a
            href={`https://en.wikipedia.org/wiki/${result.data.country.name}`}
            className="bg-[#f8f9fa] hover:bg-white text-[#202122] px-2 py-4 rounded border border-[#a2a9b1] text-center"
            target="_blank"
          >
            Find more infos on Wikipedia
          </a>

          <a
            href={`https://www.booking.com/booking-home/country/${result.data.country.code}.html`}
            className="bg-[#006ce4] hover:bg-[#0057b8] text-white px-2 py-4 rounded border border-white text-center"
            target="_blank"
          >
            Book a trip on Booking.com
          </a>

          <a
            href={`https://www.skyscanner.com/flights-to/${result.data.country.code}/`}
            className="bg-[#05203c] hover:bg-[#154679] text-white px-2 py-4 rounded border border-white text-center"
            target="_blank"
          >
            Find flights on SkyScanner
          </a>
        </div>
      </div>
    </div>
  );
}
