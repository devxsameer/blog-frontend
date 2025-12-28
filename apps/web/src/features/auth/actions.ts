// web/src/features/auth/actions.ts
import { redirect, type ActionFunctionArgs } from 'react-router';
import { login } from '@blog/api-client';

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  await login({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  return redirect('/');
}

export async function signupAction({ request }: ActionFunctionArgs) {
  await request.formData();

  return redirect('/');
}
