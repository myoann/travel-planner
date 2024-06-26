export default function ErrorMessage({ message }: { message: string }) {
  return <div className="px-8 text-red-500 text-lg">{message}</div>;
}
