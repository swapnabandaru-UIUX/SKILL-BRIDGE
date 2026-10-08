import React, { useState } from 'react';
import { AnalysisSummary, TargetJobRole, UserSkill, RoadmapPhase } from '../types';
import { 
  Milestone, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  Check, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  RefreshCw, 
  FolderGit2
} from 'lucide-react';

interface CareerRoadmapScreenProps {
  analysis: AnalysisSummary;
  selectedRole: TargetJobRole;
  userSkills: UserSkill[];
  onBack: () => void;
  onRestart: () => void;
}

export const CareerRoadmapScreen: React.FC<CareerRoadmapScreenProps> = ({
  analysis,
  selectedRole,
  userSkills,
  onBack,
  onRestart,
}) => {
  const [phases, setPhases] = useState<RoadmapPhase[]>(analysis.roadmap);

  // Sync phases if dynamic Gemini analysis updates roadmap
  React.useEffect(() => {
    if (analysis.roadmap && analysis.roadmap.length > 0) {
      setPhases(analysis.roadmap);
    }
  }, [analysis.roadmap]);

  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    'm1-1': true,
    'm2-1': true,
  });
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle milestone completed status
  const handleToggleMilestone = (phaseIndex: number, milestoneId: string) => {
    setPhases((currentPhases) =>
      currentPhases.map((phase, pIdx) => {
        if (pIdx !== phaseIndex) return phase;
        return {
          ...phase,
          milestones: phase.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          ),
        };
      })
    );
  };

  const toggleExpand = (milestoneId: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [milestoneId]: !prev[milestoneId],
    }));
  };

  // Compute live readiness score based on milestone completion starting from the baseline score
  const totalMilestonesCount = phases.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestonesCount = phases.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.completed).length,
    0
  );

  const baselineReadiness = analysis.readinessScore || 68;
  const targetReadiness = 100;
  const progressRatio = totalMilestonesCount > 0 ? completedMilestonesCount / totalMilestonesCount : 0;
  const currentDynamicReadiness = Math.round(
    baselineReadiness + (targetReadiness - baselineReadiness) * progressRatio
  );

  const handleExportPlan = () => {
    const textContent = `
# Personalized Career Learning Roadmap
Target Role: ${selectedRole.title}
Baseline Career Readiness Score: 68%
Current Readiness Score: ${currentDynamicReadiness}%
Goal: 100%

## Skill Gaps Addressed:
1. UX Research (Priority 1)
2. Design Systems (Priority 2)
3. Usability Testing (Priority 3)
4. Advanced Prototyping (Priority 4)

## Learning Plan:
${phases
  .map(
    (p) => `
### ${p.phaseCode}: ${p.title} (${p.weeksDuration})
Focus Area: ${p.focusArea}
Milestones:
${p.milestones
  .map(
    (m) => `- [${m.completed ? 'x' : ' '}] ${m.title} (${m.estimatedHours} hrs)
  Deliverable: ${m.practicalDeliverable}`
  )
  .join('\n')}
`
  )
  .join('\n')}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-roadmap-uiux-designer.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
          <Milestone className="w-3.5 h-3.5 text-indigo-600" />
          Step 5 of 5 • Career Roadmap
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Personalized Career Roadmap
            </h1>
            <p className="mt-2 text-base text-slate-600 max-w-3xl leading-relaxed">
              A structured 8-week learning plan designed to close your skill gaps in{' '}
              <span className="font-semibold text-slate-900">UX Research, Design Systems, Usability Testing, and Advanced Prototyping</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPlan}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Learning Plan</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>{copiedNotification ? 'Link Copied!' : 'Share Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Roadmap Telemetry */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Dynamic Score Tracker */}
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Career Readiness Score
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight">
                {currentDynamicReadiness}%
              </span>
              <span className="text-xs text-slate-500">
                / 100% Target
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Initial Baseline: <strong className="text-slate-800">68%</strong> •{' '}
              <span className="text-emerald-600 font-semibold">
                +{currentDynamicReadiness - baselineReadiness}% gained
              </span>
            </div>

            <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${currentDynamicReadiness}%` }}
              />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Plan Duration</span>
              </div>
              <div className="text-xl font-bold text-slate-900">8 Weeks</div>
              <div className="text-xs text-slate-500 mt-0.5">~10-12 hours per week</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Milestones Completed</span>
              </div>
              <div className="text-xl font-bold text-slate-900">
                {completedMilestonesCount} of {totalMilestonesCount} Done
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Check off milestones as you learn</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                <FolderGit2 className="w-4 h-4 text-purple-600" />
                <span>Practical Deliverables</span>
              </div>
              <div className="text-xl font-bold text-slate-900">4 Project Proofs</div>
              <div className="text-xs text-slate-500 mt-0.5">Hands-on design artifacts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Tree Pathway */}
      <div className="space-y-10 relative">
        {phases.map((phase, pIdx) => {
          const isPhaseCompleted = phase.milestones.every((m) => m.completed);
          const hasPhaseStarted = phase.milestones.some((m) => m.completed);

          return (
            <div key={phase.phaseNumber} className="relative">
              {/* Vertical connector line between phases */}
              {pIdx < phases.length - 1 && (
                <div 
                  className={`absolute left-6 sm:left-8 top-16 bottom-0 w-0.5 z-0 ${
                    isPhaseCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                  style={{ height: 'calc(100% + 2.5rem)' }}
                />
              )}

              {/* Phase Header Node */}
              <div className="relative z-10 flex items-start gap-4 sm:gap-6 mb-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-sm border transition-all ${
                  isPhaseCompleted
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : hasPhaseStarted
                    ? 'bg-indigo-600 text-white border-indigo-700'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    Phase
                  </span>
                  <span className="text-base sm:text-lg font-black leading-none">
                    0{phase.phaseNumber}
                  </span>
                </div>

                <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {phase.weeksDuration}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {phase.focusArea}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {phase.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Target Readiness
                      </span>
                      <span className="text-sm font-bold text-indigo-600">
                        +{phase.readinessBoost}% ➔ {phase.projectedReadiness}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestones inside this Phase */}
              <div className="ml-6 sm:ml-12 pl-6 sm:pl-8 space-y-4 relative z-10">
                {phase.milestones.map((milestone) => {
                  const isExpanded = !!expandedMilestones[milestone.id];

                  return (
                    <div
                      key={milestone.id}
                      className={`rounded-2xl border transition-all ${
                        milestone.completed
                          ? 'bg-emerald-50/20 border-emerald-300 shadow-2xs'
                          : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-xs'
                      }`}
                    >
                      {/* Milestone Header */}
                      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {/* Completion toggle button */}
                          <button
                            type="button"
                            onClick={() => handleToggleMilestone(pIdx, milestone.id)}
                            className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border transition-all shrink-0 ${
                              milestone.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-white border-slate-300 hover:border-indigo-500 text-transparent'
                            }`}
                            title={milestone.completed ? 'Mark incomplete' : 'Mark completed'}
                          >
                            <Check className="w-4 h-4 text-white stroke-[3]" />
                          </button>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={`text-base font-bold ${
                                milestone.completed ? 'text-slate-800 line-through opacity-80' : 'text-slate-900'
                              }`}>
                                {milestone.title}
                              </h3>
                              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {milestone.estimatedHours} hrs
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                              {milestone.summary}
                            </p>

                            {/* Skills tackled pills */}
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {milestone.skillsTackled.map((st, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                                >
                                  {st}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(milestone.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                          title="Toggle details"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Expanded Section */}
                      {isExpanded && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-100 text-xs">
                          {/* Deliverable */}
                          <div className="mb-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wider block">
                                Practical Milestone Deliverable
                              </span>
                              <span className="text-slate-800 font-medium text-xs sm:text-sm">
                                {milestone.practicalDeliverable}
                              </span>
                            </div>
                          </div>

                          {/* Curated Resources */}
                          <div>
                            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider block mb-2">
                              Curated Learning Resources
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {milestone.curatedResources.map((res, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200/60 text-slate-700"
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                    <span className="truncate font-medium">{res.title}</span>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-2">
                                    {res.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion & Next Steps Card */}
      <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Target Role Goal: Fully Qualified UI/UX Designer
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
          Completing this personalized roadmap directly bridges your skill gaps in UX Research, Design Systems, Usability Testing, and Advanced Prototyping.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>Update Skills & Re-Analyze</span>
          </button>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Skill Gap Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
