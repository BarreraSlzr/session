import { ResetForm } from '@/components/form/ResetForm';

// Token validation is handled in the middleware
export default function Page() {

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Reset Password</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Enter your new password
        </p>
      </div>
      <ResetForm />
    </>
  );
}