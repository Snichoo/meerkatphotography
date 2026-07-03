"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, type RefObject, useEffect, useRef, useState } from "react";
import { servicesPageItems, type ServicesPageItem } from "@/lib/services-page";
import { ScrollChevronIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function ServicesSideNav({ activeId }: { activeId: string }) {
  return (
    <aside className="sticky top-[100px] hidden h-[calc(100vh-119px)] bg-cream pb-10 pt-8 lg:flex lg:flex-col">
      <nav className="flex grow flex-col px-5 text-[18px] font-light leading-[1.05] text-navy">
        <a
          href="#section-overview"
          className={cn(
            "relative mb-6 pl-10 transition-colors hover:text-gold",
            activeId === "section-overview" && "text-gold"
          )}
        >
          {activeId === "section-overview" && (
            <span className="kp-dashed-x absolute left-[-20px] top-1/2 h-px w-[54px]" />
          )}
          Our Services
        </a>
        <ul className="flex flex-col gap-[21px]">
          {servicesPageItems.map((service) => {
            const sectionId = `link-${service.id}`;
            const active = activeId === sectionId;

            return (
              <li key={service.id}>
                <a
                  href={`#${sectionId}`}
                  className={cn(
                    "relative block pl-10 transition-colors hover:text-gold",
                    active && "text-gold"
                  )}
                >
                  {active && (
                    <span className="kp-dashed-x absolute left-[-20px] top-[0.55em] h-px w-[54px]" />
                  )}
                  {service.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function ServiceDrawer({
  service,
  open,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  drawerRef,
}: {
  service: ServicesPageItem;
  open: boolean;
  onToggle: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  drawerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={drawerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute right-0 top-1/2 z-40 h-[450px] w-[576px] -translate-y-1/2 rounded-l-[20px] bg-navy text-cream transition-transform duration-500 ease-in-out",
        open ? "translate-x-0" : "translate-x-[502px]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "absolute left-0 top-0 flex h-full w-[74px] items-center justify-center rounded-l-[20px] text-[22px] font-light uppercase tracking-normal transition-colors [writing-mode:vertical-rl]",
          open ? "text-gold" : "text-cream"
        )}
      >
        <span className="rotate-180">More Information</span>
      </button>

      <div className="ml-[74px] flex h-full flex-col justify-center py-[58px] pl-[70px] pr-[70px]">
        <h2 className="mb-7 text-[24px] font-normal uppercase leading-tight text-cream">
          {service.title}
        </h2>
        {service.paragraphs.length > 0 && (
          <div className="services-drawer-scroll max-h-[205px] overflow-y-auto pr-6 text-[18px] font-light leading-[1.45]">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <Link
          href={service.href}
          prefetch={false}
          className="mt-8 inline-flex min-h-[70px] items-center justify-center rounded-[20px] border-4 border-cream px-5 pb-0.5 pt-1 text-center text-[22px] font-light uppercase leading-[1.1] transition-colors hover:bg-cream hover:text-navy"
        >
          View Gallery
        </Link>
      </div>
    </div>
  );
}

function DesktopServicePanel({ service }: { service: ServicesPageItem }) {
  const [open, setOpen] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const followRef = useRef<HTMLAnchorElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const enterTimerRef = useRef<number | null>(null);

  const clearEnterTimer = () => {
    if (enterTimerRef.current !== null) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const drawerRect = drawerRef.current?.getBoundingClientRect();
    if (
      drawerRect &&
      event.clientX >= drawerRect.left &&
      event.clientX <= drawerRect.right &&
      event.clientY >= drawerRect.top &&
      event.clientY <= drawerRect.bottom
    ) {
      clearEnterTimer();
      setCursorActive(false);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    window.setTimeout(() => {
      if (followRef.current) {
        followRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, 50);
  };

  const handleMouseEnter = () => {
    clearEnterTimer();
    enterTimerRef.current = window.setTimeout(() => {
      setCursorActive(true);
      enterTimerRef.current = null;
    }, 300);
  };

  const handleMouseLeave = () => {
    clearEnterTimer();
    setCursorActive(false);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative hidden h-screen min-h-[780px] scroll-mt-0 overflow-hidden bg-navy lg:block"
    >
      <Link
        href={service.href}
        prefetch={false}
        aria-label={`View gallery for ${service.title}`}
        className="absolute inset-0 z-10 cursor-none"
      />
      <Image
        src={service.image}
        alt={service.alt}
        fill
        loading="lazy"
        quality={70}
        sizes="calc(100vw - 274px)"
        className="object-cover"
      />
      <Link
        ref={followRef}
        href={service.href}
        prefetch={false}
        aria-label={`View gallery for ${service.title}`}
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-30 -ml-[21px] -mt-[21px] hidden h-[42px] w-[42px] items-center justify-center rounded-[41px] bg-navy text-center text-[7px] font-light uppercase leading-none text-white opacity-0 transition-all duration-[2000ms] ease-[cubic-bezier(0.2,1,0.1,1)] after:absolute after:h-[22px] after:w-[22px] after:rounded-full after:border after:border-transparent after:transition-all after:duration-1000 after:content-[''] hover:-ml-[41px] hover:-mt-[41px] hover:h-[82px] hover:w-[82px] hover:text-[14px] hover:after:h-[72px] hover:after:w-[72px] hover:after:border-gold lg:flex",
          cursorActive && "pointer-events-auto opacity-100"
        )}
      >
        VIEW GALLERY
      </Link>
      <ServiceDrawer
        service={service}
        open={open}
        onToggle={() => setOpen((value) => !value)}
        drawerRef={drawerRef}
        onMouseEnter={() => {
          clearEnterTimer();
          setCursorActive(false);
        }}
        onMouseLeave={() => setCursorActive(true)}
      />
    </section>
  );
}

function MobileServicePanel({ service }: { service: ServicesPageItem }) {
  return (
    <section className="bg-navy text-cream lg:hidden">
      <div className="kp-reveal relative aspect-[4/3] w-full overflow-hidden bg-navy" data-reveal="zoom">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent" />
      </div>
      <div className="kp-reveal px-[30px] py-7 text-left" data-reveal="up" data-reveal-delay="1">
        <h2 className="mb-4 text-[26px] font-semibold uppercase leading-[1.3]">
          {service.title}
        </h2>
        {service.paragraphs.length > 0 && (
          <div className="mb-7 text-[14px] font-light leading-normal">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <Link
          href={service.href}
          prefetch={false}
          className="flex h-[46px] w-full items-center justify-center rounded-[15px] border-2 border-cream px-[15px] pb-0.5 pt-1 text-center text-[15px] font-light uppercase leading-[1.1] transition-colors hover:bg-cream hover:text-navy"
        >
          View Gallery
        </Link>
      </div>
    </section>
  );
}

export function ServicesPage() {
  const [activeId, setActiveId] = useState("section-overview");
  const rootRef = useRef<HTMLElement | null>(null);
  const snappingRef = useRef(false);

  useEffect(() => {
    const sections = [
      document.getElementById("section-overview"),
      ...servicesPageItems.map((service) => document.getElementById(`link-${service.id}`)),
    ].filter((section): section is HTMLElement => Boolean(section));

    const onScroll = () => {
      const midpoint = window.scrollY + window.innerHeight / 2;
      const active = sections.findLast((section) => section.offsetTop <= midpoint);
      setActiveId(active?.id ?? "section-overview");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let animationFrame: number | null = null;

    const easeInOutExpo = (progress: number) => {
      if (progress === 0 || progress === 1) {
        return progress;
      }

      return progress < 0.5
        ? Math.pow(2, 20 * progress - 10) / 2
        : (2 - Math.pow(2, -20 * progress + 10)) / 2;
    };

    const getDesktopSections = () =>
      [
        document.getElementById("section-overview"),
        ...servicesPageItems.map((service) => document.getElementById(`link-${service.id}`)),
      ].filter((section): section is HTMLElement => Boolean(section));

    const animateTo = (targetTop: number) => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      const startTime = window.performance.now();
      snappingRef.current = true;
      root.style.scrollBehavior = "auto";

      const tick = (time: number) => {
        const progress = Math.min((time - startTime) / 1000, 1);
        window.scrollTo(0, startTop + distance * easeInOutExpo(progress));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick);
          return;
        }

        window.scrollTo(0, targetTop);
        window.setTimeout(() => {
          snappingRef.current = false;
          root.style.scrollBehavior = previousScrollBehavior;
        }, 40);
      };

      animationFrame = window.requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 980 || !rootRef.current) {
        return;
      }

      const targetNode = event.target instanceof Node ? event.target : null;
      if (!targetNode || !rootRef.current.contains(targetNode)) {
        const targetIsPageShell =
          event.target === document.body || event.target === document.documentElement;

        if (!targetIsPageShell) {
          return;
        }
      }

      if (
        event.target instanceof Element &&
        event.target.closest(".services-drawer-scroll")
      ) {
        return;
      }

      if (snappingRef.current) {
        event.preventDefault();
        return;
      }

      if (Math.abs(event.deltaY) < 10) {
        return;
      }

      const sections = getDesktopSections();
      const midpoint = window.scrollY + window.innerHeight / 2;
      const currentIndex = sections.findLastIndex((section) => section.offsetTop <= midpoint);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = Math.max(
        0,
        Math.min(sections.length - 1, safeIndex + (event.deltaY > 0 ? 1 : -1))
      );

      if (nextIndex === safeIndex) {
        return;
      }

      event.preventDefault();
      animateTo(sections[nextIndex].offsetTop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <main ref={rootRef} className="bg-cream pt-[82px] lg:pt-0">
      <div className="lg:grid lg:grid-cols-[274px_minmax(0,1fr)]">
        <ServicesSideNav activeId={activeId} />

        <div className="min-w-0">
          <section
            id="section-overview"
            className="relative flex h-screen min-h-[620px] scroll-mt-0 items-center justify-center overflow-hidden bg-navy px-6 text-center text-cream max-lg:h-auto max-lg:min-h-[520px] max-lg:pt-10"
          >
            <Image
              src="/images/nora-services-overview.jpg"
              alt=""
              fill
              preload
              quality={70}
              sizes="100vw"
              className="kp-hero-slide object-cover object-[center_65%]"
            />
            <div className="absolute inset-0 bg-navy/62" />
            <div className="kp-reveal relative z-[1] max-w-[960px]" data-reveal="soft">
              <h1 className="mb-[30px] text-[clamp(2rem,4vw,3.625rem)] font-semibold uppercase leading-[1.3]">
                Services
              </h1>
              <h2 className="mx-auto mb-[30px] max-w-[960px] text-[clamp(1.3rem,2.65vw,2.375rem)] font-normal leading-[1.3]">
                Whatever you&rsquo;re celebrating or building, the goal&rsquo;s the same
                photos that feel like you, and work hard wherever you use them.
              </h2>
              <p className="mx-auto max-w-[620px] text-[16px] font-light leading-[1.6] max-sm:text-[12px]">
                From weddings, birthdays and family sessions to headshots, products and events,
                here&rsquo;s everything I photograph across Perth each one with relaxed
                direction and a beautifully finished gallery.
              </p>
              <a
                href="#link-event-photography"
                className="mt-8 inline-flex flex-col items-center gap-2 text-[13px] font-light uppercase tracking-[0.15em] text-cream transition-colors hover:text-gold"
              >
                Scroll to browse
                <span className="flex flex-col items-center text-gold">
                  <ScrollChevronIcon className="h-auto w-6 animate-scroll-nudge" />
                  <ScrollChevronIcon className="-mt-1 h-auto w-6 animate-scroll-nudge [animation-delay:0.18s]" />
                </span>
              </a>
            </div>
          </section>

          {/* One anchor wrapper per service so `#link-*` hashes land on the
              visible panel at every viewport (the desktop panel is hidden on
              mobile and vice versa). On desktop the negative scroll margin
              cancels the global 96px scroll-padding so full-screen panels land
              flush, matching the wheel-snap position. */}
          {servicesPageItems.map((service) => (
            <div
              key={service.id}
              id={`link-${service.id}`}
              className="lg:-scroll-mt-24"
            >
              <DesktopServicePanel service={service} />
              <MobileServicePanel service={service} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
