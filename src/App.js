import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Mail, Moon, Sun, ChevronDown, Download, Github, Linkedin } from 'lucide-react';

/* ------------------------------------------------------------------
   EDIT HERE: links + content. Everything below the data is layout.
   Search for "TODO" before publishing.
------------------------------------------------------------------- */

const LINKS = {
  email: 'mailto:a.c.diaz92@gmail.com',
  linkedin: 'https://www.linkedin.com/in/antonio-d-91201b158',
  github: 'https://github.com/antdia4309',
  resume: `${process.env.PUBLIC_URL}/Antonio_Diaz_Resume.pdf`, // TODO: drop your PDF in /public
  photo: 'https://i.imgur.com/LxKSnjR.jpg', // TODO: move to /public/profile.jpg and use `${process.env.PUBLIC_URL}/profile.jpg`
};

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Work', id: 'work' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' },
];

const quickFacts = [
  { value: '10 yrs', label: 'P&C insurance, personal and commercial lines' },
  { value: 'v7, v9, Cloud', label: 'Guidewire BillingCenter and PolicyCenter' },
  { value: 'SQL', label: 'Root cause analysis, reconciliation, regulatory reporting' },
];

// Anonymized case studies. No ticket, deal, or policy numbers.
// TODO: confirm you're comfortable naming internal systems (e2, PRIMIS, GhostDraft).
const caseStudies = [
  {
    title: 'Self-service bulk deal status utility',
    company: 'Markel',
    problem: 'Operations teams had to move deals from Cleared to Inquired one at a time, which was slow and error-prone at volume.',
    action: 'Wrote the requirements for a batch utility that takes a list of deals, with input sanitization and validation guardrails. Tested it end to end and ran the live stakeholder demo.',
    result: 'Delivered and demoed. The team is now scoping an expansion to support more status changes.',
    tags: ['Requirements', 'UAT', 'Stakeholder demo'],
  },
  {
    title: 'Cross-system premium and commission reconciliation',
    company: 'Markel',
    problem: 'Premiums, transactions, fees, and commissions drifted out of sync between policy admin (e2), billing (BillingCenter), and finance (PRIMIS), especially on multi-period policies and mid-term endorsements.',
    action: 'Traced transactions across systems with SQL, isolated where values diverged, coordinated targeted data fixes, and wrote requirements for code fixes that stop the drift at the source.',
    result: 'Root causes documented and fixes moved through dev and QA into scheduled releases.', // TODO: add a number if you have one
    tags: ['SQL', 'Root cause analysis', 'Data fixes'],
  },
  {
    title: 'Regulatory reporting and compliance readiness',
    company: 'Markel',
    problem: 'New state requirements meant new reporting and system changes with hard deadlines.',
    action: 'Built and validated a SQL reporting script for Texas House Bill 2067, including line-of-business mapping. Supported readiness work for the New Jersey PLIGA change effective October 2026.',
    result: 'Reporting logic validated against business rules ahead of the compliance dates.',
    tags: ['SQL', 'Regulatory', 'Validation'],
  },
  {
    title: 'Forms issuance stabilization',
    company: 'Markel',
    problem: 'Underwriters hit "Problem Loading Forms" errors and failed form issuance, which blocked policies from going out.',
    action: 'Ran RCA across e2 and the GhostDraft forms platform, worked with developers to pin down null-data errors, and pushed for a clearer error message as the interim fix while the permanent fix was built.',
    result: 'Users get actionable errors in place of silent failures, and the underlying defects are tracked for permanent fixes.',
    tags: ['Integration troubleshooting', 'RCA', 'Dev partnership'],
  },
];

const projects = [
  {
    title: 'Billing Delinquency Analytics',
    description: 'An Oracle APEX app that analyzes billing delinquency and models forecast scenarios. Built from my years working insurance billing and collections.',
    tags: ['Oracle APEX', 'SQL', 'Data analysis'],
    repo: 'https://github.com/antdia4309/billing-delinquency-analytics',
    live: '', // TODO: paste your public APEX app URL
    image: '', // TODO: optional, e.g. `${process.env.PUBLIC_URL}/apex-screenshot.png`
    featured: true,
  },
  {
    title: 'Park Finder',
    description: 'A React app for finding parks by what you need them for: kids, dogs, or a good walk.',
    tags: ['React', 'JavaScript', 'CSS'],
    repo: 'https://github.com/antdia4309/park-finder',
    live: '',
  },
  {
    title: 'Census CRUD Application',
    description: 'A full-stack MEAN app with an Angular front end, Express API, and MongoDB.',
    tags: ['MongoDB', 'Express', 'Angular', 'Node.js'],
    repo: '', // TODO: link the repo or remove this project
    live: '',
  },
];

