"use client";

import { Form } from "@/app/(auth)/components/form";
import { useReset } from "@/app/(auth)/hooks/useReset";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/(auth)/components/submit-button";
import { useSearchParams } from "next/navigation";

export function ResetForm() {
  const { resetAction, resetState } = useReset();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

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
        <Label htmlFor="password">New Password</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <SubmitButton id="reset" isLoading={resetState.status === "in_progress"}>
        Reset Password
      </SubmitButton>
    </Form>
  );
}
