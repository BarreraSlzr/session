export default function Page() {
  const message = 'The token has expired. Please request a new one.';

  return (
    <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
      <h3 className="text-xl font-semibold dark:text-zinc-50">Token Expired</h3>
      <p className="text-sm text-gray-500 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
}
