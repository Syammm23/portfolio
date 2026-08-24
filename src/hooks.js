import { useState, useEffect, useRef } from "react";

/* Whole months between two dates (end defaults to today). Never below 1. */
export function monthsBetween(start, end = null) {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  let months = (to.getFullYear() - from.getFullYear()) * 12;
  months += to.getMonth() - from.getMonth();
  if (to.getDate() < from.getDate()) months -= 1;
  return Math.max(1, months);
}

/* "10 mos" / "1 yr 4 mos" — used on experience cards and the stats row. */
export function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mo${rest === 1 ? "" : "s"}`;
  if (rest === 0) return `${years} yr${years === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"} ${rest} mo${rest === 1 ? "" : "s"}`;
}

/* Recomputes on mount so durations stay correct without a redeploy. */
export function useExperienceTotals(experience) {
  const [totals, setTotals] = useState(() => compute(experience));
  useEffect(() => { setTotals(compute(experience)); }, [experience]);
  return totals;
}

function compute(experience) {
  const durations = experience.map((job) => monthsBetween(job.start, job.end));
  const total = totalUniqueMonths(experience);
  return { durations, totalMonths: total, totalLabel: formatDuration(total) };
}

/* Concurrent roles (e.g. Telus + Welocalize at the same time) must not be
   added together, or the headline total inflates. Merge overlapping date
   ranges first, then measure the union. */
function totalUniqueMonths(experience) {
  const ranges = experience
    .map((job) => ({
      start: new Date(job.start),
      end: job.end ? new Date(job.end) : new Date(),
    }))
    .sort((a, b) => a.start - b.start);

  const merged = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      if (range.end > last.end) last.end = range.end;
    } else {
      merged.push({ ...range });
    }
  }

  return merged.reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);
}

/* Highlights the nav item for whichever section owns the viewport. */
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      // Snap to the last section once the page bottom is reached, so a short
      // final section still highlights. scrollHeight on documentElement is
      // reliable even when body picks up margins.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}

/* Adds .is-visible to [data-reveal] elements as they enter the viewport. */
export function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    nodes.forEach((n) => observer.observe(n));

    // Safety net: a backgrounded tab never fires IntersectionObserver, so a
    // page restored from the background could stay permanently invisible.
    // Force everything visible if the observer has not reported by then.
    const failsafe = setTimeout(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    }, 2500);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);
}



/* Cycles through profile.roles for the hero type-out effect. */
export function useRotatingText(words, hold = 1900, speed = 62) {
  const [text, setText] = useState(words[0] || "");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer;

    if (phase === "hold") {
      timer = setTimeout(() => setPhase("deleting"), hold);
    } else if (phase === "deleting") {
      timer = setTimeout(() => {
        setText((t) => {
          if (t.length <= 1) {
            setPhase("typing");
            setIndex((i) => (i + 1) % words.length);
            return "";
          }
          return t.slice(0, -1);
        });
      }, speed / 2);
    } else {
      const next = words[index % words.length];
      timer = setTimeout(() => {
        setText((t) => {
          if (t.length >= next.length) {
            setPhase("hold");
            return next;
          }
          return next.slice(0, t.length + 1);
        });
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [words, index, phase, hold, speed, text]);

  return text;
}

/* Writes --mx/--my on a card so CSS can draw a glow that follows the cursor. */
export function useSpotlight() {
  return (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };
}

/* Drives the thin progress bar pinned to the top of the page. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/* Soft light that trails the pointer. Writes CSS vars on <html> so moving the
   mouse never triggers a React render. Skipped on touch and reduced motion. */
export function useCursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let frame = null;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = null;
      root.style.setProperty("--cx", `${x}px`);
      root.style.setProperty("--cy", `${y}px`);
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      root.classList.add("has-cursor");
      if (frame === null) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame !== null) cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
    };
  }, []);
}

/* Card hover effects: the pointer-tracking spotlight plus a subtle 3D tilt.
   Returns props to spread onto a card. Tilt is skipped on touch devices,
   where hover does not exist and the transform would stick. */
export function useCardFx(maxTilt = 5) {
  const coarse = () => window.matchMedia("(pointer: coarse)").matches;

  const onPointerMove = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    el.style.setProperty("--mx", `${localX}px`);
    el.style.setProperty("--my", `${localY}px`);

    if (coarse()) return;
    const px = localX / rect.width - 0.5;
    const py = localY / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * maxTilt).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * maxTilt).toFixed(2)}deg`);
  };

  const onPointerLeave = (event) => {
    const el = event.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return { onPointerMove, onPointerLeave };
}

/* Counts a numeric value up once it scrolls into view. Keeps any non-numeric
   suffix intact, so "7+" animates to 7 and still renders the plus. */
export function useCountUp(raw, duration = 1200) {
  /* Only a bare number with a short suffix is worth animating — "5th", "7+",
     "4". A composite like "1 yr 11 mos" would count a single step and read as
     a glitch, so the space rules it out and it renders unchanged. */
  const match = String(raw).match(/^(\d+)([+a-z]{0,3})$/i);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  /* Resolved lazily rather than in an effect: a non-numeric value or a
     reduced-motion preference means there is nothing to animate, so the
     final text is the correct first render and no extra pass is needed. */
  const [display, setDisplay] = useState(() => {
    if (target === null) return raw;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return `${target}${suffix}`;
    }
    return `0${suffix}`;
  });
  const ref = useRef(null);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const tick = (now) => {
          const p = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    /* These are real figures, not decoration. If the observer never reports —
       a restored background tab, an old browser — the card would sit on "0"
       and show wrong data, so snap to the true value after a short grace. */
    const failsafe = setTimeout(() => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      setDisplay(`${target}${suffix}`);
    }, 2500);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [raw, target, suffix, duration]);

  return [display, ref];
}

/* Fills the timeline rail from 0 to 1 as the section passes the viewport. */
export function useScrollFill(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = null;
    const measure = () => {
      frame = null;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.72;
      const progress = (anchor - rect.top) / rect.height;
      el.style.setProperty("--fill", Math.min(Math.max(progress, 0), 1).toFixed(3));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
