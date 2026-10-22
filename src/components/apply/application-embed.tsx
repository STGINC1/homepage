import { cacheLife } from "next/cache";
import { isFramingAllowed } from "@/lib/embed";
import { APPLY_URL, COMPANY, SITE_URL } from "@/lib/site";
import { ExternalIcon, PhoneIcon } from "../icons";
import { ApplicationFrame } from "./application-frame";

const CHECK_TIMEOUT_MS = 5_000;

/**
 * Asks Zeus whether it currently lets this site show the application inline.
 * Cached for an hour, so the page switches to the embedded form on its own
 * once Zeus lists our domain in frame-ancestors.
 */
async function canEmbedApplication(): Promise<boolean> {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(APPLY_URL, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(CHECK_TIMEOUT_MS),
    });
    return response.ok && isFramingAllowed(response.headers, SITE_URL);
  } catch (error: unknown) {
    console.error("[apply] Could not check whether the application can be embedded", error);
    return false;
  }
}

/** The white-label Zeus driver application, shown inside the page when allowed. */
export async function ApplicationEmbed() {
  const isEmbeddable = await canEmbedApplication();

  if (isEmbeddable) {
    return (
      <div className="relative w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center text-sm font-semibold"
        >
          Loading application…
        </div>
        <ApplicationFrame src={APPLY_URL} title={`${COMPANY.displayName} driver application`} />
      </div>
    );
  }

  // Zeus does not allow this site to show the form inline yet.
  return (
    <div className="container-x py-16 sm:py-24">
      <div className="reveal-zoom relative overflow-clip rounded-[1.75rem] bg-[linear-gradient(135deg,var(--color-lapis)_0%,var(--color-brand-deep)_100%)] p-8 text-white sm:p-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,rgb(20_179_245/0.5),transparent_70%)]"
        />
        <div className="relative">
          <h3 className="text-2xl font-extrabold sm:text-3xl">Start your application</h3>
          <p className="mt-3 max-w-lg text-white/85">
            Our secure driver application takes one sitting. Have your CDL and work history handy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              Open the application
              <ExternalIcon className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={COMPANY.phone.href} className="btn btn-outline-light">
              <PhoneIcon className="size-4" />
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
