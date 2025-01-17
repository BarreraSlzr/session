"use client";

import { Form } from '@/app/(auth)/components/auth-form';
import { useValidate } from '@/app/(auth)/hooks/useValidate';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { validateAction, validateState } = useValidate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'validate') {
      await validateAction(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Validate Email</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Enter the token sent to your email to validate your account
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="token">Token</Label>
          <Input id="token" name="token" type="text" required />
        </div>
        <SubmitButton id="validate" isLoading={validateState.status === 'in_progress'}>
          Validate
        </SubmitButton>
      </Form>
    </>
  );
}
