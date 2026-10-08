import React, { useState } from 'react';
import { UserSkill, ProficiencyLevel } from '../types';
import { AVAILABLE_SUGGESTED_SKILLS, INITIAL_USER_SKILLS } from '../data/mockData';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowRight, 
  RotateCcw, 
  Sliders, 
  Check, 
  Layers, 
  PenTool, 
  Cpu
} from 'lucide-react';

interface CurrentSkillsScreenProps {
  skills: UserSkill[];
  onUpdateSkills: (skills: UserSkill[]) => void;
  onProceed: () => void;
}

export const CurrentSkillsScreen: React.FC<CurrentSkillsScreenProps> = ({
  skills,
  onUpdateSkills,
  onProceed,
}) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<UserSkill['category']>('Visual Design');
  const [newSkillProficiency, setNewSkillProficiency] = useState<ProficiencyLevel>('Intermediate');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleProficiencyChange = (id: string, proficiency: ProficiencyLevel) => {
    onUpdateSkills(
      skills.map((s) => (s.id === id ? { ...s, proficiency } : s))
    );
  };

  const handleExperienceChange = (id: string, years: number) => {
    onUpdateSkills(
      skills.map((s) => (s.id === id ? { ...s, experienceYears: Math.max(1, years) } : s))
    );
  };

  const handleRemoveSkill = (id: string) => {
    onUpdateSkills(skills.filter((s) => s.id !== id));
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: UserSkill = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      experienceYears: 2,
    };

    onUpdateSkills([...skills, newSkill]);
    setNewSkillName('');
    setShowAddForm(false);
  };

  const handleQuickAdd = (suggested: { name: string; category: UserSkill['category'] }) => {
    if (skills.some((s) => s.name.toLowerCase() === suggested.name.toLowerCase())) return;

    const newSkill: UserSkill = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: suggested.name,
      category: suggested.category,
      proficiency: 'Intermediate',
      experienceYears: 1,
    };

    onUpdateSkills([...skills, newSkill]);
  };

  const handleResetToDefault = () => {
    onUpdateSkills(INITIAL_USER_SKILLS);
  };

  const advancedCount = skills.filter((s) => s.proficiency === 'Advanced').length;
  const intermediateCount = skills.filter((s) => s.proficiency === 'Intermediate').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Step 1 of 5 • Current Skills Inventory
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Current Skills
          </h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
            Specify your existing design tools, graphic proficiencies, and experience level to compare against the skills required for your target role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
            title="Reset to recommended sample skills"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Sample Set
          </button>
        </div>
      </div>

      {/* Telemetry quick summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Total Skills</div>
          <div className="text-2xl font-bold text-slate-900 flex items-baseline gap-2">
            {skills.length}
            <span className="text-xs font-normal text-slate-500">logged</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Advanced Mastery</div>
          <div className="text-2xl font-bold text-indigo-600 flex items-baseline gap-2">
            {advancedCount}
            <span className="text-xs font-normal text-slate-500">skills</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Intermediate Level</div>
          <div className="text-2xl font-bold text-purple-600 flex items-baseline gap-2">
            {intermediateCount}
            <span className="text-xs font-normal text-slate-500">skills</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Primary Discipline</div>
          <div className="text-sm font-bold text-slate-900 truncate mt-1">
            Visual & Vector Tools
          </div>
          <div className="text-xs text-slate-500">Strong visual foundation</div>
        </div>
      </div>

      {/* Main skills grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Benchmarked Current Skills</h2>
              <p className="text-xs text-slate-500">Included in the active analysis comparison profile</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddForm ? 'Close Form' : 'Add Custom Skill'}
          </button>
        </div>

        {/* Add custom skill inline form */}
        {showAddForm && (
          <form onSubmit={handleAddCustomSkill} className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 transition-all">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Add Custom Competency</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Design Tokens, Accessibility"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Discipline Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as UserSkill['category'])}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Visual Design">Visual Design</option>
                  <option value="Research & Strategy">Research & Strategy</option>
                  <option value="Tools & Software">Tools & Software</option>
                  <option value="Architecture & Systems">Architecture & Systems</option>
                  <option value="Interaction & Logic">Interaction & Logic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Proficiency Level</label>
                <select
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(e.target.value as ProficiencyLevel)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Beginner">Beginner (Foundational concepts)</option>
                  <option value="Intermediate">Intermediate (Independent application)</option>
                  <option value="Advanced">Advanced (Production mastery)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors"
              >
                Save Skill
              </button>
            </div>
          </form>
        )}

        {/* Skill list */}
        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-200 hover:shadow-xs transition-all gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
                  {skill.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-base">{skill.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {skill.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>Experience: {skill.experienceYears} {skill.experienceYears === 1 ? 'year' : 'years'}</span>
                    <span>•</span>
                    <span className={`font-medium ${
                      skill.proficiency === 'Advanced' 
                        ? 'text-indigo-600' 
                        : skill.proficiency === 'Intermediate' 
                        ? 'text-purple-600' 
                        : 'text-slate-600'
                    }`}>
                      {skill.proficiency} Level
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Proficiency segmented control */}
                <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                  {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleProficiencyChange(skill.id, level)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                        skill.proficiency === level
                          ? 'bg-white text-indigo-700 font-semibold shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                {/* Experience stepper */}
                <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => handleExperienceChange(skill.id, skill.experienceYears - 1)}
                    className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 font-bold text-slate-700"
                    title="Decrease years"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-800">{skill.experienceYears}y</span>
                  <button
                    type="button"
                    onClick={() => handleExperienceChange(skill.id, skill.experienceYears + 1)}
                    className="w-5 h-5 flex items-center justify-center rounded hover:bg-slate-200 font-bold text-slate-700"
                    title="Increase years"
                  >
                    +
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">No skills added yet.</p>
              <button
                onClick={handleResetToDefault}
                className="mt-3 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100"
              >
                Load Default Skills (Figma, Photoshop, Illustrator, etc.)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggested quick adds */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 md:p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Quick Add Relevant Skills
          </h3>
          <span className="text-xs text-slate-400">— Click to append to your inventory</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SUGGESTED_SKILLS.map((item) => {
            const alreadyAdded = skills.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => !alreadyAdded && handleQuickAdd(item)}
                disabled={alreadyAdded}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  alreadyAdded
                    ? 'bg-slate-200/70 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-2xs'
                }`}
              >
                {alreadyAdded ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Plus className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
                )}
                <span>{item.name}</span>
                <span className="text-[10px] text-slate-400">({item.category.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          <span className="font-semibold text-slate-800">{skills.length} skills</span> configured in profile.
        </div>

        <button
          onClick={() => {
            if (skills.length === 0) {
              handleResetToDefault();
            }
            onProceed();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <span>Continue to Target Job Role</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
