import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-5 py-20 sm:px-10 sm:py-28">
      <p className="mb-3 text-[13px] font-bold tracking-[0.15em] text-accent uppercase">404</p>
      <h1 className="font-serif mb-5 text-[2.25rem] leading-[1.15] font-semibold tracking-tight text-foreground">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mb-9 max-w-md text-[17px] leading-relaxed text-foreground/70">
        The topic or page you&rsquo;re looking for isn&rsquo;t here — it may not have been released yet,
        or the link is out of date.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
      >
        ← Back to Mastery
      </Link>
    </div>
  );
}
