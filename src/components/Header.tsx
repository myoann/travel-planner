import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 w-full h-16 z-50 flex justify-between items-center bg-[#fbfbfd] shadow-sm px-8 py-4">
      <a href="/" className="font-bold">
        PLAN MY TRIP
      </a>

      <Image src="/logo.png" alt="Yoann Moise Logo" width={40} height={40} />
    </header>
  );
}
