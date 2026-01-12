import { ApiClientError, ValidationError } from '@blog/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../auth.api';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export default function LoginPage() {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ValidationError['issues'] | null>(null);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => {
      if (err instanceof ValidationError) {
        setIssues(err.issues);
      } else if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
        console.error(err);
      }
    },
  });
  return (
    <div className="card bg-base-100 max-w-sm shadow-sm">
      <div className="card-body">
        <div>
          <h1 className="text-2xl font-semibold">
            <span className="block text-3xl">🔒</span>Welcome Back
          </h1>
          <p>Log in to continue interacting with the blog.</p>
        </div>
        <div className="mt-4">
          {issues && issues.length > 0 && (
            <div className="mb-2">
              {issues?.map((issue) => (
                <p key={issue.path} className="text-red-500">
                  {issue.message}
                </p>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate();
            }}
          >
            {error && (
              <div className="alert alert-error mb-4 shadow-sm">
                <span>{error}</span>
              </div>
            )}
            <label className="label mb-0.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Registered email..."
              value={email}
              disabled={loginMutation.isPending}
              onChange={(e) => setEmail(e.target.value)}
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password..."
              value={password}
              disabled={loginMutation.isPending}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <button type="submit" className="btn btn-neutral btn-block">
              {loginMutation.isPending ? 'Authenticating…' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm">
          First time here?{' '}
          <Link to="/auth/signup" className="link link-hover font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
