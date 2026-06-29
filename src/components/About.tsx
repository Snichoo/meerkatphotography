import Image from "next/image";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="kp-container grid items-center gap-14 lg:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-full">
            <Image
              src="/images/nora-about.jpg"
              alt="Nora Wan, Perth commercial photographer"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover object-[center_38%]"
            />
          </div>
        </div>

        <div>
          <h2 className="kp-h2 text-[clamp(1.8rem,4vw,2.8rem)] text-navy">About Me</h2>
          <h3 className="mt-4 text-xl font-light text-navy/80">
            A friendly Perth photographer for people, milestones &amp; brands
          </h3>
          <div className="mt-6 space-y-4 font-light leading-relaxed text-navy/80">
            <p>
              Hi, I&rsquo;m Nora Wan &mdash; a Perth photographer with 15+ years behind the camera
              and a real knack for making people feel at ease in front of it.
            </p>
            <p>
              From weddings, families and birthdays to headshots, products and events, I cover a
              huge range of shoots &mdash; always with relaxed direction, an eye for the genuine
              moments, and galleries you&rsquo;ll actually be proud to share.
            </p>
            <p>
              Based in Perth, I work right across Western Australia and happily travel Australia-wide for
              the right project.
            </p>
          </div>
          <Link href="/about-me" className="kp-btn-outline mt-8 inline-block text-navy hover:bg-navy hover:text-cream">
            Read more about me
          </Link>
        </div>
      </div>
    </section>
  );
}
