"use client";

import { Form } from '@/app/(auth)/components/auth-form';
import { useUpdate } from '@/app/(auth)/hooks/useUpdate';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/app/(auth)/components/submit-button';

export default function Page() {
  const { updateAction, updateState } = useUpdate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === 'update') {
      await updateAction(formData);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Update Password</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          Enter your current password and your new password
        </p>
      </div>
      <Form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" name="currentPassword" type="password" required />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" name="newPassword" type="password" required />
        </div>
        <SubmitButton id="update" isLoading={updateState.status === 'in_progress'}>
          Update Password
        </SubmitButton>
      </Form>
    </>
  );
}
