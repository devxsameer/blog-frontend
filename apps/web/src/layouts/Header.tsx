// web/src/layout/Header.tsx
import { useState } from 'react';

type User = {
  username: string;
  avatarUrl?: string;
};

function useAuth() {
  // 🔁 replace with real auth later
  const user: User | null = {
    username: 'devxsameer',
  };

  return {
    user,
    logout: () => console.log('logout'),
  };
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-neutral-200 px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight">
            Blog<span className="text-neutral-400">.</span>
          </span>
          <span className="text-sm text-neutral-500">
            writing with <span className="font-medium">devxsameer</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/posts">Posts</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        {/* Auth Actions (Desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <NavLink href="/login">Login</NavLink>
              <a
                href="/signup"
                className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Sign up
              </a>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-neutral-700">
                  {user.username}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-neutral-200 bg-white shadow-sm">
                  <DropdownLink href="/profile">Profile</DropdownLink>
                  <DropdownLink href="/dashboard">Dashboard</DropdownLink>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            <MobileNavLink href="/" onClick={() => setOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/posts" onClick={() => setOpen(false)}>
              Posts
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setOpen(false)}>
              About
            </MobileNavLink>

            <div className="my-2 border-t border-neutral-200" />

            {!user ? (
              <>
                <MobileNavLink href="/login" onClick={() => setOpen(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink href="/signup" onClick={() => setOpen(false)}>
                  Sign up
                </MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink href="/profile" onClick={() => setOpen(false)}>
                  Profile
                </MobileNavLink>
                <MobileNavLink href="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <button
                  onClick={logout}
                  className="rounded-md px-2 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- helpers ---------- */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
    >
      {children}
    </a>
  );
}

function DropdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
    >
      {children}
    </a>
  );
}
