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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-7 h-7 text-amber-400" />
            <span>Assignments & Grading Workbench</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Submit coursework or grade student submissions with keyboard speed</p>
        </div>

        {user.role === 'faculty' && (
          <Button variant="primary" leftIcon={<FileCheck2 className="w-4 h-4" />}>
            Create New Assignment
          </Button>
        )}
      </div>

      {user.role === 'faculty' ? (
        /* Faculty Keyboard Grading Workbench */
        <Card className="border-indigo-500/30">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Faculty Grading Workbench (CS301 Lab 3)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Use <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-indigo-400 border border-slate-700">Tab</kbd> to move fields, <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-indigo-400 border border-slate-700">Enter</kbd> to auto-save grade</p>
            </div>
            <Badge variant="indigo" size="sm">24 Submissions Pending</Badge>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Submission File</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Score (/100)</th>
                  <th className="px-4 py-3">Faculty Feedback</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-sans font-semibold text-white">Alex Chen</td>
                  <td className="px-4 py-3 text-indigo-400 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> avl_tree_lab3.cpp</td>
                  <td className="px-4 py-3 text-slate-400">04:12 PM (On Time)</td>
                  <td className="px-4 py-3">
                    <input type="number" defaultValue={95} className="w-16 glass-input px-2 py-1 rounded text-emerald-400 font-bold" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="text" defaultValue="Clean rotation logic & comments!" className="w-full glass-input px-2 py-1 rounded text-slate-200 font-sans" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="primary">Save</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Student Assignment Submissions */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {assignmentsList.map((item) => (
              <Card key={item.id} className="border-slate-800 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-indigo-400">{item.course}</span>
                      <Badge
                        variant={item.status === 'graded' ? 'emerald' : item.status === 'submitted' ? 'indigo' : 'amber'}
                        size="sm"
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {item.dueDate}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">{item.description}</p>

                    {item.feedback && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-emerald-400">Instructor Feedback:</strong> "{item.feedback}"
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end justify-between gap-2">
                    {item.grade !== undefined && (
                      <div className="text-right">
                        <span className="text-2xl font-black text-emerald-400">{item.grade}</span>
                        <span className="text-xs text-slate-500">/{item.points}</span>
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

          {/* Drag and Drop Submission Modal Panel */}
          <div className="space-y-4">
            <Card className="border-indigo-500/30">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-400" />
                <span>Upload Submission</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Accepts PDF, CPP, ZIP, DOCX (Max 25MB)</p>

              <div
                onClick={() => setFileUploaded(true)}
                className={`mt-4 p-6 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                  fileUploaded
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-800 hover:border-indigo-500/50 bg-slate-900/40 text-slate-400'
                }`}
              >
                {fileUploaded ? (
                  <div className="space-y-2">
                    <FileText className="w-10 h-10 text-emerald-400 mx-auto" />
                    <p className="font-bold text-sm text-white">lab3_solution_alex_chen.cpp</p>
                    <p className="text-xs text-emerald-400">File uploaded • Ready for turn-in</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto animate-bounce" />
                    <p className="font-bold text-sm text-slate-200">Click or drag file to upload</p>
                    <p className="text-xs text-slate-500">Cryptographic timestamp receipt generated on submission</p>
                  </div>
                )}
              </div>

              {fileUploaded && (
                <Button
                  variant="primary"
                  className="w-full mt-4"
                  leftIcon={<CornerDownLeft className="w-4 h-4" />}
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
