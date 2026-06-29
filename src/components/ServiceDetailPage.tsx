import Link from "next/link";
import { ServiceGalleryGrid } from "@/components/ServiceGalleryGrid";
import { servicesPageItems, type ServicesPageItem } from "@/lib/services-page";
import { cn } from "@/lib/utils";

function ServiceDetailSideNav({ activeId }: { activeId: string }) {
  return (
    <aside className="sticky top-[100px] hidden h-[calc(100vh-100px)] bg-cream pb-10 pt-5 lg:flex lg:flex-col">
      <nav className="flex grow flex-col px-5 text-[18px] font-light leading-[1.25] text-navy">
        <Link href="/services" className="mb-6 pl-10 transition-colors hover:text-gold">
          Our Services
        </Link>
        <ul className="flex flex-col gap-[20px]">
          {servicesPageItems.map((service) => {
            const active = service.id === activeId;

            return (
              <li key={service.id}>
                <Link
                  href={service.href}
                  className={cn(
                    "relative block pl-10 transition-colors hover:text-gold",
                    active && "text-gold"
                  )}
                >
                  {active && (
                    <span className="kp-dashed-x absolute left-[-20px] top-[0.72em] h-px w-[54px]" />
                  )}
                  {service.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function ServiceDetailPage({ service }: { service: ServicesPageItem }) {
  return (
    <main className="bg-cream pt-[82px] lg:pt-[100px]">
      <div className="lg:grid lg:grid-cols-[274px_minmax(0,1fr)]">
        <ServiceDetailSideNav activeId={service.id} />

        <article className="min-w-0 pb-20">
          <header className="px-5 pb-10 pt-8 lg:px-12 lg:pb-12 lg:pt-12">
            <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-end">
              <h1 className="text-left text-[clamp(2.25rem,5.25vw,5.2rem)] font-semibold uppercase leading-[0.98] text-navy">
                {service.title}
              </h1>
              <div className="border-t border-navy/25 pt-6 text-[15px] font-light leading-[1.65] text-navy/85 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:text-[17px]">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </header>

          <section
            aria-label={`${service.title} gallery`}
            className="px-3 pb-16 lg:px-0 lg:pr-5"
          >
            <ServiceGalleryGrid title={service.title} images={service.gallery} />
          </section>
        </article>
      </div>
    </main>
  );
}
