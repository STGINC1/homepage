import Link from "next/link";
import { COMPANY } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-clip bg-ink pt-24 text-paper">
      <div aria-hidden="true" className="tile-pattern absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="container-x">
        <p className="eyebrow !text-brand-bright">Error 404</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,1.4rem+4.4vw,4.8rem)] leading-[0.98] font-black">
          Wrong exit. <span className="text-gradient">Let&apos;s reroute.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/70">
          That page isn&apos;t on our map. Head back home or give us a call at {COMPANY.phone.display}.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
