export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <article className="prose prose-neutral max-w-3xl">
        <h1>About</h1>

        <p>
          Hi, I'm <strong>Sameer</strong> — I go by <strong>devxsameer</strong>{' '}
          online.
        </p>

        <p>
          I'm a developer who enjoys building{' '}
          <strong>real, production-style systems</strong>, not just demos. This
          site is where I write about what I'm learning while building
          full-stack applications — from backend architecture and authentication
          flows to frontend data patterns and UI decisions.
        </p>

        <p>
          This blog is part learning log, part notebook, and part portfolio.
          It's intentionally built as a real application, not a static site.
        </p>

        <h2>What I focus on</h2>

        <ul>
          <li>Full-stack web development with TypeScript</li>
          <li>Designing clean, scalable REST APIs</li>
          <li>Frontend architecture with predictable data flow</li>
          <li>Authentication, authorization, and edge cases</li>
          <li>Code that's easy to reason about and maintain</li>
        </ul>

        <p>
          Most of my projects start simple and evolve over time. I like thinking
          through trade-offs and building things that feel solid, even if
          they're small.
        </p>

        <h2>Why this blog exists</h2>

        <p>
          I built this blog as a real platform. It has a backend,
          authentication, role-based access, and admin tooling. Some parts may
          feel over-engineered for a personal blog — that's intentional.
        </p>

        <p>
          Writing helps me clarify my thinking and improve as an engineer.
          Everything here reflects how I approach building software.
        </p>

        <h2>Get in touch</h2>

        <p>
          You can find me online as <strong>devxsameer</strong>. If you're
          interested in my work, want to collaborate, or just want to talk about
          software, feel free to reach out.
        </p>
      </article>
    </div>
  );
}
