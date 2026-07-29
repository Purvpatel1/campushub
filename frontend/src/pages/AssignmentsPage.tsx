import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileCheck2, UploadCloud, Clock, FileText, CornerDownLeft } from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [fileUploaded, setFileUploaded] = useState(false);

  const assignmentsList = [
    { id: '1', course: 'CS301', title: 'Binary Search Tree & AVL Balancing', dueDate: 'Today, 5:00 PM', points: 100, status: 'pending', description: 'Implement C++ AVL tree with balance factor rotations and export performance metrics.' },
    { id: '2', course: 'PHY202', title: 'Quantum Tunneling Problem Set 3', dueDate: 'Tomorrow, 11:59 PM', points: 50, status: 'submitted', grade: 48, description: 'Solve Schrödinger equation step potentials for energy states E < V0.' },
    { id: '3', course: 'MATH305', title: 'Matrix Eigenvalues & Eigenvectors', dueDate: 'Aug 02, 2026', points: 75, status: 'graded', grade: 72, feedback: 'Great work on part 2. Minor calculation error in characteristic polynomial.' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" />
            <span>Assignments & Grading</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Submit coursework or evaluate student submissions</p>
        </div>

        {user.role === 'faculty' && (
          <Button variant="primary" leftIcon={<FileCheck2 className="w-3.5 h-3.5" />}>
            Create Assignment
          </Button>
        )}
      </div>

      {user.role === 'faculty' ? (
        /* Faculty Grading Workbench */
        <Card>
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-sm font-semibold text-white">Faculty Grading Workbench (CS301 Lab 3)</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Use <kbd className="font-mono bg-zinc-800 px-1 py-0.5 rounded text-indigo-400 border border-zinc-700">Tab</kbd> to navigate, <kbd className="font-mono bg-zinc-800 px-1 py-0.5 rounded text-indigo-400 border border-zinc-700">Enter</kbd> to save score</p>
            </div>
            <Badge variant="indigo" size="sm">24 Submissions Pending</Badge>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="text-[11px] uppercase font-mono bg-zinc-950 text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="px-3 py-2.5">Student</th>
                  <th className="px-3 py-2.5">Submission File</th>
                  <th className="px-3 py-2.5">Timestamp</th>
                  <th className="px-3 py-2.5">Score (/100)</th>
                  <th className="px-3 py-2.5">Feedback</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                <tr className="hover:bg-zinc-800/40">
                  <td className="px-3 py-2 font-sans font-medium text-white">Alex Chen</td>
                  <td className="px-3 py-2 text-indigo-400 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> avl_tree_lab3.cpp</td>
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
        /* Student View */
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
                        <strong className="text-emerald-400">Feedback:</strong> "{item.feedback}"
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
                      <Button size="sm">
                        Submit Assignment
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Submission Uploader Panel */}
          <div>
            <Card>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-indigo-400" />
                <span>Upload Submission</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">PDF, CPP, ZIP, DOCX (Max 25MB)</p>

              <div
                onClick={() => setFileUploaded(true)}
                className={`mt-3 p-5 rounded-lg border border-dashed text-center cursor-pointer transition-colors ${
                  fileUploaded
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400'
                }`}
              >
                {fileUploaded ? (
                  <div className="space-y-1">
                    <FileText className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-semibold text-xs text-white">lab3_solution_alex_chen.cpp</p>
                    <p className="text-[11px] text-emerald-400">Ready to submit</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto" />
                    <p className="font-medium text-xs text-zinc-200">Click or drag file</p>
                    <p className="text-[11px] text-zinc-500">Receipt generated on upload</p>
                  </div>
                )}
              </div>

              {fileUploaded && (
                <Button
                  variant="primary"
                  className="w-full mt-3"
                  leftIcon={<CornerDownLeft className="w-3.5 h-3.5" />}
                  onClick={() => alert('Assignment successfully submitted with timestamp #CS301-SUB-88219')}
                >
                  Turn In Assignment
                </Button>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
