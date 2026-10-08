import React from 'react';
import { AnalysisSummary, TargetJobRole, UserSkill } from '../types';
import { 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Zap,
  Milestone
} from 'lucide-react';

interface SkillGapDashboardScreenProps {
  analysis: AnalysisSummary;
  selectedRole: TargetJobRole;
  userSkills: UserSkill[];
  onBack: () => void;
  onProceed: () => void;
}

export const SkillGapDashboardScreen: React.FC<SkillGapDashboardScreenProps> = ({
  analysis,
  selectedRole,
  userSkills,
  onBack,
  onProceed,
}) => {
  // Use AI evaluated readiness score (defaults to 68% for standard baseline)
  const readiness = analysis.readinessScore || 68;

  const comparisonItems = analysis.competencyComparison && analysis.competencyComparison.length > 0
    ? analysis.competencyComparison
    : [
        { name: 'Figma', current: 95, target: 95, status: 'Mastered' },
        { name: 'Photoshop', current: 90, target: 70, status: 'Mastered' },
        { name: 'Illustrator', current: 85, target: 75, status: 'Proficient' },
        { name: 'Wireframing', current: 80, target: 88, status: 'Proficient' },
        { name: 'Basic UI Design', current: 82, target: 90, status: 'Proficient' },
        { name: 'UX Research', current: 15, target: 92, status: 'Critical Gap' },
        { name: 'Design Systems', current: 20, target: 94, status: 'High Gap' },
        { name: 'Usability Testing', current: 18, target: 86, status: 'Medium Gap' },
        { name: 'Advanced Prototyping', current: 30, target: 84, status: 'Medium Gap' },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
          <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
          Step 4 of 5 • Skill Gap Dashboard
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Skill Gap Dashboard
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-3xl leading-relaxed">
              Comparison between your current skillset and the requirements for the{' '}
              <span className="font-semibold text-slate-900">{selectedRole.title}</span> role.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onProceed}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all shrink-0"
            >
              <span>View Career Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        {/* Career Readiness Score Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Career Readiness Score
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              AI Evaluated
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {readiness}%
            </span>
            <div className="text-xs font-medium text-slate-500">
              <span className="text-indigo-600 font-semibold block">Solid Foundation</span>
              Goal: 100% via Roadmap
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* Current Skills Matched */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Current Skills Acquired
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Matched
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 tracking-tight">
              {userSkills.length}
            </span>
            <span className="text-sm text-slate-500 font-medium">skills present</span>
          </div>

          <div className="text-xs text-slate-600 truncate">
            Figma, Photoshop, Illustrator, Wireframing, Basic UI
          </div>
        </div>

        {/* Identified Skill Gaps */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Identified Skill Gaps
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              To Develop
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-rose-600 tracking-tight">
              4
            </span>
            <span className="text-sm text-slate-500 font-medium">high-priority gaps</span>
          </div>

          <div className="text-xs text-rose-700 font-medium truncate">
            UX Research, Design Systems, Usability, Prototyping
          </div>
        </div>

        {/* Learning Pathway Duration */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Learning Roadmap
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Personalized
            </span>
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-black text-purple-600 tracking-tight">
              8
            </span>
            <span className="text-sm text-slate-500 font-medium">weeks to close gaps</span>
          </div>

          <div className="text-xs text-slate-600">
            Projected readiness upon completion:{' '}
            <span className="font-bold text-slate-900">100%</span>
          </div>
        </div>
      </div>

      {/* AI Analysis Summary Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-md mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-indigo-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                AI Summary & Findings
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-800 text-indigo-200 font-medium">
                UI/UX Designer Profile
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              You possess strong visual foundations in <strong className="text-white">Figma, Photoshop, Illustrator, Wireframing, and Basic UI Design</strong>. 
              To become fully qualified for the <strong className="text-white">UI/UX Designer</strong> role, you need to develop expertise in <strong className="text-white">UX Research, Design Systems, Usability Testing, and Advanced Prototyping</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Prioritized Skill Gaps Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Prioritized Skill Gaps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Ranked in order of priority to maximize your learning impact for UI/UX Designer.
            </p>
          </div>
          <div className="text-xs font-medium text-slate-500">
            Order: <span className="font-bold text-indigo-600">Priority 1 (Critical) ➔ Priority 4 (Interactive Polish)</span>
          </div>
        </div>

        {/* 4 Prioritized Gap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {analysis.prioritizedGaps.map((gap) => {
            const isPriority1 = gap.priority === 1;
            const isPriority2 = gap.priority === 2;
            const isPriority3 = gap.priority === 3;

            return (
              <div
                key={gap.id}
                className="rounded-2xl border border-slate-200/90 p-5 bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                        isPriority1
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : isPriority2
                          ? 'bg-purple-100 text-purple-700 border border-purple-200'
                          : isPriority3
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      }`}>
                        P{gap.priority}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{gap.skillName}</h3>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {gap.category}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isPriority1
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : isPriority2
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : isPriority3
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {gap.urgencyLabel}
                    </span>
                  </div>

                  {/* Why it matters */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {gap.whyItMatters}
                  </p>

                  {/* Level comparison pill */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Current</span>
                      <span className="font-semibold text-slate-600">Not Acquired</span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400" />

                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Target</span>
                      <span className="font-bold text-indigo-600">{gap.targetLevel}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Est. Study</span>
                      <span className="font-semibold text-slate-800">{gap.estimatedWeeks} {gap.estimatedWeeks === 1 ? 'Week' : 'Weeks'}</span>
                    </div>
                  </div>
                </div>

                {/* Recommended action note */}
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-slate-900">Recommended Focus:</strong>{' '}
                    {gap.recommendedAction}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Comparison Visualizer */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8">
        <div className="pb-5 border-b border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Skill Comparison Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Current proficiency vs target proficiency needed for UI/UX Designer
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-indigo-600">
              <span className="w-3 h-3 rounded-sm bg-indigo-600"></span> Current Level
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-slate-300"></span> Target Requirement
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {comparisonItems.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                <span className="text-slate-800">{item.name}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'Mastered' || item.status === 'Proficient'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Progress bars */}
              <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 bg-slate-300/80"
                  style={{ width: `${item.target}%` }}
                />
                <div
                  className={`relative h-full rounded-full transition-all ${
                    item.current >= item.target
                      ? 'bg-emerald-500'
                      : item.current >= 60
                      ? 'bg-indigo-600'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${item.current}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>Current: {item.current}%</span>
                <span>Target: {item.target}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl border border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Target Job Role</span>
        </button>

        <button
          onClick={onProceed}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
        >
          <Milestone className="w-4 h-4" />
          <span>View Career Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
