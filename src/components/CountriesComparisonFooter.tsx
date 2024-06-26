"use client";

import { TCountry } from "@/types";

import Image from "next/image";

type TProps = {
  selectedCountries: TCountry[];
  removeCountry: (country: TCountry) => void;
};

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-0 right-0 bg-white rounded-full"
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
    <div className="fixed bottom-0 w-full h-40 bg-white flex items-center justify-center gap-16 shadow-2xl">
      <div className="flex text-center">
        <div className="flex flex-col items-center w-32">
          <div className="relative">
            <Image
              src={`/flags/${selectedCountries[0].code.toLowerCase()}.svg`}
              alt={selectedCountries[0].name}
              width={60}
              height={40}
            />

            <RemoveButton onClick={() => removeCountry(selectedCountries[0])} />
          </div>

          <p>{selectedCountries[0].name}</p>
        </div>

        <span className="mx-4 text-4xl self-center">+</span>

        {selectedCountries.length > 1 ? (
          <div className="flex flex-col items-center w-32">
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
          <div className="w-[60px] h-[40px] border flex items-center justify-center self-center">
            2
          </div>
        )}
      </div>

      {selectedCountries.length === 2 ? (
        <a
          href={`/country/compare/${selectedCountries[0].code}-${selectedCountries[1].code}`}
          className="bg-[#1d1d1f] text-white px-8 py-4 rounded"
        >
          See the comparison
        </a>
      ) : (
        <div className="">Select one more country to compare</div>
      )}
    </div>
  );
}
