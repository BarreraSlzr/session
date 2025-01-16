import Form from 'next/form';
import { logout } from '../actions';

export const SignOutForm = () => {
  return (
    <Form
      className="w-full"
      action={async () => {
        'use server';

        await logout();
      }}
    >
      <button
        type="submit"
        className="w-full text-left px-1 py-0.5 text-red-500"
      >
        Cerrar sesión
      </button>
    </Form>
  );
};