const experience = [
  {
    role: 'Business Analyst',
    company: 'Markel Corporation',
    period: 'May 2025 – Present',
    highlights: [
      'Own requirements and RCA for underwriting and billing apps across e2, BillingCenter, GhostDraft, ERMS, and PRIMIS',
      'Reconcile premiums, fees, and commissions across systems using SQL',
      'Delivered a self-service bulk deal utility from requirements through stakeholder demo',
    ],
    details: [
      'Investigate production issues across commercial lines (Brokerage Casualty, Miscellaneous E&O, Technology Professional Liability) through quoting, issuance, endorsements, and cancellations',
      'Write requirements and acceptance criteria that developers build from, then validate edge cases and downstream impacts before and after release',
      'Build and validate regulatory reporting SQL (Texas HB 2067) and support compliance readiness (NJ PLIGA 2026, TRIA)',
      'Coordinate targeted data fixes for premium, transaction, and commission discrepancies',
      'Run functional, regression, and UAT testing for production and maintenance releases',
      'Work in an Agile/Kanban team with developers in multiple time zones',
    ],
  },
  {
    role: 'Product Business Analyst II',
    company: 'Elephant Insurance',
    period: 'May 2022 – Nov 2024',
    highlights: [
      'Did extensive end-to-end testing for the Guidewire v7 to v9 upgrade',
      'Coordinated an A/B test of a Customer Portal UI change',
      'Improved project efficiency by 30% through requirement traceability',
    ],
    details: [
      'Tested data flow from the online Customer Journey into PolicyCenter (online binds and direct binds) and from Customer Portal policy changes into PolicyCenter and BillingCenter',
      'Split A/B test exposure by even and odd policy numbers for a clean, repeatable comparison',
      'Used SQL to test data prefill changes in XML requests and responses',
      'Led stakeholder demos, including an external agency portal',
      'Supported sprint planning and Agile ceremonies',
    ],
  },
  {
    role: 'Product Business Analyst I',
    company: 'Elephant Insurance',
    period: 'Sept 2019 – May 2022',
    highlights: [
      'Defined and tested feature updates for Guidewire PolicyCenter and BillingCenter',
      'Facilitated Guidewire integrations that improved automation',
      'Bridged developers and business stakeholders through delivery',
    ],
    details: [
      'Wrote and tracked requirements and test cases in Jira',
      'Streamlined requirements gathering across product teams',
      'Managed stakeholder communication throughout development cycles',
    ],
  },
  {
    role: 'Billing Associate II',
    company: 'Elephant Insurance',
    period: 'Aug 2016 – Sept 2019',
    highlights: [
      'Ran SQL reports in SSMS to find and fix policy billing discrepancies',
      'Reviewed bad-debt policies for collections',
      'Performed UAT on billing workflows in Guidewire BillingCenter',
    ],
    details: [
      'Validated report logic with the Data Analytics team',
      'Handled high-volume billing and policy updates',
      'Flagged recurring system issues and worked with dev teams to resolve them',
      'Built the hands-on billing knowledge that led to my move into business analysis',
    ],
  },
];

const skills = [
  { category: 'Insurance domain', items: ['P&C personal auto', 'Commercial E&O and Casualty', 'Billing and collections', 'Premium and commission reconciliation', 'Regulatory reporting'] },
  { category: 'Systems', items: ['Guidewire BillingCenter', 'Guidewire PolicyCenter', 'Oracle APEX', 'Jira', 'Confluence'] },
  { category: 'Data', items: ['SQL', 'SQL Server / SSMS', 'MySQL', 'MongoDB', 'Excel'] },
  { category: 'Development', items: ['JavaScript', 'React', 'Node.js', 'Python', 'C#', 'HTML/CSS'] },
  { category: 'Ways of working', items: ['Requirements and AC', 'UAT and regression testing', 'Root cause analysis', 'Agile/Kanban', 'Stakeholder demos', 'AI tools (Claude, ChatGPT)'] },
];

const certifications = [
  { name: 'Fundamentals of Deep Learning', issuer: 'NVIDIA - Oct 2025' }, // TODO: exact certification name
  { name: 'Applications of AI for Predictive Maintenance', issuer: 'NVIDIA - Dec 2025' }, // TODO: exact certification name
];

