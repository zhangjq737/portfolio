import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { asset } from "@/lib/basePath";

export function ProjectCard({ project }: { project: Project }) {
  // Covers live at /public/projects/<slug>.jpg unless an explicit one is set.
  const cover = project.cover ?? `/projects/${project.slug}.jpg`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/5 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/30"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={asset(cover)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-medium tracking-tight group-hover:underline">
            {project.title}
          </h3>
          {project.period && (
            <span className="shrink-0 text-xs text-zinc-500">{project.period}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-white/10 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
