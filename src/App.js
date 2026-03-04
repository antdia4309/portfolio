import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ExternalLink, Github, Linkedin, Mail, ArrowRight, Moon, Sun, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [animatedStats, setAnimatedStats] = useState({ gpa: 0 });
  const [expandedRole, setExpandedRole] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          let gpa = 0;
          const interval = setInterval(() => {
            if (gpa < 4) gpa += 0.1;
            setAnimatedStats({ gpa: Math.min(gpa, 4.0) });
            if (gpa >= 4) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const bgColor = theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900';
  const cardBg = theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200';
  const textMuted = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  const navItems = [
    { name: 'About', id: 'about', icon: '👤' },
    { name: 'Projects', id: 'projects', icon: '💻' },
    { name: 'Education', id: 'education', icon: '🎓' },
    { name: 'Skills', id: 'skills', icon: '⚡' },
    { name: 'Experience', id: 'experience', icon: '💼' },
    { name: 'Contact', id: 'contact', icon: '📧' }
  ];

  const projects = [
    {
      title: "ParkFinder Web App",
      description: "Responsive front-end web application with focus on UX and modern CSS. Features form validation, smooth navigation, and interactive elements.",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Census CRUD Application",
      description: "Full-stack application demonstrating MEAN stack expertise. Real-time API communication with Angular frontend, Express backend, and MongoDB database.",
      tags: ["MongoDB", "Express.js", "Angular", "Node.js"]
    },
    {
      title: "To-Do List Application",
      description: "Interactive task management app showcasing JavaScript fundamentals, DOM manipulation, and local state management.",
      tags: ["JavaScript", "HTML", "CSS"]
    }
  ];

  const githubProjects = [
    { name: "ParkFinder", description: "Front-end web application with responsive design and advanced CSS styling", language: "JavaScript", link: "https://github.com/antdia4309/5.3-Final-Project" },
    { name: "To-Do List", description: "Interactive task management with vanilla JavaScript", language: "JavaScript", link: "https://github.com/antdia4309/4.4-PA-ToDoList" },
    { name: "SimpleWebApplication", description: "Course project demonstrating C# fundamentals", language: "C#", link: "https://github.com/antdia4309/SimpleWebApplication" },
    { name: "MEAN Stack Projects", description: "Full-stack applications using MongoDB, Express, Angular, Node.js", language: "Full-Stack", link: "https://github.com/antdia4309" }
  ];

  const skills = [
    { category: "Languages", items: ["JavaScript", "C#", "SQL", "C++", "HTML/CSS"] },
    { category: "Frameworks & Libraries", items: ["React", "Node.js", "Express.js", "Angular"] },
    { category: "Databases & Tools", items: ["MongoDB", "MySQL", "SQL Server", "GitHub", "Visual Studio"] },
    { category: "Professional Skills", items: ["Agile/Kanban", "Testing & QA", "System Analysis", "Problem-Solving"] }
  ];

  const experience = [
    {
      role: "Business Analyst",
      company: "Markel Corporation",
      period: "May 2025 - Present",
      highlights: ["Investigated and resolved production issues across E2, FAST, and BillingCenter", "Validated system calculations and data synchronization across multiple platforms", "Executed functional, regression, and UAT testing to identify defects early"],
      details: [
        "Investigated and resolved production issues across E2, FAST, and BillingCenter, analyzing system behavior, data discrepancies, and configuration logic to restore functionality",
        "Partnered closely with developers to translate requirements into technical fixes, validating edge cases, data flows, and downstream impacts before and after deployment",
        "Supported multiple production and maintenance releases by testing fixes, validating system outputs, and confirming deployments",
        "Executed functional, regression, and UAT testing to identify defects early, reducing production risk and rework for development teams",
        "Analyzed backlog tickets to identify obsolete, duplicate, or low-value work, improving signal-to-noise ratio for development teams",
        "Worked directly with data (premiums, commissions, policy attributes) to validate system calculations and synchronization across platforms",
        "Collaborated daily in an Agile/Kanban environment, communicating technical findings and status updates that accelerated issue resolution"
      ]
    },
    {
      role: "Product Business Analyst II",
      company: "Elephant Insurance",
      period: "May 2022 - Nov 2024",
      highlights: ["Improved project efficiency by 30% through requirement traceability", "Partnered with dev teams on feature implementation", "Designed and executed comprehensive test plans"],
      details: ["Utilized SQL to perform data validation", "Supported Agile ceremonies and sprint planning", "Collaborated with development teams on feature implementation", "Designed test plans that significantly increased project efficiency"]
    },
    {
      role: "Product Business Analyst I",
      company: "Elephant Insurance",
      period: "Sept 2019 - May 2022",
      highlights: ["Facilitated Guidewire integrations", "Streamlined requirements gathering and project delivery", "Coordinated between developers and stakeholders"],
      details: ["Defined and tested feature updates using Jira", "Facilitated Guidewire integrations that improved automation", "Streamlined requirements gathering processes", "Managed stakeholder communications throughout development cycles"]
    },
    {
      role: "Billing Associate II",
      company: "Elephant Insurance",
      period: "Aug 2016 - Sept 2019",
      highlights: ["Performed UAT for billing workflows", "Managed high-volume billing and policy updates using Guidewire", "Identified recurring system issues and drove resolution"],
      details: ["Performed comprehensive UAT for billing workflows", "Managed high-volume billing and policy updates using Guidewire", "Drove resolution of operational issues with development teams", "Gained deep operational knowledge that informed transition to Business Analyst role"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgColor} overflow-hidden`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (theme === 'dark' ? 'bg-slate-950/95' : 'bg-white/95') + ' backdrop-blur shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Antonio Diaz
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:static top-16 left-0 right-0 ${theme === 'dark' ? 'bg-slate-950 lg:bg-transparent' : 'bg-white lg:bg-transparent'} p-6 lg:p-0`}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="block lg:inline-block px-4 py-2 capitalize hover:text-blue-400 transition-colors w-full text-left lg:w-auto">
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/10 via-slate-950 to-cyan-500/10' : 'bg-gradient-to-br from-blue-500/5 via-white to-cyan-500/5'}`}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <img 
              src="https://i.imgur.com/LxKSnjR.jpg" 
              alt="Antonio Diaz"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400/50 shadow-lg"
            />
          </div>
          <p className="text-xl font-semibold text-blue-400 mb-4">Hello, I'm</p>
          <h1 className="text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Antonio Diaz
          </h1>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Computer Science <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Graduate</span>
          </h2>
          <div className="mb-6 inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/50 text-sm">
            Recent Graduate • Entry-Level Developer
          </div>
          <p className={`text-xl ${textMuted} mb-12 max-w-2xl mx-auto`}>
            B.S. in Computer Science (4.0 GPA, Summa Cum Laude) with hands-on experience in full-stack development, system debugging, and technical problem-solving. Seeking to launch my career as a software developer.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={`${cardBg} border rounded-xl p-4 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-1 text-center`}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-semibold text-sm hover:text-blue-400 transition-colors">{item.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className={`${textMuted} text-lg mb-6`}>
              I'm a recent computer science graduate with a 4.0 GPA, Summa Cum Laude honors, and a genuine passion for writing clean, effective code. My academic work includes full-stack projects using the MEAN stack, JavaScript, and C#.
            </p>
            <p className={`${textMuted} text-lg`}>
              What sets me apart is my professional experience: 9+ years in business operations exposed me to real-world debugging, system architecture, and problem-solving at scale. I've worked alongside developers and learned to think like one before studying CS formally.
            </p>
          </div>
          <div ref={statsRef} className={`${cardBg} rounded-xl p-8 border transition-all duration-300 hover:shadow-lg`}>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-blue-400">{animatedStats.gpa.toFixed(1)}</div>
                <div className={textMuted}>GPA - Summa Cum Laude</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">20+</div>
                <div className={textMuted}>GitHub Repositories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">MEAN</div>
                <div className={textMuted}>Full-Stack Proficiency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className={`${cardBg} rounded-xl overflow-hidden border transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-1`}>
              <div className={`h-40 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'} flex items-center justify-center text-6xl`}>
                💻
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className={`${textMuted} mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full hover:bg-blue-500/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`max-w-6xl mx-auto px-6 py-24 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5'} rounded-2xl`}>
        <h2 className="text-4xl font-bold mb-12">Education</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-3">Bachelor of Science</h3>
            <p className="text-blue-400 font-semibold mb-2">Computer Information Science - Software Development</p>
            <p className={textMuted}>ECPI University, Richmond, VA</p>
            <p className={textMuted}>Graduated: July 2025</p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-blue-400">GPA: 4.0 (Summa Cum Laude)</p>
              <p className={textMuted}>Top 5% of class</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Relevant Coursework</h3>
            <div className="grid grid-cols-2 gap-3">
              {['OOP (C# & C++)', 'JavaScript & Python', 'Server-side Scripting', 'Web Application Dev', 'SQL Server', 'System Analysis & Design', 'Interface Design', 'Cybersecurity'].map((course, i) => (
                <span key={i} className={`px-3 py-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} rounded-lg text-sm`}>
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, i) => (
            <div key={i} className={`${cardBg} border rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-400/50`}>
              <h3 className="text-xl font-bold mb-6 text-blue-400">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, j) => (
                  <span key={j} className={`px-4 py-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} rounded-lg text-sm hover:text-blue-400 transition-all duration-200 cursor-default hover:shadow-md`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Strengths */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">Developer Strengths</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`${cardBg} border rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-400/50`}>
            <div className="text-3xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">System Debugging</h3>
            <p className={`${textMuted} text-sm`}>
              Investigated production issues across multiple systems, analyzing system behavior and data discrepancies. Experience troubleshooting complex problems.
            </p>
          </div>
          <div className={`${cardBg} border rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-400/50`}>
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Data Work & SQL</h3>
            <p className={`${textMuted} text-sm`}>
              Worked with data validation and SQL queries to understand system calculations and data flows. Comfortable analyzing complex data structures.
            </p>
          </div>
          <div className={`${cardBg} border rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-400/50`}>
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Testing Mindset</h3>
            <p className={`${textMuted} text-sm`}>
              Executed functional and regression testing to catch edge cases. Understand how to write testable code and think about failure scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* GitHub Projects */}
      <section className={`max-w-6xl mx-auto px-6 py-24 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5'} rounded-2xl`}>
        <h2 className="text-4xl font-bold mb-4">More on GitHub</h2>
        <p className={`${textMuted} mb-12`}>Explore my full portfolio of projects and contributions</p>
        <div className="grid md:grid-cols-2 gap-6">
          {githubProjects.map((repo, i) => (
            <a key={i} href={repo.link} target="_blank" rel="noopener noreferrer" className={`${cardBg} border rounded-xl p-6 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:-translate-y-1 group`}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{repo.name}</h3>
                <ExternalLink size={18} className={`${textMuted} group-hover:text-blue-400 transition-colors`} />
              </div>
              <p className={`${textMuted} text-sm mb-3`}>{repo.description}</p>
              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                {repo.language}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-12">Professional Experience</h2>
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <div key={i} className={`border-l-2 border-blue-500 pl-12 pb-8 transition-all duration-300 hover:pl-14`}>
              <div className="flex items-center justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <div className={`${textMuted}`}>{exp.company} • {exp.period}</div>
                </div>
                <button onClick={() => setExpandedRole(expandedRole === i ? null : i)} className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${expandedRole === i ? 'bg-blue-500/30 text-blue-400' : 'hover:bg-slate-800 text-slate-400 hover:text-slate-300'}`} title="Click to expand">
                  <ChevronDown size={24} className={`transition-transform duration-300 ${expandedRole === i ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              <ul className="space-y-2">
                {exp.highlights.map((highlight, j) => (
                  <li key={j} className={`${textMuted} flex items-center gap-2 transition-colors duration-200 hover:text-blue-400`}>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                    {highlight}
                  </li>
                ))}
              </ul>

              {expandedRole === i && (
                <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
                  <p className="text-sm font-semibold text-blue-400 uppercase tracking-wide">Additional Details</p>
                  {exp.details.map((detail, j) => (
                    <div key={j} className={`${textMuted} flex items-start gap-3 text-sm`}>
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
        <div className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30' : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-400/20'} border rounded-2xl p-12 text-center transition-all duration-300 hover:shadow-lg`}>
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className={`${textMuted} text-lg mb-8 max-w-2xl mx-auto`}>
            I'm excited to start my career as a software developer. Let's talk about how I can contribute to your team.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="mailto:a.c.diaz92@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50">
              <Mail size={20} /> Email Me
            </a>
            <a href="https://www.linkedin.com/in/antonio-d-91201b158" className={`flex items-center gap-2 px-6 py-3 border ${theme === 'dark' ? 'border-slate-400 hover:border-blue-400' : 'border-slate-400 hover:border-blue-500'} rounded-lg font-semibold transition-all duration-200`}>
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="https://github.com/antdia4309" className={`flex items-center gap-2 px-6 py-3 border ${theme === 'dark' ? 'border-slate-400 hover:border-blue-400' : 'border-slate-400 hover:border-blue-500'} rounded-lg font-semibold transition-all duration-200`}>
              <Github size={20} /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} py-8 px-6 text-center ${textMuted}`}>
        <p>© 2025 Antonio Diaz. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}