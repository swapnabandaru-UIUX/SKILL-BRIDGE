import { TargetJobRole, UserSkill, AnalysisSummary, SkillGapItem, RoadmapPhase } from '../types';

export const INITIAL_USER_SKILLS: UserSkill[] = [
  {
    id: 'skill-figma',
    name: 'Figma',
    category: 'Tools & Software',
    proficiency: 'Advanced',
    experienceYears: 3,
  },
  {
    id: 'skill-photoshop',
    name: 'Photoshop',
    category: 'Visual Design',
    proficiency: 'Advanced',
    experienceYears: 4,
  },
  {
    id: 'skill-illustrator',
    name: 'Illustrator',
    category: 'Visual Design',
    proficiency: 'Intermediate',
    experienceYears: 2,
  },
  {
    id: 'skill-wireframing',
    name: 'Wireframing',
    category: 'Architecture & Systems',
    proficiency: 'Intermediate',
    experienceYears: 2,
  },
  {
    id: 'skill-basic-ui',
    name: 'Basic UI Design',
    category: 'Visual Design',
    proficiency: 'Intermediate',
    experienceYears: 2,
  },
];

export const AVAILABLE_SUGGESTED_SKILLS = [
  { name: 'UX Research', category: 'Research & Strategy' as const },
  { name: 'Design Systems', category: 'Architecture & Systems' as const },
  { name: 'Usability Testing', category: 'Research & Strategy' as const },
  { name: 'Advanced Prototyping', category: 'Interaction & Logic' as const },
  { name: 'Information Architecture', category: 'Architecture & Systems' as const },
  { name: 'User Journey Mapping', category: 'Research & Strategy' as const },
  { name: 'Micro-interactions', category: 'Interaction & Logic' as const },
  { name: 'Accessibility Guidelines', category: 'Architecture & Systems' as const },
];

export const TARGET_JOB_ROLES: TargetJobRole[] = [
  {
    id: 'role-uiux-designer',
    title: 'UI/UX Designer',
    level: 'Mid-Level',
    department: 'Product & Design',
    averageSalary: '$98,000 - $132,000 / yr',
    marketDemand: 'Very High',
    openRequisitions: '3,840+ open positions',
    summary:
      'Designs end-to-end user experiences for digital products, translating user requirements into intuitive interfaces through user research, scalable design systems, and interactive prototyping.',
    keyResponsibilities: [
      'Conduct user research and translate qualitative findings into user personas, journey maps, and empathy diagrams.',
      'Maintain, document, and evolve design system tokens, typography scales, and component libraries.',
      'Construct high-fidelity interactive prototypes to simulate micro-interactions and validate user flows.',
      'Plan and facilitate usability testing sessions to identify friction points and optimize usability.',
    ],
    requiredSkills: [
      {
        name: 'Figma',
        category: 'Tools & Software',
        targetProficiency: 'Advanced',
        importance: 'Critical',
        marketBenchmark: 95,
        description: 'Industry-standard vector interface design and collaboration tool.',
      },
      {
        name: 'Wireframing',
        category: 'Architecture & Systems',
        targetProficiency: 'Intermediate',
        importance: 'High',
        marketBenchmark: 88,
        description: 'Low to mid-fidelity interface layout and content hierarchy mapping.',
      },
      {
        name: 'Basic UI Design',
        category: 'Visual Design',
        targetProficiency: 'Advanced',
        importance: 'High',
        marketBenchmark: 90,
        description: 'Visual aesthetics, typography hierarchy, spacing, and layout harmony.',
      },
      {
        name: 'UX Research',
        category: 'Research & Strategy',
        targetProficiency: 'Advanced',
        importance: 'Critical',
        marketBenchmark: 92,
        description: 'User interviews, surveys, persona creation, and customer discovery insights.',
      },
      {
        name: 'Design Systems',
        category: 'Architecture & Systems',
        targetProficiency: 'Advanced',
        importance: 'Critical',
        marketBenchmark: 94,
        description: 'Component architecture, reusable UI kits, auto-layout tokens, and design standards.',
      },
      {
        name: 'Usability Testing',
        category: 'Research & Strategy',
        targetProficiency: 'Intermediate',
        importance: 'High',
        marketBenchmark: 86,
        description: 'Task-based validation, usability metrics (SUS), and iterative interface refinements.',
      },
      {
        name: 'Advanced Prototyping',
        category: 'Interaction & Logic',
        targetProficiency: 'Intermediate',
        importance: 'High',
        marketBenchmark: 84,
        description: 'Interactive state logic, variables, smart animations, and interactive component flows.',
      },
    ],
  },
];

