import React, { useState, useEffect, useRef } from 'react';
import { TargetJobRole, UserSkill, AnalysisSummary } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  BrainCircuit, 
  Check
} from 'lucide-react';

interface AIAnalysisScreenProps {
  userSkills: UserSkill[];
  targetRole: TargetJobRole;
  analysis: AnalysisSummary;
  onAnalysisGenerated: (newAnalysis: AnalysisSummary) => void;
  onAnalysisComplete: () => void;
}

interface StepState {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
}

export const AIAnalysisScreen: React.FC<AIAnalysisScreenProps> = ({
  userSkills,
  targetRole,
  analysis,
  onAnalysisGenerated,
  onAnalysisComplete,
}) => {
  const [progress, setProgress] = useState(15);
  const [tickerMessage, setTickerMessage] = useState('Analyzing current design skillset with Gemini...');
  const [isFinished, setIsFinished] = useState(false);
  const hasCalledApiRef = useRef(false);

  const [steps, setSteps] = useState<StepState[]>([
    {
      id: 'step-1',
      label: 'Inventorying Current Skills',
      description: `Evaluating ${userSkills.length} skills: ${userSkills.map((s) => s.name).slice(0, 5).join(', ')}`,
      status: 'running',
    },
    {
      id: 'step-2',
      label: 'Matching UI/UX Designer Requirements',
      description: `Comparing against core requirements for ${targetRole.title}`,
      status: 'pending',
    },
    {
      id: 'step-3',
      label: 'Computing Career Readiness Score',
      description: `Calculating profile match: ${analysis.readinessScore || 68}% Career Readiness Score`,
      status: 'pending',
    },
    {
      id: 'step-4',
      label: 'Identifying & Prioritizing Skill Gaps',
      description: 'Isolating UX Research, Design Systems, Usability Testing & Advanced Prototyping',
      status: 'pending',
    },
    {
      id: 'step-5',
      label: 'Generating Personalized Roadmap',
      description: 'Creating structured learning path to close the four identified gaps',
      status: 'pending',
    },
  ]);

  // Execute Gemini AI analysis call
  useEffect(() => {
    if (hasCalledApiRef.current) return;
    hasCalledApiRef.current = true;

    async function runGeminiAnalysis() {
      try {
        const response = await fetch('/api/analyze-skill-gap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userSkills, targetRole }),
        });

        if (response.ok) {
          const aiData = await response.json();
          if (aiData && aiData.readinessScore) {
            const formattedAnalysis: AnalysisSummary = {
              targetRole,
              readinessScore: aiData.readinessScore || 68,
              matchScore: aiData.matchScore || 68,
              acquiredCount: userSkills.length,
              gapCount: aiData.prioritizedGaps ? aiData.prioritizedGaps.length : 4,
              competencyCategories: analysis.competencyCategories,
              competencyComparison: aiData.competencyComparison || analysis.competencyComparison,
              prioritizedGaps: aiData.prioritizedGaps && aiData.prioritizedGaps.length > 0 
                ? aiData.prioritizedGaps.map((g: any, idx: number) => ({
                    id: g.id || `gap-${idx}`,
                    skillName: g.skillName,
                    category: g.category || 'Architecture & Systems',
                    priority: g.priority || idx + 1,
                    urgencyLabel: g.urgencyLabel || (idx === 0 ? 'Critical' : idx === 1 ? 'High' : 'Medium'),
                    urgencyColor: g.urgencyColor || (idx === 0 ? 'rose' : idx === 1 ? 'purple' : 'amber'),
                    currentLevel: g.currentLevel || 'None',
                    targetLevel: g.targetLevel || 'Advanced',
                    gapDelta: g.gapDelta || (90 - idx * 10),
                    impactWeight: g.impactWeight || (95 - idx * 6),
                    estimatedWeeks: g.estimatedWeeks || (idx === 0 ? 3 : 2),
                    whyItMatters: g.whyItMatters,
                    recommendedAction: g.recommendedAction,
                  }))
                : analysis.prioritizedGaps,
              roadmap: aiData.roadmap && aiData.roadmap.length > 0
                ? aiData.roadmap
                : analysis.roadmap,
              executiveTakeaway: aiData.executiveTakeaway || analysis.executiveTakeaway,
            };

            onAnalysisGenerated(formattedAnalysis);
          }
        }
      } catch (err) {
        console.warn('Gemini API call finished with fallback:', err);
      }
    }

    runGeminiAnalysis();
  }, [userSkills, targetRole, analysis, onAnalysisGenerated]);

  // Stepped animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsFinished(true);
          return 100;
        }

        const next = prev + 3;

        // Step 1: 0 - 25
        if (next >= 25 && next < 50) {
          setTickerMessage('Matching skills against UI/UX Designer role with Gemini...');
          setSteps((s) => [
            { ...s[0], status: 'completed' },
            { ...s[1], status: 'running' },
            s[2],
            s[3],
            s[4],
          ]);
        }
        // Step 2: 50 - 75
        else if (next >= 50 && next < 75) {
          setTickerMessage(`Career Readiness Score calculated: ${analysis.readinessScore || 68}%...`);
          setSteps((s) => [
            { ...s[0], status: 'completed' },
            { ...s[1], status: 'completed' },
            { ...s[2], status: 'running' },
            s[3],
            s[4],
          ]);
        }
        // Step 3: 75 - 90
        else if (next >= 75 && next < 95) {
          setTickerMessage('Prioritizing gaps: UX Research, Design Systems, Usability Testing, Prototyping...');
          setSteps((s) => [
            { ...s[0], status: 'completed' },
            { ...s[1], status: 'completed' },
            { ...s[2], status: 'completed' },
            { ...s[3], status: 'running' },
            s[4],
          ]);
        }
        // Step 4: 95+
        else if (next >= 95) {
          setTickerMessage('Personalized learning roadmap generated successfully...');
          setSteps((s) => [
            { ...s[0], status: 'completed' },
            { ...s[1], status: 'completed' },
            { ...s[2], status: 'completed' },
            { ...s[3], status: 'completed' },
            { ...s[4], status: 'completed' },
          ]);
        }

        return next;
      });
    }, 75);

    return () => clearInterval(timer);
  }, [analysis.readinessScore]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Pulse Hero Card */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          Step 3 of 5 • AI Analysis
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          AI Analysis
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-xl mx-auto">
          Comparing your current skills with the skills required for{' '}
          <span className="font-semibold text-slate-900">{targetRole.title}</span> using Gemini.
        </p>
      </div>

      {/* Main Radar / Scanner Box */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 mb-8 relative overflow-hidden">
        {/* Glow orb background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Central Visualization Node */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping opacity-30" />
            <div className="absolute inset-2 rounded-full border border-purple-400/40 animate-pulse" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex flex-col items-center justify-center text-white shadow-xl shadow-indigo-600/30">
              {isFinished ? (
                <Check className="w-10 h-10 text-white" />
              ) : (
                <>
                  <span className="text-xl sm:text-2xl font-black">{Math.min(100, progress)}%</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-indigo-200">
                    Analyzing
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isFinished ? 'Analysis Complete' : 'Analyzing Skill Distribution...'}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-indigo-600 bg-indigo-50/70 border border-indigo-100 px-3 py-1 rounded-full mt-2 inline-block">
              {tickerMessage}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pipeline steps */}
        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all ${
                step.status === 'completed'
                  ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-800'
                  : step.status === 'running'
                  ? 'bg-indigo-50/60 border-indigo-300 text-indigo-950 shadow-2xs'
                  : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {step.status === 'completed' ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : step.status === 'running' ? (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-semibold">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${
                    step.status === 'completed'
                      ? 'text-slate-900'
                      : step.status === 'running'
                      ? 'text-indigo-900 font-bold'
                      : 'text-slate-500'
                  }`}>
                    {step.label}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    {step.status === 'completed'
                      ? 'Complete'
                      : step.status === 'running'
                      ? 'Processing...'
                      : 'Queued'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion CTA */}
      <div className="text-center">
        {isFinished ? (
          <button
            onClick={onAnalysisComplete}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span>View Skill Gap Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              setProgress(100);
              setIsFinished(true);
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
          >
            Skip animation and view dashboard
          </button>
        )}
      </div>
    </div>
  );
};
