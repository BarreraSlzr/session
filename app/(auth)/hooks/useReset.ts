"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { handlePasswordChange } from '@/app/(auth)/actions';

export function useReset() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resetState, setResetState] = useState({ status: 'idle' });

  const resetAction = async (formData: FormData) => {
    const token = searchParams.get("token");
    if (token) {
      formData.append("token", token);
    }
    setResetState({ status: 'in_progress' });
    const { status } = await handlePasswordChange(formData);
      setResetState({ status });
    if (status === 'success') {
      toast.success('Password reset successfully');
      router.refresh();
    } else {
      toast.error('Failed to reset password');
    }
  };

  return { resetState, resetAction };
}
