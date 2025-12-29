import { isRouteErrorResponse, useRouteError, Link } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();

  // Loader / action errors (Response thrown)
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold">404 - Not Found</h1>
            <p className="mt-2 text-gray-600">
              The page or resource you're looking for doesn't exist.
            </p>
            <Link to="/" className="mt-4 inline-block underline">
              Go home
            </Link>
          </div>
        );

      case 401:
        return (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold">Unauthorized</h1>
            <p className="mt-2 text-gray-600">Please log in to continue.</p>
            <Link to="/auth/login" className="mt-4 inline-block underline">
              Login
            </Link>
          </div>
        );

      case 500:
        return (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-semibold">Server Error</h1>
            <p className="mt-2 text-gray-600">
              Something went wrong on our end.
            </p>
          </div>
        );
    }
  }

  // Runtime errors (JS crashes)
  if (error instanceof Error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold">Application Error</h1>
        <p className="mt-2 text-gray-600">{error.message}</p>
      </div>
    );
  }

  // Truly unknown
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Unexpected Error</h1>
    </div>
  );
}
