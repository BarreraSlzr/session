'use client';

import { useFormStatus } from 'react-dom';
import { LoaderIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';


type SubmitButtonProps = {
  children: React.ReactNode
  isLoading: boolean
  id: string
}

export function SubmitButton({
  children,
  isLoading,
  id
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      id={id}
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending || isLoading}
      disabled={pending || isLoading}
      className="relative"
    >
      {children}

      {(pending || isLoading) && (
        <span className="animate-spin absolute right-4">
          <LoaderIcon />
        </span>
      )}

      <output aria-live="polite" className="sr-only">
        {pending || isLoading ? 'Cargando' : 'Enviar formulario'}
      </output>
    </Button>
  );
}
