import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INSTITUTION_CONFIG } from '@/config/institution';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('2023CSB042');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Institutional Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-950 font-bold text-base mx-auto shadow-sm">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-100">
              CampusHub
            </h1>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              {INSTITUTION_CONFIG.name}
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Student ID / Email Field */}
            <div>
              <label htmlFor="student-id" className="block text-zinc-300 mb-1.5 font-medium">
                Student ID / Email
              </label>
              <input
                id="student-id"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input-base px-3 py-2.5 font-mono text-zinc-100 focus:outline-none focus:border-zinc-500"
                placeholder="2023CSB042 or student@campushub.edu"
                required
                autoFocus
              />
            </div>

            {/* Password Field with Eye Visibility Toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-zinc-300 font-medium">
                  Password
                </label>
              </div>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-base pl-3 pr-10 py-2.5 font-mono text-zinc-100 focus:outline-none focus:border-zinc-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded focus:outline-none focus:ring-1 focus:ring-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>
        </Card>

        {/* Return link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Return to Portal Welcome
          </button>
        </div>
      </div>
    </div>
  );
};
