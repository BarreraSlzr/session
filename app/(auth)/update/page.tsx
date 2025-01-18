import { UpdateForm } from '@/components/form/UpdateForm';

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Update Password</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Enter your current password and your new password
        </p>
      </div>
      <UpdateForm />
    </>
  );
}
