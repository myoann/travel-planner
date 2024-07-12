import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-[#fbfbfd] px-8 py-4 shadow-sm">
      <a href="/" className="font-bold">
        PLAN MY TRIP
      </a>

      <Image src="/logo.png" alt="Yoann Moise Logo" width={40} height={40} />
    </header>
  );
}
