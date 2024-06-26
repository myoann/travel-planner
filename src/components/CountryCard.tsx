import Image from "next/image";

import { TCountry } from "@/types";

type TProps = {
  country: TCountry;
  onCompare: (event: React.MouseEvent) => void;
};

export default function CountryCard({
  country: { code, name },
  onCompare,
}: TProps) {
  return (
    <div className="flex flex-col items-center">
      <a
        href={`/country/${code}`}
        className="w-[200px] flex flex-col items-center gap-2 text-center"
      >
        <Image
          src={`/flags/${code.toLowerCase()}.svg`}
          alt={name}
          width={200}
          height={150}
        />

        <p className="text-wrap">{name}</p>
      </a>

      <button
        onClick={onCompare}
        className="mt-2 p-1 text-xs w-24 bg-[#1d1d1f] text-white rounded"
      >
        Compare
      </button>
    </div>
  );
}
