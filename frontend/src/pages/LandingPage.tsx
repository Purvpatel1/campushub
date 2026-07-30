import React from 'react';
import { useNavigate } from 'react-router-dom';
import { INSTITUTION_CONFIG } from '@/config/institution';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-4 md:p-8">
      {/* Top Institutional Header */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between py-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          {INSTITUTION_CONFIG.logoUrl ? (
            <img
              src={INSTITUTION_CONFIG.logoUrl}
              alt={INSTITUTION_CONFIG.name}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <GraduationCap className="w-5 h-5 text-zinc-400" />
          )}
          <span className="font-semibold text-xs tracking-tight text-zinc-200 font-mono truncate max-w-[280px]">
            {INSTITUTION_CONFIG.name}
          </span>
        </div>
      </header>

      {/* Main Institutional Entry Container */}
      <main className="max-w-md mx-auto w-full my-auto py-8">
        <Card className="p-8 bg-zinc-900/60 border-zinc-800 text-center space-y-6">
          {/* Emblem & Title */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-950 font-bold text-lg mx-auto shadow-sm">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-100">
                CampusHub
              </h1>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                {INSTITUTION_CONFIG.portalTitle}
              </p>
            </div>
          </div>

          {/* Welcome Prompt */}
          <div className="space-y-1 py-2 border-t border-b border-zinc-800/80">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Welcome to CampusHub.
            </p>
            <p className="text-xs text-zinc-400">
              Sign in to continue to your academic workspace.
            </p>
          </div>

          {/* Primary Action Button */}
          <Button
            size="lg"
            variant="primary"
            className="w-full py-3"
            onClick={() => navigate('/login')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </Card>
      </main>

      {/* Small Institutional Footer */}
      <footer className="max-w-md mx-auto w-full py-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-1">
        <span>Academic Year {INSTITUTION_CONFIG.academicYear}</span>
        <div className="flex items-center gap-3">
          <span className="hover:text-zinc-400 cursor-pointer">Contact Administrator</span>
          <span>•</span>
          <span>© CampusHub</span>
        </div>
      </footer>
    </div>
  );
};
