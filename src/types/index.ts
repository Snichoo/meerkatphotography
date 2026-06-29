export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

export interface WorkImage {
  src: string;
  alt: string;
  /** grid span: tall items take 2 rows */
  tall?: boolean;
}

export interface ProcessStep {
  title: string;
  label?: string;
  body: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface Faq {
  q: string;
  a: string;
}