export const DEFAULT_PRIORITIZED_GAPS: SkillGapItem[] = [
  {
    id: 'gap-ux-research',
    skillName: 'UX Research',
    category: 'Research & Strategy',
    priority: 1,
    urgencyLabel: 'Critical',
    urgencyColor: 'rose',
    currentLevel: 'None',
    targetLevel: 'Advanced',
    gapDelta: 85,
    impactWeight: 94,
    estimatedWeeks: 3,
    marketDemandPercent: 92,
    whyItMatters:
      'UI/UX designers must validate design decisions empirically. Without user interviews and journey mapping, interfaces risk solving the wrong user problems.',
    recommendedAction:
      'Master 1-on-1 user interview facilitation, qualitative synthesis affinity mapping, and evidence-based persona creation.',
  },
  {
    id: 'gap-design-systems',
    skillName: 'Design Systems',
    category: 'Architecture & Systems',
    priority: 2,
    urgencyLabel: 'High',
    urgencyColor: 'purple',
    currentLevel: 'None',
    targetLevel: 'Advanced',
    gapDelta: 75,
    impactWeight: 88,
    estimatedWeeks: 2,
    marketDemandPercent: 94,
    whyItMatters:
      'Design systems ensure consistency, scalability, and seamless handoff across complex multi-platform digital products.',
    recommendedAction:
      'Build a complete production-grade Figma design system with color and typography tokens, component variants, and strict auto-layout rules.',
  },
  {
    id: 'gap-usability-testing',
    skillName: 'Usability Testing',
    category: 'Research & Strategy',
    priority: 3,
    urgencyLabel: 'Medium',
    urgencyColor: 'amber',
    currentLevel: 'None',
    targetLevel: 'Intermediate',
    gapDelta: 65,
    impactWeight: 82,
    estimatedWeeks: 2,
    marketDemandPercent: 86,
    whyItMatters:
      'Usability testing measures how real users interact with your designs, identifying friction points and verifying ease of use.',
    recommendedAction:
      'Conduct moderated and unmoderated user tests on interactive prototypes, track task completion rates, and implement iterative fixes.',
  },
  {
    id: 'gap-advanced-prototyping',
    skillName: 'Advanced Prototyping',
    category: 'Interaction & Logic',
    priority: 4,
    urgencyLabel: 'Medium',
    urgencyColor: 'indigo',
    currentLevel: 'None',
    targetLevel: 'Intermediate',
    gapDelta: 55,
    impactWeight: 76,
    estimatedWeeks: 1,
    marketDemandPercent: 84,
    whyItMatters:
      'Static artboards cannot demonstrate dynamic interactions. Advanced variables and conditional states replicate authentic product behavior.',
    recommendedAction:
      'Incorporate Figma variables, conditional branching (if/else), and micro-interactions into functional prototype workflows.',
  },
];

