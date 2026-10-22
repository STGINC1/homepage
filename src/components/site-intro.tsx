import Image from "next/image";
import markLight from "@/assets/brand/stg-mark-light.png";

/** How long the intro holds the page hero animations back (keep in sync with intro.css). */
const INTRO_DONE_MS = 3200;
const SEEN_KEY = "stg-intro-seen";

/**
 * Runs before first paint. The intro plays once per browser session: later
 * visits skip it, and once it has played, page heroes stop waiting for it so
 * client-side navigation stays fast.
 */
const INTRO_SCRIPT = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem("${SEEN_KEY}")){d.classList.add("intro-seen");return}sessionStorage.setItem("${SEEN_KEY}","1")}catch(e){}setTimeout(function(){d.classList.add("intro-seen")},${INTRO_DONE_MS})})();`;

export function SiteIntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />;
}

/**
 * Opening animation: the logo and name settle in, a blue line draws across the
 * middle of the screen, then the screen splits open along that line to reveal
 * the page. Pure CSS (see intro.css), so it starts before JavaScript loads.
 */
export function SiteIntro() {
  return (
    <div className="site-intro" aria-hidden="true">
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />

      <div className="intro-brand">
        <Image src={markLight} alt="" sizes="160px" priority className="intro-mark h-14 w-auto sm:h-16" />
        <p className="intro-name font-display text-lg font-extrabold text-paper sm:text-xl">
          SAMARKAND
          <span className="mt-1.5 block text-[0.62rem] font-semibold tracking-[0.42em] text-paper/60">
            TRANSPORT GROUP
          </span>
        </p>
      </div>

      <div className="intro-line" />

      <p className="intro-tagline text-[0.65rem] font-semibold tracking-[0.36em] text-brand-bright uppercase">
        All 48 states · Mason, Ohio
      </p>
    </div>
  );
}
