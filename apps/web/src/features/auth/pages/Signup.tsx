import type { ValidationError } from '@blog/api-client';
import { Form, Link, useActionData } from 'react-router';

export default function SignupPage() {
  const actionData = useActionData() as ValidationError | undefined;
  return (
    <div className="card bg-base-100 max-w-sm shadow-sm">
      <div className="card-body">
        <div>
          <h1 className="text-2xl font-semibold">
            <span className="block text-3xl">👋</span>Create Account
          </h1>
          <p>Create an account to start exploring and commenting on posts.</p>
        </div>
        <div className="mt-4">
          {actionData?.issues && actionData.issues.length > 0 && (
            <div className="mb-2">
              {actionData?.issues?.map((issue) => (
                <p key={issue.path} className="text-red-500">
                  {issue.message}
                </p>
              ))}
            </div>
          )}

          <Form method="POST" action={'/auth/signup'}>
            <label className="label mb-0.5">Full Name</label>
            <input
              name="username"
              type="text"
              placeholder="Erwin Smith..."
              className="input mb-4 w-full"
            />
            <label className="label mb-0.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="devxsameer@gmail.com"
              required
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password@123"
              required
              className="input mb-4 w-full"
            />

            <button type="submit" className="btn btn-neutral btn-block">
              Sign Up
            </button>
          </Form>
        </div>
        <p className="mt-4 text-center text-sm">
          Already have a account?{' '}
          <Link to="/auth/login" className="link link-hover font-semibold">
            Login Instead
          </Link>
        </p>
      </div>
    </div>
  );
}
