import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CaseStudy } from '../types/CaseStudy';
import Card from './Card';
import Metrics from './Metrics';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const [hovered, setHovered] = useState(false);
  const metric = caseStudy.keyMetrics[0];

  return (
    <Link
      to={`/case-studies/${caseStudy.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block"
    >
      <Card className={`h-full transition-colors duration-300 ${hovered ? 'border-accent' : ''}`}>
        <div className="font-mono text-[11px] uppercase text-accent mb-3">
          {caseStudy.category} · {caseStudy.experienceStage}
        </div>
        <h3 className="font-display font-semibold text-[22px] text-ink mb-2">{caseStudy.title}</h3>
        <p className="font-body text-[15px] text-muted line-clamp-3 mb-4">{caseStudy.description}</p>
        <span className="font-body font-semibold text-sm text-accent">Read full case</span>

        {metric && (
          <div className="mt-4 max-[759px]:[&>div]:!opacity-100 max-[759px]:[&>div]:!translate-x-0">
            <Metrics metrics={[metric]} variant="inline" visible={hovered} />
          </div>
        )}
      </Card>
    </Link>
  );
}
