"use client"
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { handlePasswordChange } from '@/app/(auth)/actions';

export function useUpdate() {
  const router = useRouter();
  const [updateState, setUpdateState] = useState({ status: 'idle' });

  const updateAction = async (formData: FormData) => {
    setUpdateState({ status: 'in_progress' });
    const status = await handlePasswordChange(formData);
    if (status.status === 'success') {
      setUpdateState({ status: 'success' });
      toast.success('Password updated successfully');
      router.refresh();
    } else {
      setUpdateState({ status: 'failed' });
      toast.error('Failed to update password');
    }
  };

  return { updateState, updateAction };
}
