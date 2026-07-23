import { marked } from 'marked'

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export const Route = createFileRoute('/resume')({
  component: App,
})

const jobs = [
  {
    jobTitle: 'Software Developer Intern',
    company: 'RINL, Vizag Steel Plant',
    location: 'Visakhapatnam, India',
    startDate: 'June 2025',
    endDate: 'July 2025',
    summary: 'Project: Predictive Maintenance Scheduler (Prototype)',
    tags: ['React (TypeScript)', 'Tailwind CSS', 'shadcn/ui', 'Recharts'],
    content: `
- Built a predictive maintenance web application within RINL's Industry 4.0 ecosystem, which houses the Kalpataru CoE, an IIoT facility with industrial IoT sensor kits, automation panels, and AI/ML platforms for equipment monitoring.
- Designed dashboards to visualize equipment usage, downtime trends, and maintenance insights, aligned with RINL's OEE and IIoT monitoring objectives.
- Gained practical exposure to how IoT sensor data pipelines feed predictive maintenance systems in a live steel plant environment.
`,
  },
  {
    jobTitle: 'AI/ML Intern',
    company: 'AWS AI/ML Internship - Eduskills',
    location: 'Remote',
    startDate: 'May 2025',
    endDate: 'July 2025',
    summary: 'Basic ML workflows and cloud-based model execution',
    tags: ['Python', 'AWS', 'Machine Learning', 'Data Preprocessing', 'AWS Cloud (basic exposure)'],
    content: `
- Worked on basic machine learning workflows in a cloud-based environment, performing data preprocessing and training simple models using Python.
- Managed datasets and executed Python scripts on remote cloud instances, gaining understanding of cloud infrastructure and on-demand computing resources.
- Explored how input data is processed and used by models to generate outputs in a cloud-based ML setup.
`,
  },
]

const educations = [
  {
    school: 'Gayatri Vidya Parishad College of Engineering(A), Visakhapatnam',
    startDate: 'Sep 2023',
    endDate: 'May 2027',
    summary:
      'Bachelor of Technology, Computer Science and Engineering',
    content: `
- CGPA: 9.16 / 10 (91.6%)
`,
  },
  {
    school: 'Sri Chaitanya Junior College',
    startDate: 'May 2022',
    endDate: 'Jun 2023',
    summary: 'Class XII, State Board, MPC',
    content: `
- Marks Scored: 947 / 1000 (94.7%)
`,
  },
  {
    school: 'Sri Chaitanya Techno School',
    startDate: 'May 2020',
    endDate: 'Jun 2021',
    summary: 'Class X, State Board',
    content: `
- Marks Scored: 597 / 600 (99.5%)
`,
  },
]

function App() {
  const router = useRouter()

  return (
    <div className="min-h-screen p-8 lg:p-12">
      <button
        onClick={() => router.history.back()}
        aria-label="Go back"
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border bg-background/80 backdrop-blur shadow-md hover:opacity-70 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <a
        href="https://drive.google.com/file/d/10BjeIuM6mIKfYIFcDKkRy4YBko1-86_X/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View resume PDF"
        className="fixed top-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border bg-background/80 backdrop-blur shadow-md hover:opacity-70 transition-opacity"
      >
        <Download className="w-5 h-5" />
      </a>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">
            My Resume
          </h1>
          <p className="text-lg">
            Professional Experience & Education
          </p>
          <Separator className="mt-8" />
        </div>

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-8">
              <p className="flex-1 leading-relaxed">
                Computer Science student with hands-on experience building
                full-stack, IoT-driven applications for industrial
                environments. Skilled in React, TypeScript, and modern UI
                frameworks, with a strong foundation in Data Structures and
                Algorithms and a keen interest in AI-driven systems.
                Passionate about solving real-world engineering problems
                through thoughtful, scalable, and dependable software
                architecture.
              </p>
              <img
                src={`${import.meta.env.BASE_URL}kar.jpg`}
                alt="Professional headshot"
                className="w-44 h-52 rounded-2xl object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Work Experience
          </h2>
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.jobTitle}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">
                        {job.jobTitle}
                      </CardTitle>
                      <p className="font-medium">
                        {job.company} - {job.location}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {job.startDate} - {job.endDate || 'Present'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 leading-relaxed">
                    {job.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="font-medium mr-1">
                      Tech Stack:
                    </span>
                    {job.tags.map((tag) => (
                      <HoverCard key={tag}>
                        <HoverCardTrigger>
                          <Badge variant="outline" className="cursor-pointer">
                            {tag}
                          </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <p className="text-sm">
                            Experience with {tag} in professional development
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                  {job.content && (
                    <div
                      className="mt-6 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: marked(job.content),
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Education
          </h2>
          <div className="space-y-6">
            {educations.map((education) => (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">
                      {education.school}
                    </CardTitle>
                    <Badge variant="secondary" className="text-sm">
                      {education.startDate} - {education.endDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    {education.summary}
                  </p>
                  {education.content && (
                    <div
                      className="mt-6 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: marked(education.content),
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}