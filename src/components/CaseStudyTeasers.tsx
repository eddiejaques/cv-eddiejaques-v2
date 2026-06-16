import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';
import type { CaseStudy } from '../types/CaseStudy';

const ROTATE_MS = 20_000;
const PER_GROUP = 3;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Fisher–Yates — fresh order each visit so the lane feels alive.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CaseStudyTeasers() {
  // Build rotating trios from every case study that has conversion copy.
  const groups = useMemo(() => {
    const featured = shuffle(caseStudies.filter((c): c is CaseStudy & { teaser: string } => !!c.teaser));
    const full = chunk(featured, PER_GROUP).filter((g) => g.length === PER_GROUP);
    return full.length ? full : [featured];
  }, []);

  const [groupIndex, setGroupIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate to another trio every 20s unless the visitor is hovering.
  useEffect(() => {
    if (paused || groups.length < 2) return;
    const id = window.setTimeout(
      () => setGroupIndex((i) => (i + 1) % groups.length),
      ROTATE_MS,
    );
    return () => window.clearTimeout(id);
  }, [groupIndex, paused, groups.length]);

  const current = groups[groupIndex] ?? [];
  // Remounts the countdown bar each cycle so its CSS animation restarts.
  const cycleKey = `${groupIndex}-${paused}`;

  return (
    <section
      className="relative w-full max-w-6xl mx-auto px-6 md:px-10 py-24"
      aria-label="Featured case studies"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-6 flex-wrap mb-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full bg-accent"
              style={{ boxShadow: '0 0 12px 2px rgba(198,249,78,0.6)' }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Where do I start?
            </p>
          </div>
          <h2 className="font-display font-semibold text-ink text-[clamp(1.8rem,4vw,3rem)] leading-[1.02]">
            Pick a problem. I&apos;ll show you{' '}
            <span className="italic text-accent" style={{ fontVariationSettings: '"SOFT" 8, "opsz" 96' }}>
              how I solved it.
            </span>
          </h2>
        </div>
        <Link
          to="/case-studies"
          className="group font-body text-sm text-ink relative whitespace-nowrap"
        >
          See all case studies
          <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      {/* 20s countdown bar — visual cue that the trio will refresh */}
      <div className="h-px w-full bg-border mb-10 overflow-hidden" aria-hidden>
        {!paused && groups.length > 1 && (
          <div key={cycleKey} className="ej-countdown-fill h-full bg-accent/60" />
        )}
      </div>

      {/* The trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {current.map((cs, i) => {
          const metric = cs.keyMetrics[0];
          return (
            <Link
              key={`${groupIndex}-${cs.slug}`}
              to={`/case-studies/${cs.slug}`}
              className="ej-teaser ej-teaser-breathe group relative flex flex-col justify-between rounded-DEFAULT border border-border bg-surface p-7 transition-colors duration-200 hover:border-accent focus-visible:border-accent focus-visible:outline-none"
              style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'forwards' }}
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mb-5">
                  {cs.category} · {cs.experienceStage}
                </div>
                {/* Conversion-optimized question */}
                <p className="font-display font-semibold text-ink text-[1.45rem] leading-snug">
                  {cs.teaser}
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4">
                {metric && (
                  <div>
                    <div className="font-display font-bold text-ink text-[2rem] leading-none tabular-nums">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint mt-2">
                      {metric.label}
                    </div>
                  </div>
                )}
                <span className="font-body font-semibold text-sm text-accent inline-flex items-center gap-1.5 whitespace-nowrap">
                  See how
                  <span className="ej-teaser-arrow inline-block">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
