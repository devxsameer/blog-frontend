import { Form, NavLink, Outlet, useLocation } from 'react-router';

export default function AuthPage() {
  const { pathname } = useLocation();
  const isSignup = pathname.endsWith('/signup');

  return (
    <div className="mx-auto mt-16 w-full max-w-md">
      <h1 className="mb-6 text-center text-2xl font-semibold">
        {isSignup ? 'Create account' : 'Welcome back'}
      </h1>

      <div className="mb-4 flex justify-center gap-4">
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            isActive ? 'font-medium underline' : 'text-gray-500'
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/auth/signup"
          className={({ isActive }) =>
            isActive ? 'font-medium underline' : 'text-gray-500'
          }
        >
          Sign up
        </NavLink>
      </div>

      <Form
        method="post"
        action={isSignup ? '/auth/signup' : '/auth/login'}
        className="space-y-4"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border p-2"
        />

        {isSignup && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required
            className="w-full rounded border p-2"
          />
        )}

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white"
        >
          Continue
        </button>
      </Form>

      <Outlet />
    </div>
  );
}
