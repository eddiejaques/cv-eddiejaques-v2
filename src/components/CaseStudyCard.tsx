import { Link } from 'react-router-dom';
import type { CaseStudy } from '../types/CaseStudy';
import Card from './Card';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const metrics = caseStudy.keyMetrics.slice(0, 2);

  return (
    <Link to={`/case-studies/${caseStudy.slug}`} className="block group">
      <Card className="h-full flex flex-col transition-colors duration-200 group-hover:border-accent">
        {/* Eyebrow */}
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent mb-3">
          {caseStudy.category} · {caseStudy.experienceStage}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-[1.2rem] leading-snug text-ink mb-2">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-muted line-clamp-3 flex-1 mb-5">
          {caseStudy.description}
        </p>

        {/* Metrics row — always visible, inline with divider */}
        {metrics.length > 0 && (
          <div className="flex border-t border-[rgba(13,14,16,0.08)] pt-4 mt-auto">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`flex-1 ${i > 0 ? 'border-l border-[rgba(13,14,16,0.08)] pl-4' : 'pr-4'}`}
              >
                <div className="font-display font-bold text-[1.5rem] leading-none text-ink">
                  {m.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <span className="font-body font-semibold text-xs text-accent mt-4 inline-block">
          Read full case →
        </span>
      </Card>
    </Link>
  );
}
