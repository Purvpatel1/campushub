import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { campusApi } from '@/services/api';
import type { Assignment } from '@/types';
import { FileCheck2, UploadCloud, Clock, FileText, CheckCircle2, Download, RefreshCw } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await campusApi.getAssignments();
      setAssignments(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const openFilePicker = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    fileInputRef.current?.click();
  };

  const handleTurnIn = () => {
    if (!selectedFile || !selectedAssignmentId) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((asg) =>
          asg.id === selectedAssignmentId
            ? {
                ...asg,
                status: 'submitted',
                submittedFileName: selectedFile.name,
                submittedFileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
                submittedAt: 'Just now',
              }
            : asg
        )
      );
      setIsSubmitting(false);
      setSubmissionNotice(`File "${selectedFile.name}" successfully submitted.`);
      setSelectedFile(null);
      setSelectedAssignmentId(null);
    }, 600);
  };

  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === 'all') return true;
    return item.status === activeTab;
  });

  if (loading) {
    return <div className="py-12 text-center text-zinc-500 text-xs font-mono">Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.cpp,.zip,.docx,.txt,.java,.py"
      />

      {/* Header Card */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-zinc-400" />
            <span>Assignments</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Coursework submission system and evaluation status.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded border border-zinc-800 text-xs font-mono text-zinc-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{assignments.filter((a) => a.status === 'pending').length} Pending</span>
        </div>
      </Card>

      {/* Submission Success Alert */}
      {submissionNotice && (
        <div className="p-3 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 flex items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{submissionNotice}</span>
          </div>
          <button onClick={() => setSubmissionNotice(null)} className="text-zinc-500 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-zinc-800 font-mono text-xs">
        {(['all', 'pending', 'submitted', 'graded'] as const).map((tab) => {
          const count = assignments.filter((a) => (tab === 'all' ? true : a.status === tab)).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded capitalize transition-colors flex items-center gap-2 border ${
                isActive
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-100 font-semibold'
                  : 'bg-zinc-950/60 border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Coursework List */}
      <div className="space-y-4">
        {filteredAssignments.map((item) => (
          <Card key={item.id} className="p-5 space-y-4 bg-zinc-900/60 border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-bold text-indigo-400">{item.courseCode}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{item.courseName}</span>
                <Badge variant={item.status === 'graded' ? 'emerald' : item.status === 'submitted' ? 'slate' : 'amber'} size="sm">
                  {item.status.toUpperCase()}
                </Badge>
              </div>

              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-500" /> Due: {item.dueDate} ({item.dueTime})
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{item.description}</p>
            </div>

            {/* Permanent Submitted File View Box */}
            {item.submittedFileName && (
              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-200 font-mono">{item.submittedFileName}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      Uploaded {item.submittedAt} • {item.submittedFileSize}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    onClick={() => alert(`Downloading ${item.submittedFileName}`)}
                  >
                    View File
                  </Button>
                  {item.status === 'submitted' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                      onClick={() => openFilePicker(item.id)}
                    >
                      Replace File
                    </Button>
                  )}
                </div>
              </div>
            )}

            {item.feedback && (
              <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                <span className="font-mono text-zinc-400 font-semibold">Faculty Feedback:</span>
                <p className="mt-0.5 text-zinc-300 font-sans">"{item.feedback}"</p>
              </div>
            )}

            {/* Submission Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-zinc-800 gap-2">
              <div className="text-xs font-mono text-zinc-400">
                Points: <strong className="text-zinc-200">{item.points} pts</strong>
                {item.grade !== undefined && (
                  <span className="ml-3 text-emerald-400 font-bold">
                    Score: {item.grade}/{item.points}
                  </span>
                )}
              </div>

              {item.status === 'pending' && (
                <div className="flex items-center gap-2">
                  {selectedAssignmentId === item.id && selectedFile ? (
                    <Button
                      size="sm"
                      variant="primary"
                      isLoading={isSubmitting}
                      onClick={handleTurnIn}
                    >
                      Confirm "{selectedFile.name}"
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
                      onClick={() => openFilePicker(item.id)}
                    >
                      Upload File
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
