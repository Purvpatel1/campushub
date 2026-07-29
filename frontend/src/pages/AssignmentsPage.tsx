import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileCheck2, UploadCloud, Clock, FileText, CornerDownLeft, CheckCircle2, Trash2 } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const assignmentsList = [
    { id: '1', course: 'CS301', title: 'Binary Search Tree & AVL Balancing', dueDate: 'Today, 5:00 PM', points: 100, status: 'pending', description: 'Implement C++ AVL tree with balance factor rotations and export performance metrics.' },
    { id: '2', course: 'PHY202', title: 'Quantum Tunneling Problem Set 3', dueDate: 'Tomorrow, 11:59 PM', points: 50, status: 'submitted', grade: 48, description: 'Solve Schrödinger equation step potentials for energy states E < V0.' },
    { id: '3', course: 'MATH305', title: 'Matrix Eigenvalues & Eigenvectors', dueDate: 'Aug 02, 2026', points: 75, status: 'graded', grade: 72, feedback: 'Great work on part 2. Minor calculation error in characteristic polynomial.', description: 'Compute characteristic polynomial roots and orthogonal eigenvectors.' },
  ];

  // Handle actual file selection from laptop/device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setSubmissionSuccess(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleTurnIn = () => {
    if (!selectedFile) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-5">
      {/* Hidden real file input element */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.cpp,.zip,.docx,.txt,.java,.py"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <span>
              {user.role === 'faculty' ? 'Faculty Grading Workbench' : 'Course Assignments'}
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            {user.role === 'faculty'
              ? 'Evaluate student submissions and issue grades'
              : 'Submit coursework by selecting files directly from your device'}
          </p>
        </div>

        {user.role === 'faculty' && (
          <Button variant="primary" leftIcon={<FileCheck2 className="w-3.5 h-3.5" />}>
            Create New Assignment
          </Button>
        )}
      </div>

      {/* FACULTY PERSPECTIVE: GRADING WORKBENCH TABLE */}
      {user.role === 'faculty' ? (
        <Card>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-sm font-semibold text-white">CS301 Lab 3 Evaluation Queue</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Use <kbd className="font-mono bg-zinc-800 px-1 py-0.5 rounded text-indigo-400 border border-zinc-700">Tab</kbd> to navigate, <kbd className="font-mono bg-zinc-800 px-1 py-0.5 rounded text-indigo-400 border border-zinc-700">Enter</kbd> to save score
              </p>
            </div>
            <Badge variant="indigo" size="sm">24 Pending</Badge>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[11px] uppercase font-mono bg-zinc-950 text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="px-3 py-2.5">Student</th>
                  <th className="px-3 py-2.5">Uploaded Device File</th>
                  <th className="px-3 py-2.5">Timestamp</th>
                  <th className="px-3 py-2.5">Score (/100)</th>
                  <th className="px-3 py-2.5">Faculty Feedback</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                <tr className="hover:bg-zinc-800/40">
                  <td className="px-3 py-2 font-sans font-medium text-white">Alex Chen</td>
                  <td className="px-3 py-2 text-indigo-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> avl_tree_lab3.cpp (42.1 KB)
                  </td>
                  <td className="px-3 py-2 text-zinc-400">04:12 PM (On Time)</td>
                  <td className="px-3 py-2">
                    <input type="number" defaultValue={95} className="w-16 input-base py-1 px-2 text-emerald-400 font-bold" />
                  </td>
                  <td className="px-3 py-2">
                    <input type="text" defaultValue="Clean rotation logic & comments!" className="w-full input-base py-1 px-2 text-zinc-200 font-sans" />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Button size="sm" variant="primary">Save</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* STUDENT PERSPECTIVE: ASSIGNMENT SUBMISSION PORTAL */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {assignmentsList.map((item) => (
              <Card key={item.id}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-indigo-400">{item.course}</span>
                      <Badge
                        variant={item.status === 'graded' ? 'emerald' : item.status === 'submitted' ? 'indigo' : 'amber'}
                        size="sm"
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-amber-400" /> {item.dueDate}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xl">{item.description}</p>

                    {item.feedback && (
                      <div className="mt-2.5 p-2 rounded-md bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                        <strong className="text-emerald-400">Instructor Feedback:</strong> "{item.feedback}"
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end justify-between gap-2">
                    {item.grade !== undefined && (
                      <div className="text-right font-mono">
                        <span className="text-xl font-bold text-emerald-400">{item.grade}</span>
                        <span className="text-xs text-zinc-500">/{item.points}</span>
                      </div>
                    )}

                    {item.status === 'pending' && (
                      <Button size="sm" onClick={triggerFileInput}>
                        Select File & Submit
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* REAL DEVICE FILE UPLOADER PANEL */}
          <div>
            <Card>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-indigo-400" />
                <span>Device File Upload</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">Select PDF, CPP, ZIP, DOCX from your computer</p>

              {/* Clickable Dropzone triggering device file picker */}
              <div
                onClick={triggerFileInput}
                className={`mt-3 p-5 rounded-lg border border-dashed text-center cursor-pointer transition-colors ${
                  selectedFile
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400'
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-1">
                    <FileText className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-semibold text-xs text-white truncate max-w-[200px] mx-auto">{selectedFile.name}</p>
                    <p className="text-[11px] font-mono text-emerald-400">{formatFileSize(selectedFile.size)} • Selected from device</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto" />
                    <p className="font-medium text-xs text-zinc-200">Click to choose file from laptop/device</p>
                    <p className="text-[11px] text-zinc-500">Accepts files up to 25MB</p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-zinc-500 hover:text-rose-400"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    isLoading={isSubmitting}
                    leftIcon={<CornerDownLeft className="w-3.5 h-3.5" />}
                    onClick={handleTurnIn}
                  >
                    Turn In Assignment
                  </Button>
                </div>
              )}

              {submissionSuccess && (
                <div className="mt-3 p-2.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Assignment Submitted!</p>
                    <p className="text-[10px] opacity-90 font-mono">Timestamp receipt: #CS301-SUB-88219</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
