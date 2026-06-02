"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { site } from "@/content/site";

// Add routes here as the site grows.
const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Labs", href: "/labs" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  // A tab is active on its own page and any nested route
  // (e.g. /projects/land-price-system keeps "Projects" active).
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-10 border-b border-black/5 bg-background/80 backdrop-blur dark:border-white/10">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            {site.name}
          </Link>
          <nav className="flex gap-6 text-sm">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 transition-colors ${active
                      ? "text-foreground"
                      : "text-zinc-600 hover:text-foreground dark:text-zinc-400"
                    }`}
                >
                  {item.label}
                  {/* Active-tab underline indicator */}
                  <span
                    className={`absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-foreground transition-opacity ${active ? "opacity-100" : "opacity-0"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </header>
  );
}
