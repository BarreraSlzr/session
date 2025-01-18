"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Form } from '@/app/(auth)/components/auth-form';
import { useReset } from '@/app/(auth)/hooks/useReset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { resetAction, resetState } = useReset();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'reset') {
      if (token) {
        formData.append('token', token);
      }
      await resetAction(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Reset Password</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {token ? 'Enter your new password' : 'No token found. Please check your email for the reset link.'}
        </p>
      </div>
      {resetState.status === 'success' && (
        <p className="text-center text-green-500">Password reset successfully!</p>
      )}
      {token && (
        <Form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <SubmitButton id="reset" isLoading={resetState.status === 'in_progress'}>
            Reset Password
          </SubmitButton>
        </Form>
      )}
    </>
  );
}
