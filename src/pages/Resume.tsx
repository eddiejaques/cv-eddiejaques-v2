import { resumeData } from '../data/resume';
import Button from '../components/Button';
import SEO from '../components/SEO';

export default function Resume() {
  const { contact, summary, coreCompetencies, experience, education, skills, certifications } = resumeData;

  return (
    <main className="px-6 py-16 max-w-[760px] mx-auto">
      <SEO title="Resume" description={summary} path="/resume" />
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-ink text-[32px]">{contact.name}</h1>
          <p className="font-display font-semibold text-ink text-lg mt-1">{contact.title}</p>
          <p className="font-body text-xs text-muted mt-3 flex flex-wrap gap-x-2">
            <span>{contact.location}</span>
            <span>| {contact.email}</span>
          </p>
          <p className="font-body text-xs mt-2 flex flex-wrap gap-x-4">
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                LinkedIn
              </a>
            )}
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                GitHub
              </a>
            )}
          </p>
        </div>
        <Button as="button" variant="secondary" className="print:hidden" onClick={() => window.print()}>
          Print / Save PDF
        </Button>
      </div>

      <section className="mt-10">
        <p className="font-body text-[15px] text-muted leading-relaxed">{summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display font-semibold text-lg text-ink mb-3">Core Competencies</h2>
        <p className="font-body font-medium text-[13px] text-muted leading-relaxed">
          {coreCompetencies.join(' · ')}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Professional Experience</h2>
        <div className="flex flex-col gap-8">
          {experience.map((entry) => (
            <div key={`${entry.organization}-${entry.dates}`}>
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <h3 className="font-display font-semibold text-lg text-ink">{entry.organization}</h3>
                <span className="font-mono text-xs text-muted whitespace-nowrap">{entry.dates}</span>
              </div>
              <p className="font-body text-sm text-muted mt-1">{entry.role}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="font-body text-sm text-ink leading-[1.55] pl-4 relative">
                    <span className="absolute left-0 text-accent">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Education</h2>
        <div className="flex flex-col gap-3">
          {education.map((edu) => (
            <div key={edu.school} className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <h3 className="font-display font-semibold text-base text-ink">{edu.school}</h3>
                <p className="font-body text-sm text-muted">{edu.degree}</p>
              </div>
              <span className="font-mono text-xs text-muted whitespace-nowrap">{edu.gradDate}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display font-semibold text-lg text-ink mb-4">Skills</h2>
        <div className="flex flex-col gap-3">
          {skills.map((group) => (
            <div key={group.category}>
              <div className="font-mono text-xs uppercase text-accent">{group.category}</div>
              <p className="font-body text-[13px] text-muted mt-1">{group.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">Certifications</h2>
          <div className="flex flex-col gap-2">
            {certifications.map((cert) => (
              <p key={cert.name} className="font-body text-sm text-ink">
                {cert.name}
                {cert.issuer && ` | ${cert.issuer}`}
                {cert.date && ` | ${cert.date}`}
              </p>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
