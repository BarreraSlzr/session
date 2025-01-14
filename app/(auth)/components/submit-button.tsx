'use client';

import { useFormStatus } from 'react-dom';
import { LoaderIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';


type SubmitButtonProps = {
  children: React.ReactNode
  isSuccessful: boolean
  id: string
}

export function SubmitButton({
  children,
  isSuccessful,
  id
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      id={id}
      type={pending ? 'button' : 'submit'}
      aria-disabled={pending || isSuccessful}
      disabled={pending || isSuccessful}
      className="relative"
    >
      {children}

      {(pending || isSuccessful) && (
        <span className="animate-spin absolute right-4">
          <LoaderIcon />
        </span>
      )}

      <output aria-live="polite" className="sr-only">
        {pending || isSuccessful ? 'Cargando' : 'Enviar formulario'}
      </output>
    </Button>
  );
}
