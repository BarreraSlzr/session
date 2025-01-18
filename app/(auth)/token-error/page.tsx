import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'An error occurred with the token.';

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
      <h3 className="text-xl font-semibold dark:text-zinc-50">Token Error</h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
}
