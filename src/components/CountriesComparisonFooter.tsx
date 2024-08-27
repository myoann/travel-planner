"use client";

import Image from "next/image";

import { TCountry } from "@/types";

type TProps = {
  selectedCountries: TCountry[];
  removeCountry: (country: TCountry) => void;
};

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-0 rounded-full bg-white"
      style={{ transform: "translate(50%, -50%)" }}
    >
      <Image src="cross.svg" alt="Remove image" width={16} height={16} />
    </button>
  );
}

export default function CountriesComparisonFooter({
  selectedCountries,
  removeCountry,
}: TProps) {
  return (
    <div className="fixed bottom-0 z-50 w-full bg-white shadow-2xl">
      <p className="flex h-10 w-full items-center justify-center bg-[#1d1d1f] font-bold text-white">
        Compare countries ({selectedCountries.length}/2)
      </p>

      <div className="flex h-32 items-center justify-center bg-white sm:h-52 sm:flex-col sm:gap-4 md:flex-row md:gap-16">
        <div className="flex text-center">
          <div className="flex w-32 flex-col items-center">
            <div className="relative">
              <Image
                src={`/flags/${selectedCountries[0].code.toLowerCase()}.svg`}
                alt={selectedCountries[0].name}
                width={60}
                height={40}
              />

              <RemoveButton
                onClick={() => removeCountry(selectedCountries[0])}
              />
            </div>

            <p>{selectedCountries[0].name}</p>
          </div>

          <span className="mx-4 self-center text-4xl">+</span>

          {selectedCountries.length > 1 ? (
            <div className="flex w-32 flex-col items-center">
              <div className="relative">
                <Image
                  src={`/flags/${selectedCountries[1].code.toLowerCase()}.svg`}
                  alt={selectedCountries[1].name}
                  width={60}
                  height={40}
                />

                <RemoveButton
                  onClick={() => removeCountry(selectedCountries[1])}
                />
              </div>
              <p>{selectedCountries[1].name}</p>
            </div>
          ) : (
            <div className="flex h-[40px] w-[60px] items-center justify-center self-center border">
              2
            </div>
          )}
        </div>

        {selectedCountries.length === 2 ? (
          <a
            href={`/country/compare/${selectedCountries[0].code}-${selectedCountries[1].code}`}
            className="rounded bg-[#1d1d1f] px-8 py-4 text-white"
          >
            See the comparison
          </a>
        ) : (
          <div className="">Select one more country to compare</div>
        )}
      </div>
    </div>
  );
}
