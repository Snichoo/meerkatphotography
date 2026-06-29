"use client";

import { useEffect } from "react";

const revealSelector = ".kp-reveal";
const visibleClass = "is-visible";

function isInInitialViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
}

export function RevealOnScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveal = (element: Element) => element.classList.add(visibleClass);
    const shouldRevealImmediately = (element: Element) =>
      reducedMotion.matches || isInInitialViewport(element);

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            reveal(entry.target);
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.16,
        }
      );
    }

    const observeElement = (element: Element) => {
      if (element.classList.contains(visibleClass)) {
        return;
      }

      if (!observer || shouldRevealImmediately(element)) {
        reveal(element);
        return;
      }

      observer.observe(element);
    };

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll(revealSelector).forEach(observeElement);
    };

    document.body.classList.add("kp-reveal-ready");
    scan();

    const mutations = new MutationObserver((entries) => {
      entries.forEach((entry) => {
        entry.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node.matches(revealSelector)) {
            observeElement(node);
          }

          scan(node);
        });
      });
    });

    mutations.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleMotionChange = () => scan();
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      reducedMotion.removeEventListener("change", handleMotionChange);
      mutations.disconnect();
      observer?.disconnect();
      document.body.classList.remove("kp-reveal-ready");
    };
  }, []);

  return null;
}
