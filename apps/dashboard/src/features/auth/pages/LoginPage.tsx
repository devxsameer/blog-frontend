// dashboard/src/features/auth/pages/LoginPage.tsx
import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { ApiClientError, ValidationError } from '@blog/api-client';
import { login } from '../auth.api';

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ValidationError['issues'] | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setIssues(null);

    try {
      await login(email, password);
      router.navigate({ to: '/dashboard' });
    } catch (err) {
      if (err instanceof ValidationError) {
        setIssues(err.issues);
      } else if (err instanceof ApiClientError) {
        setError(err.message);
      } else {
        setError('Unexpected error occurred');
        console.error(err);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-base-200 font-outfit flex h-screen w-screen items-center justify-center">
      <div className="card bg-base-100 max-w-sm shadow-sm">
        <div className="card-body">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="block text-3xl">🔒</span>Blog Dashboard
            </h1>
            <p>Log in to verify your identity.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            {issues && (
              <div className="mb-2 space-y-1">
                {issues.map((issue) => (
                  <p key={issue.path} className="text-red-500">
                    {issue.message}
                  </p>
                ))}
              </div>
            )}

            {error && (
              <div className="alert alert-error mb-4 shadow-sm">
                <span>{error}</span>
              </div>
            )}

            {/* Demo credentials */}
            <div className="alert mb-4 text-sm">
              <div>
                <p className="font-medium">Demo access (read-only)</p>
                <p>
                  Email: <code>admin@devxsameer.me</code>
                  <br />
                  Password: <code>admin123</code>
                </p>
              </div>
            </div>

            <label className="label mb-0.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
              disabled={submitting}
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
              disabled={submitting}
              className="input mb-4 w-full"
            />

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-neutral btn-block shadow-md"
            >
              {submitting ? 'Authenticating…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
