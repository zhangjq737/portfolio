import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 py-8 text-sm text-zinc-500 dark:border-white/10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-5">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
