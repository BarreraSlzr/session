"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useReset() {
  const router = useRouter();
  const [resetState, setResetState] = useState({ status: 'idle' });

  const resetAction = async (formData: FormData) => {
    setResetState({ status: 'in_progress' });
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: formData.get('token'),
          newPassword: formData.get('newPassword'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setResetState({ status: 'success' });
      toast.success('Password reset successfully');
      router.refresh();
    } catch (error) {
      setResetState({ status: 'failed' });
      toast.error('Failed to reset password');
    }
  };

  return { resetState, resetAction };
}
