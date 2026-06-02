import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { asset } from "@/lib/basePath";
import { site } from "@/content/site";
import {
  certifications,
  education,
  experience,
  skillGroups,
  summary,
} from "@/content/resume";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Container>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src={asset(site.avatar)}
          alt={site.name}
          width={120}
          height={120}
          className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-black/10 dark:ring-white/15"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            {summary}
          </p>
        </div>
      </div>

      {/* Skills */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-medium text-zinc-500">{group.label}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        <div className="mt-6 space-y-8">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="border-l border-black/10 pl-5 dark:border-white/15"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{job.title}</h3>
                <span className="text-sm text-zinc-500">{job.period}</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {job.company}
                {job.location ? ` · ${job.location}` : ""}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <div className="mt-6 space-y-6">
          {education.map((ed) => (
            <div key={ed.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium">{ed.credential}</h3>
                <span className="text-sm text-zinc-500">{ed.period}</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {ed.school}
                {ed.location ? ` · ${ed.location}` : ""}
              </p>
              {ed.detail && (
                <p className="mt-1 text-sm text-zinc-500">{ed.detail}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Certifications</h2>
        <div className="mt-6 space-y-3">
          {certifications.map((cert) => (
            <div key={cert.name}>
              <p className="font-medium">
                {cert.name}{" "}
                <span className="font-normal text-zinc-500">· {cert.issuer}</span>
              </p>
              {cert.detail && (
                <p className="text-sm text-zinc-500">{cert.detail}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
        <div className="mt-4 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
          {site.phone && <span>{site.phone}</span>}
          {site.location && <span>{site.location}</span>}
        </div>
      </section>
    </Container>
  );
}
