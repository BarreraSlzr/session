"use client";

import { Form } from "@/app/(auth)/components/form";
import { useUpdate } from "@/app/(auth)/hooks/useUpdate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/app/(auth)/components/submit-button";

export function UpdateForm() {
  const { updateAction, updateState } = useUpdate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => {
    if (submitterId === "update") {
      await updateAction(formData);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input id="currentPassword" name="currentPassword" type="password" required />
      </div>
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input id="newPassword" name="newPassword" type="password" required />
      </div>
      <SubmitButton id="update" isLoading={updateState.status === "in_progress"}>
        Update Password
      </SubmitButton>
    </Form>
  );
}
