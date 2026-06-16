import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function splitTitleWords(element: HTMLElement) {
  if (element.querySelector('[data-gsap-title-word]')) {
    return () => undefined;
  }

  const originalText = element.textContent?.trim();

  if (!originalText) {
    return () => undefined;
  }

  element.setAttribute('aria-label', originalText);
  element.textContent = '';

  const fragment = document.createDocumentFragment();
  const words = originalText.split(/\s+/);

  words.forEach((word, index) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'gsap-title-word-wrap';
    wrapper.setAttribute('aria-hidden', 'true');

    const inner = document.createElement('span');
    inner.className = 'gsap-title-word';
    inner.dataset.gsapTitleWord = '';
    inner.textContent = word;

    wrapper.appendChild(inner);
    fragment.appendChild(wrapper);

    if (index < words.length - 1) {
      fragment.appendChild(document.createTextNode(' '));
    }
  });

  element.appendChild(fragment);

  return () => {
    element.textContent = originalText;
    element.removeAttribute('aria-label');
  };
}

export default function GsapScrollEffects() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return;
    }

    const titleElements = gsap.utils.toArray<HTMLElement>('[data-gsap-title]');
    const maskElements = gsap.utils.toArray<HTMLElement>('[data-gsap-mask]');
    const parallaxElements = gsap.utils.toArray<HTMLElement>('[data-gsap-parallax]');
    const progressBar = scopeRef.current?.querySelector<HTMLElement>('[data-gsap-scroll-progress]');
    const titleRestorers = titleElements.map(splitTitleWords);

    titleElements.forEach((title) => {
      const words = title.querySelectorAll<HTMLElement>('[data-gsap-title-word]');

      if (!words.length) {
        return;
      }

      gsap.set(title, { perspective: 900 });
      gsap.set(words, {
        autoAlpha: 0,
        rotateX: 42,
        transformOrigin: '50% 100%',
        yPercent: 110,
      });

      gsap.to(words, {
        autoAlpha: 1,
        duration: 0.95,
        ease: 'power3.out',
        rotateX: 0,
        stagger: 0.055,
        yPercent: 0,
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      });
    });

    maskElements.forEach((element, index) => {
      const fromLeft = index % 2 === 0;

      gsap.set(element, {
        autoAlpha: 1,
        clipPath: fromLeft ? 'inset(0 18% 0 0)' : 'inset(0 0 0 18%)',
        x: fromLeft ? -20 : 20,
        willChange: 'clip-path, transform, opacity',
      });

      gsap.to(element, {
        autoAlpha: 1,
        clipPath: 'inset(0 0 0 0)',
        duration: 0.55,
        ease: 'power3.out',
        x: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          once: true,
          toggleActions: 'play none none none',
        },
      });
    });

    parallaxElements.forEach((element) => {
      const speed = Number(element.dataset.gsapParallax) || 18;

      gsap.set(element, {
        scale: 1.08,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      gsap.fromTo(
        element,
        { yPercent: -speed },
        {
          ease: 'none',
          yPercent: speed,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        },
      );
    });

    if (progressBar) {
      gsap.set(progressBar, { scaleY: 0, transformOrigin: '50% 0%' });

      gsap.to(progressBar, {
        ease: 'none',
        scaleY: 1,
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.4,
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      titleRestorers.forEach((restore) => restore());
    };
  });

  return (
    <div ref={scopeRef} aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-0 z-[70] flex items-center px-2 sm:px-3">
      <div className="h-28 w-1 overflow-hidden rounded-full bg-brand-petrol/10 backdrop-blur-sm sm:h-44 sm:w-1.5">
        <div data-gsap-scroll-progress className="h-full w-full rounded-full bg-brand-yellow shadow-[0_0_18px_rgba(255,92,0,0.48)]" />
      </div>
    </div>
  );
}
