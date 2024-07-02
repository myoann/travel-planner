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
    <div className="flex flex-col bg-white rounded pb-4">
      <a href={`/country/${code}`} className="w-[200px] flex flex-col gap-2">
        <div className="relative w-full h-[150px]">
          <Image
            src={`/flags/${code.toLowerCase()}.svg`}
            alt={name}
            width={200}
            height={150}
            className="relative z-10 rounded-tl rounded-tr"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent z-20"></div>
        </div>

        <p className="text-wrap px-4 font-semibold line-clamp-2 h-12">{name}</p>
      </a>

      <label className="flex items-center mx-4 mt-2">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isDisabled}
          onChange={onCompare}
          className="h-6 w-6 text-[#1d1d1f] rounded border-gray-300"
        />

        <span className="ml-2 text-sm font-medium text-[#1d1d1f]">Compare</span>
      </label>
    </div>
  );
}
