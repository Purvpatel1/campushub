import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Briefcase, MapPin, Building2, Calendar, CheckCircle2, Search, ExternalLink } from 'lucide-react';

export const CareerPage: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const jobs = [
    { id: 'j1', title: 'Software Engineering Intern (Summer 2027)', company: 'Stripe', location: 'San Francisco, CA (Hybrid)', type: 'Internship', salary: '$55/hr', deadline: 'Aug 15, 2026', tags: ['React', 'TypeScript', 'API Design'] },
    { id: 'j2', title: 'Junior Full-Stack SaaS Developer', company: 'Linear', location: 'Remote', type: 'Full-Time', salary: '$120k - $140k', deadline: 'Aug 20, 2026', tags: ['Node.js', 'PostgreSQL', 'GraphQL'] },
    { id: 'j3', title: 'Product Design Intern', company: 'Figma', location: 'New York, NY', type: 'Internship', salary: '$48/hr', deadline: 'Aug 30, 2026', tags: ['Figma', 'UI/UX', 'Prototyping'] },
  ];

  const handleApply = (id: string) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-7 h-7 text-indigo-400" />
            <span>Career Hub & Recruitment Portal</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Exclusive campus recruiting, tech internships, and 1-click profile applications</p>
        </div>

        <Button variant="primary" leftIcon={<Briefcase className="w-4 h-4" />}>
          View Active Recruiters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search jobs, internships, companies..."
                className="w-full glass-input pl-9 pr-4 py-2.5 rounded-xl text-xs"
              />
            </div>
            <Button variant="secondary" size="sm">Filter</Button>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <Card key={job.id} className="border-slate-800 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" /> {job.company}
                      </span>
                      <Badge variant={job.type === 'Internship' ? 'cyan' : 'emerald'} size="sm">
                        {job.type}
                      </Badge>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">{job.salary}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mt-1">{job.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" /> Due {job.deadline}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3">
                      {job.tags.map((t) => (
                        <Badge key={t} variant="slate" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between gap-2">
                    <Button
                      size="sm"
                      variant={appliedJobs[job.id] ? 'secondary' : 'primary'}
                      leftIcon={appliedJobs[job.id] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
                      onClick={() => handleApply(job.id)}
                    >
                      {appliedJobs[job.id] ? 'Application Sent' : '1-Click Apply'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Profile Readiness & Recruiter Events */}
        <div className="space-y-4">
          <Card className="border-indigo-500/30">
            <h3 className="text-sm font-bold text-white">CampusOS Passport Readiness</h3>
            <p className="text-xs text-slate-400 mt-1">Your academic credentials & GitHub project links are auto-attached to applications.</p>

            <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-indigo-300 font-semibold">
                <span>Verified GPA: 3.88</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between text-indigo-300 font-semibold">
                <span>Transcript: Verified</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
