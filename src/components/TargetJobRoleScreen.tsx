import React from 'react';
import { TargetJobRole, UserSkill } from '../types';
import { TARGET_JOB_ROLES } from '../data/mockData';
import { 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Check,
  ShieldAlert, 
  Layers
} from 'lucide-react';

interface TargetJobRoleScreenProps {
  selectedRole: TargetJobRole;
  onSelectRole: (role: TargetJobRole) => void;
  userSkills: UserSkill[];
  onBack: () => void;
  onProceed: () => void;
}

export const TargetJobRoleScreen: React.FC<TargetJobRoleScreenProps> = ({
  selectedRole,
  onSelectRole,
  userSkills,
  onBack,
  onProceed,
}) => {
  const userSkillNames = new Set(userSkills.map((s) => s.name.toLowerCase().trim()));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          Step 2 of 5 • Target Job Role
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Target Job Role
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
          Review the required skills and competencies for the <span className="font-semibold text-slate-900">UI/UX Designer</span> role before comparing them against your current skillset.
        </p>
      </div>

      {/* Target Role Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 md:p-8 mb-8">
        {/* Banner with role stats */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">{selectedRole.title}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                {selectedRole.level} Level
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {selectedRole.department}
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {selectedRole.summary}
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-right">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Typical Salary Band</div>
              <div className="text-sm font-bold text-slate-900 flex items-center justify-end gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {selectedRole.averageSalary}
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl px-4 py-2 text-right">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Role Demand</div>
              <div className="text-sm font-bold text-emerald-900 flex items-center justify-end gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                {selectedRole.marketDemand} Demand
              </div>
            </div>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="py-6 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-400" />
            Core Role Responsibilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedRole.keyResponsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Skills Table */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                Required Skills for UI/UX Designer
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against the {userSkills.length} skills in your current profile
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Already in Profile
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Identified Gap
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden">
            {selectedRole.requiredSkills.map((req, idx) => {
              const hasSkill = userSkillNames.has(req.name.toLowerCase().trim());
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 transition-colors ${
                    hasSkill ? 'bg-white' : 'bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      hasSkill 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-700 border border-rose-200'
                    }`}>
                      {hasSkill ? <Check className="w-4 h-4 stroke-[3]" /> : <ShieldAlert className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">{req.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                          {req.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          req.importance === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.importance} Priority
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{req.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Target Level</div>
                      <div className="text-xs font-semibold text-slate-800">{req.targetProficiency}</div>
                    </div>

                    <div className="text-right w-24">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Importance</div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${req.marketBenchmark}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{req.marketBenchmark}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm rounded-xl border border-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Current Skills</span>
        </button>

        <button
          onClick={onProceed}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Run AI Analysis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
