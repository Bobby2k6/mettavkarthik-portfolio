import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Phone,
  Sun,
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: PortfolioPage,
})

type SectionId =
  | 'hero'
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
}

type NavSectionId = Extract<SectionId, 'hero' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'>

const navSections: Array<{ id: NavSectionId; label: string }> = [
  { id: 'hero', label: 'Home' },
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
  },
  {
    title: 'Blind Coding Contest Platform',
    description:
      'A contest system focused on fair problem-solving through hidden submissions, anti-cheat guards, and real-time leaderboard updates for coding events.',
    tech: ['Java', 'Spring Boot', 'React', 'Redis'],
    github: 'https://bobby2k6.github.io/blind-coding/',
  },
  {
    title: 'Personal Finance Chatbot',
    description:
      'An AI-assisted budgeting companion that parses spending patterns, recommends savings strategies, and answers financial queries with contextual insights.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'SQLite'],
    github: 'https://github.com',
  },
  {
    title: 'AttendanceHub - Attendance Management System',
    description:
      'A RESTful system that helps college faculty manage and analyze student attendance from Excel sheets, with filtering by percentage, semester, and roll number, plus automated email/SMS alerts for low attendance.',
    tech: ['React', 'Tailwind CSS', 'Express.js', 'Nodemailer', 'PostgreSQL'],
    github: 'https://github.com',
  },
  {
    title: 'BuildBox - ASCII Club Workshop',
    description:
      'A browser-based virtual lab for learning AI/ML through hands-on coding, with real-time Python execution and interactive modules on Vector Databases, Embeddings, and Retrieval-Augmented Generation (RAG).',
    tech: ['React', 'TypeScript', 'Vite', 'Monaco Editor', 'xterm.js', 'Pyodide'],
    github: 'https://github.com',
  },
]

function PortfolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeSection, setActiveSection] = useState<NavSectionId>('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState<'typing' | 'fading' | 'done'>('typing')
  const [typedText, setTypedText] = useState('')
  const activeSectionRef = useRef<NavSectionId>('hero')

  const fullText = 'hello world_'

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
    const html = document.documentElement
    const body = document.body

    if (loadingStage !== 'done') {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      html.style.overflow = ''
      body.style.overflow = ''
    }

    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
    }
  }, [loadingStage])

  useEffect(() => {
    let index = 0
    const typingTimer = window.setInterval(() => {
      index += 1
      setTypedText(fullText.slice(0, index))

      if (index >= fullText.length) {
        window.clearInterval(typingTimer)

        window.setTimeout(() => {
          setLoadingStage('fading')
          window.setTimeout(() => {
            setLoadingStage('done')
          }, 600)
        }, 1500)
      }
    }, 120)

    return () => {
      window.clearInterval(typingTimer)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = total > 0 ? (window.scrollY / total) * 100 : 0
      setProgress(Math.min(100, Math.max(0, nextProgress)))
      setIsScrolled(window.scrollY > 20)
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2 },
    )

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
    }
  }, [loadingStage])

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    const sectionsById = new Map<NavSectionId, HTMLElement>()
    navSections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) {
        sectionsById.set(section.id, el)
      }
    })

    if (sectionsById.size === 0) {
      return
    }

    const computeBestSection = () => {
      const viewportHeight = window.innerHeight
      const focusY = viewportHeight * 0.42
      const candidates: Array<{ id: NavSectionId; ratio: number; distance: number }> = []

      sectionsById.forEach((element, id) => {
        const rect = element.getBoundingClientRect()
        const visibleTop = Math.max(rect.top, 0)
        const visibleBottom = Math.min(rect.bottom, viewportHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const ratio = rect.height > 0 ? visibleHeight / rect.height : 0
        const containsFocusLine = rect.top <= focusY && rect.bottom >= focusY

        if (containsFocusLine && ratio >= 0.36) {
          const sectionCenter = rect.top + rect.height / 2
          candidates.push({
            id,
            ratio,
            distance: Math.abs(sectionCenter - focusY),
          })
        }
      })

      if (candidates.length === 0) {
        return
      }

      candidates.sort((a, b) => {
        if (Math.abs(a.ratio - b.ratio) > 0.04) {
          return b.ratio - a.ratio
        }
        return a.distance - b.distance
      })

      const nextActive = candidates[0]?.id

      if (nextActive && nextActive !== activeSectionRef.current) {
        activeSectionRef.current = nextActive
        setActiveSection(nextActive)
      }
    }

    let rafId: number | null = null
    const updateActiveSection = () => {
      if (rafId !== null) {
        return
      }
      rafId = window.requestAnimationFrame(() => {
        computeBestSection()
        rafId = null
      })
    }

    const observer = new IntersectionObserver(updateActiveSection, {
      threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      rootMargin: '-10% 0px -38% 0px',
    })

    sectionsById.forEach((element) => observer.observe(element))
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-colors duration-300">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <div
          className="h-full bg-[var(--app-accent)] shadow-[0_0_18px_var(--app-accent-soft)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {loadingStage !== 'done' && (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[var(--app-bg)] transition-opacity duration-500 ${
            loadingStage === 'fading' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p
            className={`font-mono text-3xl sm:text-5xl tracking-tight text-[var(--app-accent)] transition-transform duration-[600ms] ease-in origin-center ${
              loadingStage === 'fading' ? 'scale-[12]' : 'scale-100'
            }`}
          >
            {typedText}
            <span className="inline-block h-[1.1em] w-[2px] translate-y-1 animate-caret-blink bg-[var(--app-accent)]" />
          </p>
        </div>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-[var(--app-border)]/65 bg-[var(--app-nav)]/70 backdrop-blur-xl transition-all duration-300 ${
          isScrolled ? 'shadow-[0_8px_24px_-18px_rgba(0,0,0,0.55)]' : ''
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-10">
          <div className="min-w-[110px] shrink-0 text-left">
            <a href="#hero" className="font-mono text-base font-semibold tracking-[0.14em] text-[var(--app-text)]">
              Karthik
            </a>
          </div>

          <nav className="min-w-0 flex-1 overflow-x-auto">
            <div className="mx-auto flex min-w-max items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
              {navSections.map((section) => {
                const isActive = section.id === activeSection

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`group relative inline-flex h-10 items-center px-2 text-xs font-medium transition-all duration-200 sm:px-3 sm:text-sm ${
                      isActive
                        ? 'font-semibold text-[var(--app-text)] [text-shadow:0_0_16px_var(--app-accent-soft)]'
                        : 'text-[var(--app-muted)] hover:text-[var(--app-accent)]'
                    }`}
                  >
                    {section.label}
                    <span
                      className={`pointer-events-none absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-[var(--app-accent)] shadow-[0_0_14px_var(--app-accent-soft)] transition-transform duration-200 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-70'
                      }`}
                    />
                  </a>
                )
              })}
            </div>
          </nav>

          <div className="flex min-w-[56px] shrink-0 justify-end">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--app-accent)] hover:text-[var(--app-accent)] hover:shadow-[0_0_20px_var(--app-accent-soft)]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main
        className={`px-5 pb-16 pt-24 transition-opacity duration-700 md:px-12 md:pt-28 ${
          loadingStage === 'done' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <section id="hero" className="reveal mx-auto max-w-5xl scroll-mt-28 py-16 md:py-24">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[var(--app-muted)]">Visakhapatnam, India</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">M V Karthikeyan</h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--app-muted)] sm:text-lg">
           •Full-stack developer turning real-world problems into scalable software
           <br /> 
           • From IoT-driven industrial dashboards to AI-powered tools.
          </p>
          <p className="mt-4 text-sm text-[var(--app-muted)]">BTech CSE Student (2023-2027) • CGPA 9.17 • Full Stack Web Development</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="portfolio-btn" href="#projects">
              View Projects
            </a>
            <a className="portfolio-btn portfolio-btn-alt" href="/resume">
              My Resume
            </a>
            <Link className="portfolio-btn portfolio-btn-alt" to="/contact">
              Contact Me
            </Link>
          </div>
        </section>

        <section id="about" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">About</h2>
          <p className="portfolio-copy mt-4">
           B.Tech CSE student interested in diverse areas of computer science, including full-stack web development, AI/ML,
          understanding how systems are designed, and cybersecurity. Competitive programming has helped build a structured
          approach to problem-solving, and I am comfortable leveraging AI tools to improve productivity without compromising
          my understanding of core concepts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Full Stack Developer', 'Strong in DSA', 'AI & Systems Interest'].map((item) => (
              <span key={item} className="portfolio-pill">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Experience</h2>
          <article className="mt-6 rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--app-muted)]">Software Developer Intern</p>
                <h3 className="mt-2 text-2xl font-semibold">RINL, Vizag Steel Plant</h3>
                <p className="mt-1 text-sm text-[var(--app-muted)]">Visakhapatnam, India</p>
              </div>
              <span className="portfolio-pill text-xs">June 2025 - July 2025</span>
            </div>

            <p className="mt-4 text-[var(--app-muted)]">Project: Predictive Maintenance Scheduler (Prototype)</p>

            <div className="mt-4 flex flex-wrap gap-2">Tech
              {['React (TypeScript)', 'Tailwind CSS', 'shadcn/ui', 'Recharts'].map((stack) => (
                <span key={stack} className="portfolio-pill text-xs">
                  {stack}
                </span>
              ))}
            </div>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[var(--app-muted)]">
              <li>
                Built a predictive maintenance web application within RINL&apos;s Industry 4.0 ecosystem, which houses
                the Kalpataru CoE, an IIoT facility with industrial IoT sensor kits, automation panels, and AI/ML
                platforms for equipment monitoring.
              </li>
              <li>
                Designed dashboards to visualize equipment usage, downtime trends, and maintenance insights, aligned
                with RINL&apos;s OEE and IIoT monitoring objectives.
              </li>
              <li>
                Gained practical exposure to how IoT sensor data pipelines feed predictive maintenance systems in a
                live steel plant environment.
              </li>
            </ul>
          </article>
        </section>

        <section id="projects" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Projects</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="project-card rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5"
              >
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm text-[var(--app-muted)]">{project.description}</p>
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Skills</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkillBlock title="Languages" items={['Java', 'C', 'Python', 'SQL']} />
            <SkillBlock title="Web Development" items={['HTML', 'CSS', 'JavaScript', 'React']} />
            <SkillBlock title="Databases" items={['MySQL', 'MongoDB', 'Supabase']} />
            <SkillBlock title="Backend Technologies" items={['JSP', 'Servlets', 'JDBC', 'Node', 'Express.js']} />     
            <SkillBlock title="Tools & Platforms" items={['Git', 'GitHub', 'VS Code', 'NetBeans', 'Netlify']} />
            <SkillBlock
              title="Core Concepts"
              items={['Data Structures & Algorithms', 'OOP', 'DBMS', 'MVC Architecture', 'Operating Systems']}
            />
          </div>
        </section>

        <section id="achievements" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Achievements</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['HackerRank 5 star in Java', 'Solved 250+ coding problems in Leetcode , Codechef, HackerRank', 'Certifications: Infosys, IBM, AWS'].map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 text-sm text-[var(--app-muted)]">
                {item}
              </div>
            ))}
          </div>
        </section>

        {/*
        <section id="interests" className="mx-auto max-w-5xl scroll-mt-20 py-12">
          <h2 className="portfolio-heading">Interests</h2>
          <p className="portfolio-copy mt-4">Competitive programming, product design systems, and distributed computing.</p>
        </section>
        */}

        <section id="contact" className="reveal mx-auto max-w-5xl scroll-mt-28 py-12">
          <h2 className="portfolio-heading">Contact</h2>
          <p className="portfolio-copy mt-4">Open to internships, collaborations, and product-focused engineering conversations.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ContactButton href="mailto:mvkarthikeyan3@gmail.com" icon={<Mail size={17} />} label="Email" />
            <ContactButton href="tel:+91 837445899" icon={<Phone size={17} />} label="Phone" />
            <ContactButton href="https://www.linkedin.com/in/karthikeyan-metta/" icon={<Linkedin size={17} />} label="LinkedIn" />
            <ContactButton href="https://github.com/Bobby2k6" icon={<Github size={17} />} label="GitHub" />
          </div>
        </section>
      </main>
    </div>
  )
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5">
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
      className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-panel)] text-[var(--app-text)] transition hover:border-[var(--app-accent)] hover:shadow-[0_0_18px_var(--app-accent-soft)]"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  )
}