import type { Resume } from '../types/Resume';

export const resumeData: Resume = {
  contact: {
    name: 'Gaurav Kumar Dani',
    title: 'Director / Principal Product Manager — Data Products, AI & Marketing Tech',
    location: 'Munich, Germany',
    email: 'gauravkumar.dani@gmail.com',
    linkedin: 'https://linkly.link/2kPrF',
    github: 'https://github.com/eddiejaques',
  },

  summary:
    'Product leader with 14+ years across engineering, analytics, and product management. Progressed Senior PM → Lead PM → Director at Seven.One Entertainment over the last 5 years, shipping AI, data platform, and marketing tech products across DACH; delivered $400K+ in martech cost savings, >200% CTR uplift via ML recommendations, and 25% ROAS improvement on programmatic.',

  coreCompetencies: [
    'AI Product Strategy',
    'Data Platform Architecture',
    'Marketing Technology',
    'Experimentation & Causal Inference',
    'LLM & Agentic Systems',
    'Customer Data Platforms',
    'Audience Activation & Segmentation',
    '0→1 Product Build',
    'Recommendation Systems',
    'Conversational AI',
    'Privacy & Compliance (GDPR, TTDSG)',
    'Programmatic Advertising',
    'Attribution Modelling',
    'Data Governance',
    'Vendor & Budget Management',
    'Stakeholder Management',
    'Cost Optimisation',
    'Product Analytics',
    'Go-To-Market Strategy',
  ],

  experience: [
    {
      organization: 'Seven.One Entertainment Group — Munich, Germany',
      role: 'Director, Data Platforms & AI Products, Marketing Tech (progressed: Senior PM → Lead PM → Director)',
      dates: 'Jan 2021 — Present',
      location: 'Munich, Germany',
      bullets: [
        'Avoided $1M+ in three-year data costs ($700K Year 1, $350K/yr ongoing) by re-architecting Joyn\'s event tracking pipeline into a governed, agent-operated platform — 100% schema compliance across 144M+ monthly events.',
        'Lifted CTR >200% (5% → 25% over three years) with an ML-driven content recommendation engine targeting low-activation user cohorts.',
        'Lifted net CTR ~22% and cut zero-result queries 30% by improving Joyn search relevance through first-party behavioural signal integration and recommendation reranking.',
        'Lifted ROAS 25% across DACH leading an ML-based audience segmentation product for programmatic advertising (Audiences Initiative).',
        'Migrated subscription infrastructure to Stripe Billing/Billwerk for 700K active subscribers (€4.9M ARR) — cut billing support tickets 72% and recaptured €220K in involuntary churn.',
        'Launched a consent management platform across DACH with 90%+ opt-in rates and 100% GDPR/TTDSG compliance; shipped cookie-less personalisation with ~50% known-user match rates.',
        'Grew reach 2.5M MAUs via B2B distribution partnerships with Telekom, Sky, and Waipu; boosted top-of-funnel conversion 24% via recommendations and progressive profiling.',
        'Drove adoption of an integrated product analytics stack (Mixpanel, Adjust, Exactag) across 20M MAUs, cutting vendor analytics costs 70% via a redesigned sampled-tracking pipeline.',
        'Shipped 0→1 agentic AI workflows for customer service operations — $90K annual savings; launched an AI content-discovery chat agent reaching 100K users in 3 months.',
        'Authored a 5-level Marketing Data Maturity Framework (Signal Integrity → Autonomous Agents), adopted as the internal company marketing data strategy and published on LinkedIn.',
      ],
    },
    {
      organization: 'Optum Global Solutions (UnitedHealth Group) — New Delhi, India',
      role: 'Analytics Manager',
      dates: 'Jun 2018 — Dec 2020',
      location: 'New Delhi, India',
      bullets: [
        'Led data collection migration across 35 digital assets, enabling a new business unit launch with an estimated $600K revenue impact.',
        'Ran 50+ A/B tests delivering an average 47% engagement uplift through experimentation and statistical analysis.',
        'Designed the measurement strategy for now.optum.com using the AIDA funnel framework, improving attribution insight quality and reporting reliability.',
        'Built executive dashboards and CRM data sync, managing data enablement products to speed insight generation across business units.',
      ],
    },
    {
      organization: 'Vodafone Group Services — Pune, India',
      role: 'Assistant Manager, Digital Analytics',
      dates: 'Dec 2016 — Jan 2018',
      location: 'Pune, India',
      bullets: [
        'Migrated the measurement solution to Tealium CDP, lifting KPI accuracy and data quality 10% via tag management.',
        'Built digital analytics governance for e-commerce, mobile apps, and personalisation across Vodafone India.',
        'Trained engineering teams in Egypt on measurement and experimentation, enabling analytics on the Vodafone UK self-service app.',
      ],
    },
    {
      organization: 'eClerx Services Ltd. — Mumbai, India',
      role: 'Senior Process Manager',
      dates: 'May 2013 — Dec 2016',
      location: 'Mumbai, India',
      bullets: [
        'Scaled the tax operations team from 12 to 150 FTEs for Fortune 500 financial services clients, building internal 1099 reporting and compliance expertise.',
        'Led digital analytics for the banking and financial services vertical, enabling credit card application funnel reporting and conversion optimisation.',
      ],
    },
  ],

  education: [
    {
      school: 'European Higher Education Institute — Malta',
      degree: 'MSc. Data Science and Artificial Intelligence',
      gradDate: 'Expected 2027',
    },
    {
      school: 'Goa Institute of Management — India',
      degree: 'Post Graduate Diploma in General Management (MBA equivalent)',
      gradDate: '2013',
    },
    {
      school: 'Guru Gobind Singh Indraprastha University — India',
      degree: 'Bachelor of Technology, Computer Science Engineering',
      gradDate: '2008',
    },
  ],

  skills: [
    {
      category: 'Product Management',
      skills: [
        'Product Strategy & Roadmapping',
        'OKRs',
        'A/B Testing & Experimentation',
        'User Research',
        'Stakeholder Management',
        'Agile/Scrum',
        'Go-to-Market Strategy',
      ],
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        'AI Agents',
        'RAG (Retrieval-Augmented Generation)',
        'Recommendation Systems',
        'ML-driven Content Discovery',
        'Predictive Analytics',
        'Personalisation Engines',
        'LLM Evaluation',
        'Prompt Engineering',
        'AI Governance',
      ],
    },
    {
      category: 'Analytics & Data Engineering',
      skills: [
        'Google Analytics',
        'Adobe Analytics',
        'Mixpanel',
        'Segment',
        'Tealium',
        'SQL',
        'Python',
        'Data Modeling',
        'ETL/ELT',
        'Data Pipelines',
        'CDPs',
        'Snowflake',
      ],
    },
    {
      category: 'Ad-Tech & Marketing',
      skills: [
        'Adjust',
        'Exactag',
        'Braze',
        'Marketo',
        'Eloqua',
        'Liveramp',
        'Programmatic Advertising',
        'Attribution Modelling',
        'ROAS Optimisation',
        'Google Ads API',
      ],
    },
    {
      category: 'Privacy & Compliance',
      skills: [
        'GDPR',
        'CCPA',
        'TTDSG',
        'IAB-TCF',
        'Consent Management Platforms',
        'Data Governance',
        'Privacy-by-Design',
        'Data Clean Rooms',
      ],
    },
  ],

  certifications: [
    {
      name: 'Google Cloud Generative AI Leader',
      issuer: 'Google Cloud',
      date: '2026',
    },
    {
      name: 'GA4',
      issuer: 'Google',
      date: '',
    },
    {
      name: 'Adobe Target',
      issuer: 'Adobe',
      date: '',
    },
  ],
};
