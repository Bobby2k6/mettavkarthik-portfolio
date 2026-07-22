import { marked } from 'marked'

import { createFileRoute } from '@tanstack/react-router'
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
    summary:
      'Project: Predictive Maintenance Scheduler (Prototype). Tech Stack: React (TypeScript), Tailwind CSS, shadcn/ui, Recharts.',
    tags: ['React (TypeScript)', 'Tailwind CSS', 'shadcn/ui', 'Recharts'],
    content: `
- Built a predictive maintenance web application within RINL's Industry 4.0 ecosystem, which houses the Kalpataru CoE, an IIoT facility with industrial IoT sensor kits, automation panels, and AI/ML platforms for equipment monitoring.
- Designed dashboards to visualize equipment usage, downtime trends, and maintenance insights, aligned with RINL's OEE and IIoT monitoring objectives.
- Gained practical exposure to how IoT sensor data pipelines feed predictive maintenance systems in a live steel plant environment.
`,
  },
]

const educations = [
  {
    school: 'Gayatri Vidya Parishad College of Engineering, Visakhapatnam',
    summary:
      'Bachelor of Technology, Computer Science and Engineering (Full Time) — Sep 2023 to May 2027',
    content: `
- CGPA: 9.16 / 10 (91.6%)
`,
  },
  {
    school: 'Sri Chaitanya Junior College',
    summary:
      'Class XII, State Board, MPC (Full Time) — May 2022 to Jun 2023',
    content: `
- Marks: 947 / 1000 (94.7%)
`,
  },
  {
    school: 'Sri Chaitanya Techno School',
    summary: 'Class X, State Board (Full Time) — May 2020 to Jun 2021',
    content: `
- Marks: 597 / 600 (99.5%)
`,
  },
]

function App() {
  return (
    <div className="min-h-screen p-8 lg:p-12">
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

        {/* Career Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Career Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <p className="flex-1 leading-relaxed">
                hallaluya praise the lord
              </p>
              <img
                src="/headshot-on-white.jpg"
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
                  <p className="mb-6 leading-relaxed">
                    {job.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                  <CardTitle className="text-xl">
                    {education.school}
                  </CardTitle>
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