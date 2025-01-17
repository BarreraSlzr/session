"use client"
import { useActionState } from "react";
import { RegisterActionState, register } from "@/app/(auth)/actions";

export function useRegister() {
  const [registerState, registerAction] = useActionState<RegisterActionState, FormData>(
    register,
    { status: "idle" }
  );

  return { registerState, registerAction };
}
