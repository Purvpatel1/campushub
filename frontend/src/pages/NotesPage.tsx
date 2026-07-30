import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { campusApi } from '@/services/api';
import type { SubjectMaterial } from '@/types';
import { BookOpen, Search, Download, FileText, Presentation, HelpCircle, Code, ExternalLink, Folder } from 'lucide-react';

const SUBJECTS = [
  { code: 'ALL', name: 'All Subjects' },
  { code: 'DBMS', name: 'Database Management Systems' },
  { code: 'OS', name: 'Operating Systems' },
  { code: 'CN', name: 'Computer Networks' },
  { code: 'OOP', name: 'Object Oriented Programming' },
  { code: 'AOA', name: 'Analysis of Algorithms' },
];

export const NotesPage: React.FC = () => {
  const [materials, setMaterials] = useState<SubjectMaterial[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'pdf' | 'ppt' | 'pyq' | 'lab'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await campusApi.getSubjectMaterials();
      setMaterials(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const getTypeIcon = (type: SubjectMaterial['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-rose-400" />;
      case 'ppt': return <Presentation className="w-4 h-4 text-amber-400" />;
      case 'pyq': return <HelpCircle className="w-4 h-4 text-indigo-400" />;
      case 'lab': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'link': return <ExternalLink className="w-4 h-4 text-emerald-400" />;
      default: return <FileText className="w-4 h-4 text-zinc-400" />;
    }
  };

  const filteredMaterials = materials.filter((item) => {
    const matchesSubject = selectedSubject === 'ALL' || item.subjectCode === selectedSubject;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTypeFilter === 'all' || item.type === activeTypeFilter;
    return matchesSubject && matchesQuery && matchesType;
  });

  if (loading) {
    return <div className="py-12 text-center text-zinc-500 text-xs font-mono">Loading course materials...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-zinc-400" />
            <span>Course Notes & Materials</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Digital subject folders for lecture PDFs, PPT slides, PYQs, and lab manuals.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 text-xs font-mono text-zinc-400">
          <Folder className="w-3.5 h-3.5" />
          <span>Semester 6 • 5 Subjects</span>
        </div>
      </Card>

      {/* Subject Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-800 font-mono text-xs">
        {SUBJECTS.map((sub) => {
          const isActive = selectedSubject === sub.code;
          const count = materials.filter((m) => sub.code === 'ALL' || m.subjectCode === sub.code).length;
          return (
            <button
              key={sub.code}
              onClick={() => setSelectedSubject(sub.code)}
              className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-2 border ${
                isActive
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-semibold'
                  : 'bg-zinc-950/60 border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{sub.code}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-zinc-900/60 p-2.5 rounded border border-zinc-800">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search material title or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 text-xs text-zinc-200 placeholder-zinc-500 pl-8 pr-3 py-1.5 rounded border border-zinc-800 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto">
          {(['all', 'pdf', 'ppt', 'pyq', 'lab'] as const).map((type) => {
            const isActive = activeTypeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setActiveTypeFilter(type)}
                className={`px-2.5 py-1 rounded uppercase transition-colors border ${
                  isActive
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-semibold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Files List */}
      <div className="space-y-3">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((item) => (
            <Card
              key={item.id}
              className="p-4 bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 mt-0.5">
                  {getTypeIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-indigo-400">{item.subjectCode}</span>
                    <span className="text-zinc-600">•</span>
                    <Badge variant="slate" size="sm" className="uppercase">
                      {item.type}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                  <p className="text-[11px] font-mono text-zinc-500">
                    Uploaded {item.uploadedAt} • {item.fileSize}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={<Download className="w-3.5 h-3.5 text-zinc-400" />}
                  onClick={() => alert(`Opening ${item.title}`)}
                >
                  Download
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center text-zinc-500 text-xs font-mono">
            No course materials found for "{selectedSubject}".
          </Card>
        )}
      </div>
    </div>
  );
};
