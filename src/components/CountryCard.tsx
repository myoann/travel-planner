import { ChangeEvent } from "react";
import Image from "next/image";

import { TCountry } from "@/types";

type TProps = {
  country: TCountry;
  isChecked: boolean;
  isDisabled: boolean;
  onCompare: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function CountryCard({
  country: { code, name },
  isChecked,
  isDisabled,
  onCompare,
}: TProps) {
  return (
    <div className="flex flex-col rounded bg-white pb-4">
      <a
        href={`/country/${code}`}
        className="flex flex-col gap-2 sm:w-[133px] md:w-[200px]"
      >
        <div className="relative w-full sm:h-[100px] md:h-[150px]">
          <Image
            src={`/flags/${code.toLowerCase()}.svg`}
            alt={name}
            width={200}
            height={150}
            className="relative z-10 rounded-tl rounded-tr"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/25 to-transparent"></div>
        </div>

        <p className="line-clamp-2 h-12 text-wrap px-4 font-semibold">{name}</p>
      </a>

      <label className="mx-4 mt-2 flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onCompare}
          className="h-6 w-6 rounded border-gray-300 text-[#1d1d1f]"
        />

        <span className="ml-2 text-sm font-medium text-[#1d1d1f]">Compare</span>
      </label>
    </div>
  );
}
