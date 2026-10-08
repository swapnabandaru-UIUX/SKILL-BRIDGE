import React from 'react';
import { ScreenId } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  UserCheck, 
  Briefcase, 
  Cpu, 
  BarChart3, 
  Milestone,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedStep?: number;
}

const STEPS: { id: ScreenId; stepNumber: number; title: string; shortTitle: string; icon: React.ElementType }[] = [
  { id: 'current-skills', stepNumber: 1, title: 'Current Skills', shortTitle: '1. Skills', icon: UserCheck },
  { id: 'target-role', stepNumber: 2, title: 'Target Job Role', shortTitle: '2. Role', icon: Briefcase },
  { id: 'ai-analysis', stepNumber: 3, title: 'AI Analysis', shortTitle: '3. Analysis', icon: Cpu },
  { id: 'gap-dashboard', stepNumber: 4, title: 'Skill Gap Dashboard', shortTitle: '4. Dashboard', icon: BarChart3 },
  { id: 'career-roadmap', stepNumber: 5, title: 'Career Roadmap', shortTitle: '5. Roadmap', icon: Milestone },
];

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const activeStepObj = STEPS.find((s) => s.id === currentScreen) || STEPS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('current-skills')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">SkillGap<span className="text-indigo-600 font-extrabold">AI</span></span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Skill Gap Analyzer
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">Personalized Learning & Career Readiness</p>
            </div>
          </div>

          {/* Stepper Navigation - All 5 steps fully clickable & functional */}
          <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
            {STEPS.map((step) => {
              const isActive = currentScreen === step.id;
              const isPassed = step.stepNumber < activeStepObj.stepNumber;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onNavigate(step.id)}
                  className={`relative flex items-center gap-2 px-2.5 py-1.5 md:px-3.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                      : isPassed
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={`Open ${step.title}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : isPassed 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.stepNumber}
                  </span>

                  <span className="hidden lg:inline">{step.title}</span>
                  <span className="hidden sm:inline lg:hidden">{step.shortTitle}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile step bar with quick navigation */}
      <div className="sm:hidden px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          Step <span className="font-bold text-slate-900">{activeStepObj.stepNumber}</span> of 5:
        </span>
        <div className="flex items-center gap-2">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                s.id === currentScreen
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {s.stepNumber}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
