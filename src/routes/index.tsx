import { createFileRoute } from '@tanstack/react-router'
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Sun,
} from 'lucide-react'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: PortfolioPage,
})

type SectionId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'contact'

type Project = {
  title: string
  description: string
  tech: string[]
  github: string
  live: string
}

const navSections: Array<{ id: SectionId; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const projects: Project[] = [
  {
    title: 'Internships Management System',
    description:
      'A centralized portal for internship posting, application tracking, and mentor evaluation with role-aware dashboards for students, faculty, and admins.',
    tech: ['React', 'Tailwind', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'Personal Finance Chatbot',
    description:
      'An AI-assisted budgeting companion that parses spending patterns, recommends savings strategies, and answers financial queries with contextual insights.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'SQLite'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'Blind Coding Contest Platform',
    description:
      'A contest system focused on fair problem-solving through hidden submissions, anti-cheat guards, and real-time leaderboard updates for coding events.',
    tech: ['Java', 'Spring Boot', 'React', 'Redis'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

function PortfolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const [isScrolled, setIsScrolled] = useState(false)
  const navRefs = useRef(new Map<SectionId, HTMLAnchorElement>())
  const activeSectionRef = useRef<SectionId>('about')

  const sectionIds = useMemo(() => navSections.map((section) => section.id), [])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark'

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    document.documentElement.style.colorScheme = initialTheme
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' },
    )

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    activeSectionRef.current = activeSection

    const activeNavNode = navRefs.current.get(activeSection)
    if (activeNavNode) {
      activeNavNode.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }, [activeSection])

  useEffect(() => {
    const sectionsById = new Map<SectionId, HTMLElement>()

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        sectionsById.set(id, section)
      }
    })

    if (sectionsById.size === 0) {
      return
    }

    const ratioMap = new Map<SectionId, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        let shouldRecompute = false

        entries.forEach((entry) => {
          const id = entry.target.id as SectionId
          ratioMap.set(id, entry.intersectionRatio)
          shouldRecompute = true
        })

        if (!shouldRecompute) {
          return
        }

        let nextSection = activeSectionRef.current
        let bestScore = ratioMap.get(nextSection) ?? 0

        sectionIds.forEach((id) => {
          const score = ratioMap.get(id) ?? 0
          if (score > bestScore) {
            bestScore = score
            nextSection = id
          }
        })

        const currentScore = ratioMap.get(activeSectionRef.current) ?? 0
        const clearWinner = bestScore >= 0.45
        const beatsCurrentEnough = bestScore - currentScore > 0.12

        if (clearWinner && beatsCurrentEnough && nextSection !== activeSectionRef.current) {
          activeSectionRef.current = nextSection
          setActiveSection(nextSection)
        }
      },
      {
        threshold: [0.2, 0.35, 0.45, 0.6, 0.75],
        rootMargin: '-16% 0px -40% 0px',
      },
    )

    sectionsById.forEach((section, id) => {
      ratioMap.set(id, 0)
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return (
    <div className="relative min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-colors duration-300">
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-[var(--app-border)]/70 bg-[var(--app-nav)]/85 backdrop-blur-xl transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_10px_34px_-24px_var(--app-accent-soft)]' : ''
        }`}
      >
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:px-6 lg:px-10">
          <a
            href="#about"
            className="shrink-0 font-mono text-sm font-semibold tracking-[0.24em] text-[var(--app-text)] sm:text-base"
          >
            Karthik
          </a>

          <nav className="portfolio-nav-scroll min-w-0 overflow-x-auto">
            <div className="mx-auto flex min-w-max items-center justify-center gap-1 sm:gap-1.5">
              {navSections.map((section) => {
                const isActive = section.id === activeSection

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    ref={(node) => {
                      if (node) {
                        navRefs.current.set(section.id, node)
                      } else {
                        navRefs.current.delete(section.id)
                      }
                    }}
                    className={`group relative inline-flex h-10 shrink-0 items-center px-2 text-xs font-medium transition-all duration-300 sm:px-3 sm:text-sm ${
                      isActive
                        ? 'text-[var(--app-text)] [text-shadow:0_0_15px_var(--app-accent-soft)]'
                        : 'text-[var(--app-muted)] hover:text-[var(--app-accent)]'
                    }`}
                  >
                    {section.label}
                    <span
                      className={`pointer-events-none absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-[var(--app-accent)] shadow-[0_0_12px_var(--app-accent-soft)] transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-70'
                      }`}
                    />
                  </a>
                )
              })}
            </div>
          </nav>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--app-accent)] hover:text-[var(--app-accent)] hover:shadow-[0_0_20px_var(--app-accent-soft)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 pb-20 pt-24 md:px-12 md:pt-28">
        <section id="about" className="reveal mx-auto max-w-5xl scroll-mt-28 py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.36em] text-[var(--app-muted)] sm:text-sm">HELLO THERE</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            M V Karthikeyan
          </h1>
          <h2 className="portfolio-role mt-6 text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Full Stack Web Developer
          </h2>
          <p className="mt-4 text-sm text-[var(--app-muted)] sm:text-base">
            Building cool stuff with code • Breaking things to learn • Exploring AI & beyond
          </p>
          <p className="portfolio-copy mt-7 max-w-3xl text-base sm:text-lg">
            Passionate developer building scalable web applications, strong in Data Structures and Algorithms, and
            deeply interested in AI-driven systems and dependable software architecture.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a className="portfolio-btn" href="#projects">
              View Projects
            </a>
            <a className="portfolio-btn portfolio-btn-alt" href="/resume">
              <Download size={15} />
              Download Resume
            </a>
            <a className="portfolio-btn portfolio-btn-outline" href="#contact">
              Contact Me
            </a>
          </div>
        </section>

        <section id="experience" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Experience</h2>
          <article className="experience-shell mt-6 rounded-3xl p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-lg font-semibold leading-tight text-[var(--app-text)]">Software Developer Intern</p>
                <h3 className="mt-1 text-xl font-medium text-[var(--app-text)]">Vizag Steel Plant</h3>
              </div>
              <p className="text-sm font-medium text-[var(--app-muted)] sm:text-right">June 2025 - July 2025</p>
            </div>
            <p className="mt-5 text-sm font-medium text-[var(--app-text)] sm:text-base">
              Project: <span className="text-[var(--app-muted)]">Predictive Maintenance Scheduler</span>
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Real-time equipment monitoring',
                'Operational dashboards',
                'Role-based access control',
                'Automated critical alerts',
              ].map((feature) => (
                <div key={feature} className="experience-feature">
                  {feature}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section id="projects" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Projects</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="project-card portfolio-section-card p-5">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--app-muted)]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((stack) => (
                    <span key={stack} className="portfolio-pill text-xs">
                      {stack}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <a className="portfolio-btn portfolio-btn-small" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    className="portfolio-btn portfolio-btn-small portfolio-btn-alt"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Skills</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkillBlock title="Languages" items={['Java', 'Python', 'C++', 'JavaScript', 'SQL']} />
            <SkillBlock title="Web" items={['React', 'Tailwind CSS', 'HTML', 'CSS']} />
            <SkillBlock title="Backend" items={['Spring Boot', 'Node.js', 'FastAPI']} />
            <SkillBlock title="Tools" items={['Git', 'Netlify', 'VS Code']} />
            <SkillBlock title="Concepts" items={['DSA', 'System Design', 'DBMS']} />
          </div>
        </section>

        <section id="achievements" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Achievements</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'HackerRank 5 Star in Java',
              'Solved 250+ coding problems',
              'Certifications from Infosys, IBM, and AWS',
            ].map((item) => (
              <div key={item} className="portfolio-section-card p-5 text-sm leading-7 text-[var(--app-muted)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/*
        <section id="interests" className="mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Interests</h2>
          <p className="portfolio-copy mt-4">
            Competitive programming, product design systems, and distributed computing.
          </p>
        </section>
        */}

        <section id="contact" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Contact</h2>
          <p className="portfolio-copy mt-4">
            Open to internships, collaborations, and product-focused engineering conversations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ContactButton href="mailto:karthikeyan@example.com" icon={<Mail size={17} />} label="Email" />
            <ContactButton href="tel:+910000000000" icon={<Phone size={17} />} label="Phone" />
            <ContactButton href="https://linkedin.com" icon={<Linkedin size={17} />} label="LinkedIn" />
            <ContactButton href="https://github.com" icon={<Github size={17} />} label="GitHub" />
          </div>
        </section>
      </main>
    </div>
  )
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="portfolio-section-card p-5">
      <h3 className="text-sm uppercase tracking-[0.14em] text-[var(--app-muted)]">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="portfolio-pill text-xs">
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}

function ContactButton({
  href,
  icon,
  label,
}: {
  href: string
  icon: ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text)] transition-all duration-300 hover:border-[var(--app-accent)] hover:-translate-y-0.5 hover:shadow-[0_0_18px_var(--app-accent-soft)]"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  )
}