export const DEFAULT_COMPETENCY_COMPARISON = [
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

export const DEFAULT_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phaseNumber: 1,
    phaseCode: 'PHASE 01',
    title: 'UX Research & Usability Testing Foundations',
    weeksDuration: 'Weeks 1 – 3',
    focusArea: 'Closing Gaps: UX Research (Priority 1) & Usability Testing (Priority 3)',
    readinessBoost: 12,
    projectedReadiness: 80,
    milestones: [
      {
        id: 'm1-1',
        title: 'User Interviews & Discovery Protocols',
        summary:
          'Learn to formulate open-ended user interview questions, conduct structured discovery sessions, and gather qualitative insights.',
        estimatedHours: 12,
        completed: false,
        skillsTackled: ['UX Research', 'User Interviewing'],
        practicalDeliverable: 'User Interview Script & 5 Documented Research Findings',
        curatedResources: [
          {
            title: 'Just Enough Research — Practical UX Discovery',
            type: 'Framework',
            duration: '4 hrs',
          },
          {
            title: 'User Interview Guide & Persona Template',
            type: 'Guide',
            duration: '2 hrs',
          },
        ],
      },
      {
        id: 'm1-2',
        title: 'Synthesis, User Personas & Journey Mapping',
        summary:
          'Synthesize raw user notes using affinity diagramming, create evidence-based user personas, and map friction points on journey curves.',
        estimatedHours: 14,
        completed: false,
        skillsTackled: ['UX Research', 'Journey Mapping'],
        practicalDeliverable: 'Affinity Diagram & Customer Journey Map',
        curatedResources: [
          {
            title: 'Customer Journey Mapping Best Practices',
            type: 'Documentation',
            duration: '3 hrs',
          },
          {
            title: 'Affinity Diagramming Synthesis Lab',
            type: 'Interactive Lab',
            duration: '4 hrs',
          },
        ],
      },
      {
        id: 'm1-3',
        title: 'Task-Based Usability Testing & Metrics',
        summary:
          'Formulate user test scenarios, observe user friction points, record task success rates, and score overall usability.',
        estimatedHours: 10,
        completed: false,
        skillsTackled: ['Usability Testing'],
        practicalDeliverable: 'Usability Testing Report with Redesign Action Items',
        curatedResources: [
          {
            title: 'Handbook of Usability Testing Methods',
            type: 'Framework',
            duration: '4 hrs',
          },
          {
            title: 'Standardized Usability Scoring Guide',
            type: 'Interactive Lab',
            duration: '2 hrs',
          },
        ],
      },
    ],
  },
  {
    phaseNumber: 2,
    phaseCode: 'PHASE 02',
    title: 'Design Systems & Component Architecture',
    weeksDuration: 'Weeks 4 – 5',
    focusArea: 'Closing Gap: Design Systems (Priority 2)',
    readinessBoost: 10,
    projectedReadiness: 90,
    milestones: [
      {
        id: 'm2-1',
        title: 'Design Tokens & Foundation Scales',
        summary:
          'Set up hierarchical design tokens for color palettes, typography scales, elevations, and spacing variables with auto-layout.',
        estimatedHours: 16,
        completed: false,
        skillsTackled: ['Design Systems', 'Design Tokens'],
        practicalDeliverable: 'Figma Design Token Library with Light/Dark Modes',
        curatedResources: [
          {
            title: 'Figma Variables & Token Architecture Guide',
            type: 'Interactive Lab',
            duration: '6 hrs',
          },
          {
            title: 'Design Token Structure & Naming Conventions',
            type: 'Documentation',
            duration: '3 hrs',
          },
        ],
      },
      {
        id: 'm2-2',
        title: 'Component Variants & Auto-Layout UI Kit',
        summary:
          'Create reusable UI components (inputs, modals, buttons, navigation) using nested variants, component properties, and responsive constraints.',
        estimatedHours: 18,
        completed: false,
        skillsTackled: ['Design Systems', 'Figma'],
        practicalDeliverable: 'Reusable Component Library with 24 Modular UI Elements',
        curatedResources: [
          {
            title: 'Advanced Component Variants in Figma',
            type: 'Guide',
            duration: '5 hrs',
          },
          {
            title: 'Design System Documentation Template',
            type: 'Framework',
            duration: '3 hrs',
          },
        ],
      },
    ],
  },
  {
    phaseNumber: 3,
    phaseCode: 'PHASE 03',
    title: 'Advanced Prototyping & Interactive Logic',
    weeksDuration: 'Weeks 6 – 7',
    focusArea: 'Closing Gap: Advanced Prototyping (Priority 4)',
    readinessBoost: 6,
    projectedReadiness: 96,
    milestones: [
      {
        id: 'm3-1',
        title: 'Variables, Expressions & Interactive States',
        summary:
          'Incorporate variables, numeric counters, conditional branching (if/else), and micro-interactions into clickable Figma prototypes.',
        estimatedHours: 14,
        completed: false,
        skillsTackled: ['Advanced Prototyping', 'Interactive Logic'],
        practicalDeliverable: 'Interactive Multi-Step Application Flow Prototype',
        curatedResources: [
          {
            title: 'Interactive Prototyping with Figma Variables',
            type: 'Interactive Lab',
            duration: '5 hrs',
          },
          {
            title: 'Micro-interactions & Smooth Transitions Cookbook',
            type: 'Guide',
            duration: '3 hrs',
          },
        ],
      },
    ],
  },
  {
    phaseNumber: 4,
    phaseCode: 'PHASE 04',
    title: 'End-to-End Case Study & Project Integration',
    weeksDuration: 'Week 8',
    focusArea: 'Achieving 100% Target Role Readiness',
    readinessBoost: 4,
    projectedReadiness: 100,
    milestones: [
      {
        id: 'm4-1',
        title: 'Complete UI/UX Project Presentation',
        summary:
          'Synthesize user research findings, the modular design system, usability test outcomes, and high-fidelity prototype into a comprehensive design case study.',
        estimatedHours: 15,
        completed: false,
        skillsTackled: ['UX Research', 'Design Systems', 'Usability Testing', 'Advanced Prototyping'],
        practicalDeliverable: 'End-to-End Case Study with Interactive Prototype',
        curatedResources: [
          {
            title: 'Structuring Compelling UI/UX Design Case Studies',
            type: 'Guide',
            duration: '4 hrs',
          },
          {
            title: 'UI/UX Design Review & Peer Feedback Protocol',
            type: 'Framework',
            duration: '3 hrs',
          },
        ],
      },
    ],
  },
];

