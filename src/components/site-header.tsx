"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cssVars } from "@/lib/css-vars";
import { COMPANY, NAV_LINKS } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", handleResize);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", handleResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 text-paper">
        <div
          className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-brand-bright to-lapis"
          aria-hidden="true"
        />
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-4 xl:gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center xl:gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-4 hover:text-brand-bright ${
                        isActive ? "text-brand-bright" : "text-paper/85"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent xl:inset-x-4" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={COMPANY.phone.href}
              className="-m-2 flex items-center gap-2 rounded-full p-2 text-sm font-semibold whitespace-nowrap text-paper/90 transition-colors hover:text-accent xl:m-0 xl:p-0"
            >
              <PhoneIcon className="size-4" />
              <span className="sr-only xl:not-sr-only">{COMPANY.phone.display}</span>
            </a>
            <Link href="/contact" className="btn btn-primary !min-h-10 !py-2 text-sm whitespace-nowrap">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <div
          aria-hidden="true"
          className="tile-pattern pointer-events-none absolute inset-0 opacity-[0.06]"
        />
        <nav aria-label="Mobile" className="container-x relative flex flex-col gap-2 py-8">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={pathname === link.href ? "page" : undefined}
              style={cssVars({ "--d": index })}
              className="hero-enter font-display border-b border-paper/10 py-4 text-3xl font-bold text-paper aria-[current=page]:text-brand-bright"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" onClick={closeMenu} className="btn btn-primary">
              Get a Quote
            </Link>
            <a href={COMPANY.phone.href} className="btn btn-ghost">
              <PhoneIcon className="size-4" />
              Call {COMPANY.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
