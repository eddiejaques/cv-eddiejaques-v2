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
    'Product leader with 14+ years across engineering, analytics, and product management. Promoted from Senior PM to Lead PM and Director at Seven.One Entertainment over the last five years, building AI, data platform, and marketing tech products across DACH. Track record includes $1M+ in avoided data infrastructure costs, a 3x lift in recommendation CTR, and a 25% ROAS improvement on programmatic spend.',

  coreCompetencies: [
    'AI Product Strategy',
    'Data Platform Architecture',
    'Marketing Technology',
    'Experimentation & Causal Inference',
    'LLM & Agentic Systems',
    'Customer Data Platforms',
    'Audience Activation & Segmentation',
    '0-to-1 Product Build',
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
      role: 'Director, Data Platforms & AI Products, Marketing Tech (promoted from Senior PM and Lead PM)',
      dates: 'Jan 2021 — Present',
      location: 'Munich, Germany',
      bullets: [
        'Saved $1M+ over three years ($700K in Year 1 and $350K/yr ongoing) by rebuilding Joyn\'s event tracking pipeline into a governed, agent-assisted platform with 100% schema compliance across 144M+ monthly events.',
        'Grew recommendation lane CTR from 5% to 15% (+200% relative lift, reaching 25% on personalized cohorts) by replacing a third-party black-box vendor with an in-house ML recommendation engine.',
        'Lifted net search CTR by ~22% and reduced zero-result queries by 30% by feeding first-party watch signals into Algolia ranking and adding recommendation fallbacks.',
        'Improved programmatic ROAS by 25% across DACH by building a warehouse-native audience segmentation product on Snowflake, dbt, and Hightouch.',
        'Migrated subscription billing to Stripe Billing and Billwerk for 700K active subscribers (€4.9M ARR), cutting billing support tickets by 72% and recovering €220K in involuntary churn.',
        'Rolled out a consent management platform across DACH with 90%+ opt-in rates under GDPR and TTDSG, alongside cookieless personalisation matching ~50% of known users.',
        'Added 2.5M MAUs through B2B distribution integrations with Telekom, Sky, and Waipu, and lifted top-of-funnel conversion by 24% using progressive profiling.',
        'Consolidated the product analytics stack (Mixpanel, Adjust, Exactag) across 20M MAUs and reduced vendor analytics spend by 70% with sampled tracking.',
        'Built agentic AI workflows for customer service and research operations ($90K annual savings) and launched a conversational content-discovery assistant that reached 100K users in its first four months.',
        'Created a 5-stage Marketing Data Maturity Framework that was adopted as the group\'s internal marketing data strategy.',
      ],
    },
    {
      organization: 'Optum Global Solutions (UnitedHealth Group) — New Delhi, India',
      role: 'Analytics Manager',
      dates: 'Jun 2018 — Dec 2020',
      location: 'New Delhi, India',
      bullets: [
        'Migrated tag management and data collection across 40+ digital properties to Adobe Experience Platform Launch with zero reporting downtime, supporting a new business unit launch worth $600K in early revenue.',
        'Ran 120+ A/B and multivariate tests across two years, driving an average 47% engagement lift on winning experiments.',
        'Built the measurement framework and executive dashboards for now.optum.com and Optum Store, aligning product, category, and marketing teams on shared weekly KPIs.',
        'Implemented server-side data collection and identity analytics for HealthSafe ID across 60M healthcare users.',
      ],
    },
    {
      organization: 'Vodafone Group Services — Pune, India',
      role: 'Assistant Manager, Digital Analytics',
      dates: 'Dec 2016 — Jan 2018',
      location: 'Pune, India',
      bullets: [
        'Migrated web and app tracking to Tealium CDP and Adobe Analytics, correcting a 30-40% inflation bug in legacy app penetration numbers.',
        'Diagnosed a checkout redirect-loop timeout after an iPhone launch that had dropped conversion to 9.0%, restoring conversion to 10.7% and recovering $15M in revenue.',
        'Worked on-site in Cairo with Vodafone\'s mobile engineering team to ship clean telemetry and experimentation on the self-service app.',
      ],
    },
    {
      organization: 'eClerx Services Ltd. — Mumbai, India',
      role: 'Senior Process Manager',
      dates: 'May 2013 — Dec 2016',
      location: 'Mumbai, India',
      bullets: [
        'Grew the tax operations team from 12 to 150 FTEs for Fortune 500 financial services clients, handling 1099 reporting and compliance.',
        'Led digital analytics for the banking and financial services vertical, focusing on credit card application funnels and conversion rate optimization.',
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
