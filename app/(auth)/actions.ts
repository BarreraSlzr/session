'use server'
import { z } from "zod";
import { createSession } from "./lib/session";
import { createUser, getUser, createPassword, validatePassword, updatePassword, resetPassword, verifyCredential, getAuthMethodForReset, getAuthMethodForValidation, getAuthMethodForUpdate } from "@/app/(auth)/lib/db/queries";
import { getCookie } from "@/app/(auth)/lib/cookies";
import { handleAuthMethodValidation, errorMessages } from "@/app/(auth)/lib/token";

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
  state: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await getUser(validatedData.email);
    if (!user) {
      return { status: "failed" };
    }

    const isPasswordValid = await validatePassword(user.id, validatedData.password);
    if (!isPasswordValid) {
      return { status: "failed" };
    }

    await createSession(user.id);
    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.error("Login error:", error);
    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "user_exists" | "invalid_data";
}

export const register = async (
  state: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const existingUser = await getUser(validatedData.email);
    if (existingUser) {
      return { status: "user_exists" };
    }

    const newUser = await createUser(validatedData.email);
    await createPassword(newUser.id, validatedData.password);
    await createSession(newUser.id);

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.error("Registration error:", error);
    return { status: "failed" };
  }
};

export interface PasswordChangeStatus {
  status: "success" | "failed" | "invalid_data";
}

export const handlePasswordChange = async (formData: FormData): Promise<PasswordChangeStatus> => {
  try {
    const token = await getCookie('token') as string;
    const newPassword = formData.get("newPassword") as string;
    const currentPassword = formData.get("currentPassword") as string;
    const authMethod = 
    await handleAuthMethodValidation(
      currentPassword
          ? await getAuthMethodForReset(token)
          : await getAuthMethodForUpdate(token)
    )

    if (currentPassword) {
      await verifyCredential('set-password', token as string);
      await updatePassword(authMethod.userId, currentPassword, newPassword);
    } else {
      await verifyCredential('reset-password', token as string)
      await resetPassword(token as string, newPassword);
    }

    return { status: "success" };
  } catch (error) {
    console.error("Password change error:", error);
    return { status: "failed" };
  }
};