/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [expandedRole, setExpandedRole] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const dark = theme === 'dark';
  const t = {
    page: dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900',
    card: dark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200',
    muted: dark ? 'text-slate-300' : 'text-slate-600',
    accent: dark ? 'text-blue-400' : 'text-blue-700',
    chip: dark ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-800',
    tag: dark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800',
    hover: dark ? 'hover:bg-slate-800' : 'hover:bg-slate-200',
    band: dark ? 'bg-slate-900/60' : 'bg-slate-50',
    divider: dark ? 'border-slate-800' : 'border-slate-200',
    outlineBtn: dark ? 'border-slate-500 hover:border-blue-400' : 'border-slate-400 hover:border-blue-600',
  };
  const focus = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
  const ext = { target: '_blank', rel: 'noopener noreferrer' };

  const SectionHeading = ({ children, sub }) => (
    <div className="mb-12">
      <h2 className="text-4xl font-bold">{children}</h2>
      {sub && <p className={`${t.muted} mt-3 text-lg max-w-2xl`}>{sub}</p>}
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${t.page} overflow-x-hidden`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (dark ? 'bg-slate-950/95' : 'bg-white/95') + ' backdrop-blur shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`text-2xl font-bold ${t.accent} ${focus} rounded`}>
            Antonio Diaz
          </button>

          <div className="flex items-center gap-2 lg:order-last">
            <button
              onClick={() => setTheme(dark ? 'light' : 'dark')}
              className={`p-2 rounded-lg ${t.hover} transition-colors ${focus}`}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`lg:hidden p-2 rounded-lg ${focus}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:ml-auto lg:mr-4 absolute lg:static top-16 left-0 right-0 ${dark ? 'bg-slate-950 lg:bg-transparent' : 'bg-white lg:bg-transparent'} p-6 lg:p-0`}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block lg:inline-block px-4 py-2 hover:text-blue-400 transition-colors w-full text-left lg:w-auto rounded ${focus}`}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-24">
        <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-br from-blue-500/10 via-slate-950 to-cyan-500/10' : 'bg-gradient-to-br from-blue-500/5 via-white to-cyan-500/5'}`}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">Antonio Diaz</h1>
            <p className={`text-2xl lg:text-3xl font-semibold mb-6 ${t.accent}`}>
              Business Analyst for insurance systems and data
            </p>
            <p className={`text-lg lg:text-xl ${t.muted} mb-10 max-w-2xl`}>
              Ten years in P&C insurance, from billing operations to a Guidewire upgrade to commercial lines at Markel.
              I dig into the data, find the root cause, and turn it into requirements developers can build from.
              Sometimes I build the tool myself.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('work')} className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors ${focus}`}>
                See my work
              </button>
              <a href={LINKS.resume} {...ext} className={`flex items-center gap-2 px-6 py-3 border ${t.outlineBtn} rounded-lg font-semibold transition-colors ${focus}`}>
                <Download size={18} /> Download resume
              </a>
            </div>
          </div>
          <img
            src={LINKS.photo}
            alt="Antonio Diaz"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-blue-400/50 shadow-lg mx-auto order-first md:order-none"
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <SectionHeading>About me</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12">
          <div className={`${t.muted} text-lg space-y-6`}>
            <p>
              I started in insurance billing, fixing discrepancies and working collections. That's where I learned how
              policy, billing, and finance data actually move, and where they break.
            </p>
            <p>
              Since then I've worked as a business analyst on Guidewire BillingCenter and PolicyCenter across v7, v9, and
              Cloud. At Markel I support underwriting and billing apps across a five-system integration landscape, doing
              root cause analysis, requirements, data fixes, and regulatory reporting.
            </p>
            <p>
              I also have a B.S. in Computer Information Science (Software Development), so I can read the code,
              write the SQL, and talk to developers in their terms.
            </p>
          </div>
          <dl className={`${t.card} rounded-xl p-8 border space-y-6`}>
            {quickFacts.map((f, i) => (
              <div key={i}>
                <dt className={`text-2xl font-bold ${t.accent}`}>{f.value}</dt>
                <dd className={t.muted}>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured work */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <SectionHeading sub="A few problems I've worked on. Details are generalized to protect confidential information.">
          Featured work
        </SectionHeading>
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((c, i) => (
            <article key={i} className={`${t.card} border rounded-xl p-8`}>
              <p className={`text-sm ${t.muted} mb-2`}>{c.company}</p>
              <h3 className="text-xl font-bold mb-5">{c.title}</h3>
              <dl className="space-y-4 text-sm">
                {[['Problem', c.problem], ['What I did', c.action], ['Result', c.result]].map(([label, text]) => (
                  <div key={label}>
                    <dt className={`font-semibold ${t.accent}`}>{label}</dt>
                    <dd className={`${t.muted} mt-1`}>{text}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-2 mt-6">
                {c.tags.map(tag => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full ${t.tag}`}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`max-w-6xl mx-auto px-6 py-24 scroll-mt-20 ${t.band} rounded-2xl`}>
        <SectionHeading sub="Things I've built on my own time.">Projects</SectionHeading>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <article key={i} className={`${t.card} border rounded-xl overflow-hidden flex flex-col ${p.featured ? 'md:col-span-2' : ''}`}>
              {p.image && <img src={p.image} alt={`${p.title} screenshot`} className="w-full h-56 object-cover object-top" />}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className={`${t.muted} mb-5 flex-1`}>{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${t.tag}`}>{tag}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm font-semibold">
                  {p.live && (
                    <a href={p.live} {...ext} className={`flex items-center gap-1 ${t.accent} hover:underline ${focus} rounded`}>
                      <ExternalLink size={16} /> Open live app
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} {...ext} className={`flex items-center gap-1 ${t.accent} hover:underline ${focus} rounded`}>
                      <Github size={16} /> View code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-8">
          {experience.map((exp, i) => {
            const open = expandedRole === i;
            return (
              <div key={i} className="border-l-2 border-blue-500 pl-8 md:pl-12 pb-8">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className={t.muted}>{exp.company}, {exp.period}</p>
                  </div>
                  <button
                    onClick={() => setExpandedRole(open ? null : i)}
                    aria-expanded={open}
                    aria-label={open ? `Hide details for ${exp.role}` : `Show details for ${exp.role}`}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${open ? 'bg-blue-500/30 text-blue-400' : `${t.hover} ${t.muted}`} ${focus}`}
                  >
                    <ChevronDown size={24} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className={`${t.muted} flex items-start gap-3`}>
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 flex-shrink-0"></span>
                      {h}
                    </li>
                  ))}
                </ul>

                {open && (
                  <ul className={`mt-6 pt-6 border-t ${t.divider} space-y-3`}>
                    {exp.details.map((d, j) => (
                      <li key={j} className={`${t.muted} flex items-start gap-3 text-sm`}>
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills + certifications */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <SectionHeading>Skills</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((group, i) => (
            <div key={i} className={`${t.card} border rounded-xl p-8`}>
              <h3 className={`text-lg font-bold mb-5 ${t.accent}`}>{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map(s => (
                  <span key={s} className={`px-3 py-1.5 rounded-lg text-sm ${t.chip}`}>{s}</span>
                ))}
              </div>
            </div>
          ))}
          <div className={`${t.card} border rounded-xl p-8`}>
            <h3 className={`text-lg font-bold mb-5 ${t.accent}`}>Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((c, i) => (
                <li key={i}>
                  <p className="font-semibold">{c.name}</p>
                  <p className={`text-sm ${t.muted}`}>{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className={`max-w-6xl mx-auto px-6 py-24 scroll-mt-20 ${t.band} rounded-2xl`}>
        <SectionHeading>Education</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-2">B.S. in Computer Information Science</h3>
            <p className={`${t.accent} font-semibold mb-2`}>Software Development</p>
            <p className={t.muted}>ECPI University, Richmond, VA. Graduated July 2025.</p>
            <p className={`${t.muted} mt-2`}>4.0 GPA, Summa Cum Laude</p>
          </div>
          <div>
            <h3 className={`text-lg font-bold mb-4 ${t.accent}`}>Relevant coursework</h3>
            <div className="flex flex-wrap gap-2">
              {['SQL Server', 'System Analysis & Design', 'Web Application Development', 'Server-side Scripting', 'OOP (C# and C++)', 'JavaScript and Python', 'Interface Design', 'Cybersecurity'].map(course => (
                <span key={course} className={`px-3 py-1.5 rounded-lg text-sm ${t.chip}`}>{course}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
        <div className={`${dark ? 'bg-blue-500/15 border-blue-400/30' : 'bg-blue-50 border-blue-200'} border rounded-2xl p-12 text-center`}>
          <h2 className="text-4xl font-bold mb-6">Let's talk</h2>
          <p className={`${t.muted} text-lg mb-8 max-w-2xl mx-auto`}>
            I'm open to senior business systems analyst, technical analyst, and data analyst roles, especially in insurance and finance.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={LINKS.email} className={`flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors ${focus}`}>
              <Mail size={20} /> Email me
            </a>
            <a href={LINKS.linkedin} {...ext} className={`flex items-center gap-2 px-6 py-3 border ${t.outlineBtn} rounded-lg font-semibold transition-colors ${focus}`}>
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href={LINKS.github} {...ext} className={`flex items-center gap-2 px-6 py-3 border ${t.outlineBtn} rounded-lg font-semibold transition-colors ${focus}`}>
              <Github size={20} /> GitHub
            </a>
            <a href={LINKS.resume} {...ext} className={`flex items-center gap-2 px-6 py-3 border ${t.outlineBtn} rounded-lg font-semibold transition-colors ${focus}`}>
              <Download size={20} /> Resume
            </a>
          </div>
        </div>
      </section>

      <footer className={`border-t ${t.divider} py-8 px-6 text-center ${t.muted}`}>
        <p>© {new Date().getFullYear()} Antonio Diaz</p>
      </footer>
    </div>
  );
}