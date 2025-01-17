"use client";

import { Form } from '@/app/(auth)/components/auth-form';
import { useReset } from '@/app/(auth)/hooks/useReset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { resetAction, resetState } = useReset();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'reset') {
      await resetAction(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Reset Password</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Enter the token sent to your email and your new password
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="token">Token</Label>
          <Input id="token" name="token" type="text" required />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" name="newPassword" type="password" required />
        </div>
        <SubmitButton id="reset" isLoading={resetState.status === 'in_progress'}>
          Reset Password
        </SubmitButton>
      </Form>
    </>
  );
}
