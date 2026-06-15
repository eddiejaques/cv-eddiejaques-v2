export interface ResumeContact {
  name: string;
  title: string;
  location: string;
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
}

export interface ResumeExperience {
  organization: string;
  role: string;
  dates: string;       // e.g. "2022 — Present"
  location: string;
  bullets: string[];   // Each bullet leads with a metric or outcome
}

export interface ResumeEducation {
  school: string;
  degree: string;
  gradDate: string;
}

export interface ResumeSkillCategory {
  category: string;    // e.g. "Product Strategy", "AI & ML"
  skills: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  contact: ResumeContact;
  summary: string;                  // Executive summary, ~2 sentences
  coreCompetencies: string[];
  experience: ResumeExperience[];   // Reverse-chronological
  education: ResumeEducation[];
  skills: ResumeSkillCategory[];
  certifications?: ResumeCertification[];
}
