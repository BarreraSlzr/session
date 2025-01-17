"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useValidate() {
  const router = useRouter();
  const [validateState, setValidateState] = useState({ status: 'idle' });

  const validateAction = async (formData: FormData) => {
    setValidateState({ status: 'in_progress' });
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: formData.get('token'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to validate email');
      }

      setValidateState({ status: 'success' });
      toast.success('Email validated successfully');
      router.refresh();
    } catch (error) {
      setValidateState({ status: 'failed' });
      toast.error('Failed to validate email');
    }
  };

  return { validateState, validateAction };
}
