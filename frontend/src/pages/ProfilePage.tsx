import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { User, Mail, Phone, GraduationCap, Hash, Layers } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Student Identity Card */}
      <Card className="p-6 bg-zinc-900/60 border-zinc-800 flex items-center gap-5">
        <Avatar name={user.name} roleBadge="student" size="lg" className="w-16 h-16 text-lg" />
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Badge variant="slate" size="sm">
              ID: {user.studentId}
            </Badge>
            <Badge variant="indigo" size="sm">
              Div {user.division} • Roll {user.rollNumber}
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight">{user.name}</h1>
          <p className="text-xs text-zinc-400">
            {user.department} • {user.semester}
          </p>
        </div>
      </Card>

      {/* Private Personal Details */}
      <Card className="p-5 space-y-4 bg-zinc-900/60 border-zinc-800">
        <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-zinc-500" />
          <span>Student Information Record</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <User className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Full Name</p>
              <p className="font-semibold text-zinc-200">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <Hash className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Student ID</p>
              <p className="font-semibold text-zinc-200 font-mono">{user.studentId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <GraduationCap className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Department</p>
              <p className="font-semibold text-zinc-200">{user.department}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <Layers className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Semester & Division</p>
              <p className="font-semibold text-zinc-200">{user.semester} (Division {user.division}, Roll #{user.rollNumber})</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Institutional Email</p>
              <p className="font-semibold text-zinc-200 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-zinc-950 border border-zinc-800">
            <Phone className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase">Contact Phone</p>
              <p className="font-semibold text-zinc-200 font-mono">{user.phone}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
