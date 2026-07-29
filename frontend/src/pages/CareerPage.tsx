import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Briefcase, MapPin, Building2, Calendar, CheckCircle2, Search } from 'lucide-react';

export const CareerPage: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const jobs = [
    { id: 'j1', title: 'Software Engineering Intern', company: 'Stripe', location: 'San Francisco, CA', type: 'Internship', salary: '$55/hr', deadline: 'Aug 15, 2026', tags: ['React', 'TypeScript', 'API'] },
    { id: 'j2', title: 'Junior Full-Stack Developer', company: 'Linear', location: 'Remote', type: 'Full-Time', salary: '$120k - $140k', deadline: 'Aug 20, 2026', tags: ['Node.js', 'PostgreSQL'] },
    { id: 'j3', title: 'Product Design Intern', company: 'Figma', location: 'New York, NY', type: 'Internship', salary: '$48/hr', deadline: 'Aug 30, 2026', tags: ['Figma', 'UI/UX'] },
  ];

  const handleApply = (id: string) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Career Hub</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Campus recruiting and 1-click profile applications</p>
        </div>

        <Button variant="primary" leftIcon={<Briefcase className="w-3.5 h-3.5" />}>
          View Recruiters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full input-base pl-8 py-1.5 text-xs"
              />
            </div>
            <Button variant="secondary" size="sm">Filter</Button>
          </div>

          <div className="space-y-2">
            {jobs.map((job) => (
              <Card key={job.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-white flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-indigo-400" /> {job.company}
                      </span>
                      <Badge variant={job.type === 'Internship' ? 'cyan' : 'emerald'} size="sm">
                        {job.type}
                      </Badge>
                      <span className="text-xs font-mono text-emerald-400 font-medium">{job.salary}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-white">{job.title}</h3>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-zinc-500" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-zinc-500" /> {job.deadline}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      {job.tags.map((t) => (
                        <Badge key={t} variant="slate" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between gap-2">
                    <Button
                      size="sm"
                      variant={appliedJobs[job.id] ? 'secondary' : 'primary'}
                      leftIcon={appliedJobs[job.id] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : undefined}
                      onClick={() => handleApply(job.id)}
                    >
                      {appliedJobs[job.id] ? 'Applied' : '1-Click Apply'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Profile Readiness */}
        <div>
          <Card>
            <h3 className="text-xs font-semibold text-white">CampusOS Profile Readiness</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Verified credentials automatically attached.</p>

            <div className="mt-3 p-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-xs space-y-1">
              <div className="flex items-center justify-between text-zinc-300 font-mono">
                <span>Verified GPA: 3.88</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between text-zinc-300 font-mono">
                <span>Transcript: Verified</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
