"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const revealClasses = [
      ".reveal",
      ".reveal-slide-right",
      ".reveal-slide-left",
      ".reveal-scale",
      ".reveal-clip",
      ".reveal-blur",
      ".reveal-draw",
      ".reveal-draw-center",
    ];

    revealClasses.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);
}