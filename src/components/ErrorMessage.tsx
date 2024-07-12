export default function ErrorMessage({ message }: { message: string }) {
  return <div className="px-8 text-lg text-red-500">{message}</div>;
}
