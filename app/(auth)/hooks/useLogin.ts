"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { login, LoginActionState } from '@/app/(auth)/actions';

export function useLogin() {
  const router = useRouter();
  const [loginState, setLoginState] = useState<LoginActionState>({ status: 'idle' });

  const loginAction = async (formData: FormData) => {
    setLoginState({ status: 'in_progress' });
    const state = await login(loginState, formData);
    setLoginState(state);

    if (state.status === 'failed') {
      toast.error('Invalid credentials!');
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!');
    } else if (state.status === 'success') {
      router.refresh();
    }
  };

  return { loginAction, loginState };
}
