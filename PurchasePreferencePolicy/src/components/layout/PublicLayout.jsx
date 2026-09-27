import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

// Off-white canvas with the landing page's faint grid and soft navy/gold washes.
export default function PublicLayout({ children, width = "max-w-6xl" }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip bg-cream">
      <div aria-hidden className="no-print bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div aria-hidden className="no-print pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-gold-500/15 blur-[110px]" />
      <div aria-hidden className="no-print pointer-events-none absolute -left-48 top-72 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-[110px]" />
      <PublicHeader />
      <main className={`mx-auto w-full flex-1 px-4 py-6 sm:px-6 sm:py-10 ${width}`}>{children}</main>
      <PublicFooter />
    </div>
  );
}
