import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const [validationMessage, setValidationMessage] = useState('Validating your email...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setValidationMessage('Email validated successfully');
    } else {
      setValidationMessage('Invalid token');
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
        <h3 className="text-xl font-semibold dark:text-zinc-50">Validate Email</h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {validationMessage}
        </p>
      </div>
    </>
  );
}

// Token validation is handled in the middleware
