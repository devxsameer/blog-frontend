import { ApiClientError, ValidationError } from '@blog/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { signup } from '../auth.api';
import { Link } from '@tanstack/react-router';

export default function SignupPage() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ValidationError['issues'] | null>(null);

  const signupMutation = useMutation({
    mutationFn: () => signup(username, email, password),
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
            <span className="block text-3xl">👋</span>Create Account
          </h1>
          <p>Create an account to start exploring and commenting on posts.</p>
        </div>
        <div className="mt-4">
          {issues && (
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
              signupMutation.mutate();
            }}
          >
            {error && (
              <div className="alert alert-error mb-4 shadow-sm">
                <span>{error}</span>
              </div>
            )}
            <label className="label mb-0.5">Full Name</label>
            <input
              name="username"
              type="text"
              placeholder="Erwin Smith..."
              value={username}
              disabled={signupMutation.isPending}
              onChange={(e) => setUsername(e.target.value)}
              className="input mb-4 w-full"
            />
            <label className="label mb-0.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="devxsameer@gmail.com"
              value={email}
              disabled={signupMutation.isPending}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password@123"
              value={password}
              disabled={signupMutation.isPending}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <button type="submit" className="btn btn-neutral btn-block">
              Sign Up
            </button>
          </form>
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
