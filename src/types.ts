export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  id: string;
  name: string;
  category: 'Visual Design' | 'Research & Strategy' | 'Tools & Software' | 'Architecture & Systems' | 'Interaction & Logic';
  proficiency: ProficiencyLevel;
  experienceYears: number;
}

export interface TargetRequirement {
  name: string;
  category: 'Visual Design' | 'Research & Strategy' | 'Tools & Software' | 'Architecture & Systems' | 'Interaction & Logic';
  targetProficiency: ProficiencyLevel;
  importance: 'Critical' | 'High' | 'Medium';
  marketBenchmark: number; // 0-100
  description: string;
}

export interface TargetJobRole {
  id: string;
  title: string;
  level: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
  department: string;
  averageSalary: string;
  marketDemand: 'Very High' | 'High' | 'Steady';
  openRequisitions: string;
  summary: string;
  keyResponsibilities: string[];
  requiredSkills: TargetRequirement[];
}

export interface SkillGapItem {
  id: string;
  skillName: string;
  category: 'Visual Design' | 'Research & Strategy' | 'Tools & Software' | 'Architecture & Systems' | 'Interaction & Logic';
  priority: number;
  urgencyLabel: 'Critical' | 'High' | 'Medium' | 'Critical Path' | 'High Impact' | 'Essential Validation' | 'Interactive Polish';
  urgencyColor: 'rose' | 'purple' | 'amber' | 'indigo';
  currentLevel: ProficiencyLevel | 'None' | string;
  targetLevel: ProficiencyLevel | string;
  gapDelta: number; // percentage missing (e.g. 70%)
  impactWeight: number; // 1-100
  estimatedWeeks: number;
  marketDemandPercent?: number;
  whyItMatters: string;
  recommendedAction: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  summary: string;
  estimatedHours: number;
  completed: boolean;
  skillsTackled: string[];
  practicalDeliverable: string;
  curatedResources: Array<{
    title: string;
    type: 'Framework' | 'Interactive Lab' | 'Guide' | 'Documentation' | string;
    duration: string;
  }>;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseCode: string;
  title: string;
  weeksDuration: string;
  focusArea: string;
  readinessBoost: number;
  projectedReadiness: number;
  milestones: RoadmapMilestone[];
}

export interface CompetencyComparisonItem {
  name: string;
  current: number;
  target: number;
  status: string;
}

export interface AnalysisSummary {
  targetRole: TargetJobRole;
  readinessScore: number;
  matchScore: number;
  acquiredCount: number;
  gapCount: number;
  competencyCategories: Array<{
    name: string;
    currentScore: number;
    targetScore: number;
  }>;
  competencyComparison?: CompetencyComparisonItem[];
  prioritizedGaps: SkillGapItem[];
  roadmap: RoadmapPhase[];
  executiveTakeaway: string;
}

export type ScreenId = 'current-skills' | 'target-role' | 'ai-analysis' | 'gap-dashboard' | 'career-roadmap';
