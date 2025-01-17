"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useUpdate() {
  const router = useRouter();
  const [updateState, setUpdateState] = useState({ status: 'idle' });

  const updateAction = async (formData: FormData) => {
    setUpdateState({ status: 'in_progress' });
    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.get('currentPassword'),
          newPassword: formData.get('newPassword'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setUpdateState({ status: 'success' });
      toast.success('Password updated successfully');
      router.refresh();
    } catch (error) {
      setUpdateState({ status: 'failed' });
      toast.error('Failed to update password');
    }
  };

  return { updateState, updateAction };
}
