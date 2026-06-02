import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/content/site";
import { getFeatured } from "@/content/projects";
import { asset } from "@/lib/basePath";

export default function Home() {
  const featured = getFeatured();

  return (
    <Container>
      {/* Hero */}
      <section className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <Image
          src={asset(site.avatar)}
          alt={site.name}
          width={160}
          height={160}
          priority
          className="h-32 w-32 shrink-0 rounded-full object-cover ring-1 ring-black/10 sm:h-40 sm:w-40 dark:ring-white/15"
        />
        <div className="max-w-2xl">
          {/* <p className="text-sm font-medium text-zinc-500">{site.role}</p> */}
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {site.tagline}
          </p>
          <div className="mt-8 flex gap-4 text-sm">
            <Link
              href="/projects"
              className="rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mt-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Featured work</h2>
          <Link href="/projects" className="text-sm text-zinc-500 hover:text-foreground">
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