export function computeAnalysis(
  userSkills: UserSkill[],
  targetRole: TargetJobRole
): AnalysisSummary {
  // Always ensure the 4 specified gaps are prioritized
  const finalGaps: SkillGapItem[] = DEFAULT_PRIORITIZED_GAPS;

  // The AI analysis should use a 68% Career Readiness Score for the baseline
  const readinessScore = 68;

  // Category breakdown
  const competencyCategories = [
    {
      name: 'Visual Design & Graphics',
      currentScore: 92,
      targetScore: 95,
    },
    {
      name: 'Tools & Vector Software',
      currentScore: 94,
      targetScore: 95,
    },
    {
      name: 'Architecture & Design Systems',
      currentScore: 42,
      targetScore: 92,
    },
    {
      name: 'UX Research & Testing',
      currentScore: 24,
      targetScore: 90,
    },
    {
      name: 'Advanced Prototyping & Logic',
      currentScore: 38,
      targetScore: 88,
    },
  ];

  return {
    targetRole,
    readinessScore,
    matchScore: 68,
    acquiredCount: 3,
    gapCount: finalGaps.length,
    competencyCategories,
    competencyComparison: DEFAULT_COMPETENCY_COMPARISON,
    prioritizedGaps: finalGaps,
    roadmap: DEFAULT_ROADMAP_PHASES,
    executiveTakeaway:
      'You possess strong visual design foundations in Figma, Photoshop, Illustrator, Wireframing, and Basic UI Design. To transition into a complete UI/UX Designer role, your primary focus is closing the skill gaps in UX Research, Design Systems, Usability Testing, and Advanced Prototyping.',
  };
}
