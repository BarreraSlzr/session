"use client";

import { Form } from "@/app/(auth)/components/auth-form";
import { useReset } from "@/app/(auth)/hooks/useReset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/(auth)/components/submit-button";

export function ResetForm({ token }: { token: string | null }) {
  const { resetAction, resetState } = useReset();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === "reset") {
      if (token) {
        formData.append("token", token);
      }
      await resetAction(formData);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input id="newPassword" name="newPassword" type="password" required />
      </div>
      <SubmitButton id="reset" isLoading={resetState.status === "in_progress"}>
        Reset Password
      </SubmitButton>
    </Form>
  );
}
