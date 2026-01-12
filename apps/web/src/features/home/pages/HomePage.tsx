import { Link } from '@tanstack/react-router';

export default function HomePage() {
  return (
    <section className="mx-auto space-y-12">
      {/* Intro */}
      <header className="my-10 max-w-prose space-y-4">
        <h1 className="text-5xl font-semibold tracking-tight">
          Hi, I'm Sameer 👋
        </h1>

        <p className="text-md leading-relaxed text-neutral-600">
          This is my <span className="underline"> personal blog</span> — a place
          where I write about building real web applications, learning in
          public, and the decisions behind the projects I work on.
        </p>

        <p className="text-sm leading-relaxed text-neutral-600">
          The blog itself is also a project. It's built with modern React, React
          Router loaders, and a production-style architecture.
        </p>
      </header>

      {/* Primary actions */}
      <div className="flex flex-wrap gap-4">
        <Link to="/posts" className="btn btn-md btn-neutral">
          Read the blog
        </Link>

        <a
          href="https://devxsameer.me"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          View Portfolio
        </a>
      </div>

      {/* What you write about */}
      <section className="space-y-3">
        <h2 className="text-2xl font-medium">What you'll find here</h2>

        <ul className="list-disc space-y-2 pl-5 text-neutral-600">
          <li>Notes and learnings from building full-stack projects</li>
          <li>React, TypeScript, and modern frontend architecture</li>
          <li>Tradeoffs, mistakes, and things tutorials don't usually show</li>
        </ul>
      </section>

      {/* Project context */}
      <section className="card bg-base-100 border-base-300 rounded-sm border text-sm shadow-sm">
        <div className="card-body">
          <p className="text-center">
            <span className="font-semibold text-neutral-800">
              About this site:
            </span>
            This blog is part of a larger project. An admin dashboard lives at{' '}
            <code className="bg-base-300 rounded px-1 py-0.5">
              dashboard.blog.devxsameer.me
            </code>
            and is used to manage posts, comments, and content.
          </p>
        </div>
      </section>

      {/* Soft closing */}
      <footer className="text-sm text-neutral-500">
        <p>
          Start with the latest post, or browse everything from the posts page.
        </p>
      </footer>
    </section>
  );
}
