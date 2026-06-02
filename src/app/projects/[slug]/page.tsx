import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getProject, projects } from "@/content/projects";

// Pre-render all project pages at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container>
      <Link href="/projects" className="text-sm text-zinc-500 hover:text-foreground">
        ← Back to projects
      </Link>

      <header className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          {project.period && (
            <span className="shrink-0 text-sm text-zinc-500">{project.period}</span>
          )}
        </div>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.description && (
        <p className="mt-8 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
          {project.description}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        {/* In-app interactive demo (e.g. a future Web GIS map under /labs). */}
        {project.demo && (
          <Link
            href={project.demo}
            className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
          >
            Open live demo
          </Link>
        )}
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-5 py-2.5 font-medium transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            {link.label}
          </a>
        ))}
      </div>
    </Container>
  );
}
