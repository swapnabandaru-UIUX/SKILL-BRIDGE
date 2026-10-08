/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ScreenId, UserSkill, TargetJobRole, AnalysisSummary } from './types';
import { INITIAL_USER_SKILLS, TARGET_JOB_ROLES, computeAnalysis } from './data/mockData';
import { Header } from './components/Header';
import { CurrentSkillsScreen } from './components/CurrentSkillsScreen';
import { TargetJobRoleScreen } from './components/TargetJobRoleScreen';
import { AIAnalysisScreen } from './components/AIAnalysisScreen';
import { SkillGapDashboardScreen } from './components/SkillGapDashboardScreen';
import { CareerRoadmapScreen } from './components/CareerRoadmapScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('current-skills');
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [userSkills, setUserSkills] = useState<UserSkill[]>(INITIAL_USER_SKILLS);
  const [selectedRole, setSelectedRole] = useState<TargetJobRole>(TARGET_JOB_ROLES[0]);

  // Compute base analysis based on user skills & selected role
  const computedFallback = useMemo(() => {
    return computeAnalysis(userSkills, selectedRole);
  }, [userSkills, selectedRole]);

  const [dynamicAnalysis, setDynamicAnalysis] = useState<AnalysisSummary | null>(null);

  const analysis = dynamicAnalysis || computedFallback;

  const handleUpdateSkills = (skills: UserSkill[]) => {
    setUserSkills(skills);
    setDynamicAnalysis(null);
  };

  const handleSelectRole = (role: TargetJobRole) => {
    setSelectedRole(role);
    setDynamicAnalysis(null);
  };

  const unlockStep = (stepNumber: number) => {
    setMaxUnlockedStep((prev) => Math.max(prev, stepNumber));
  };

  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    const stepMap: Record<ScreenId, number> = {
      'current-skills': 1,
      'target-role': 2,
      'ai-analysis': 3,
      'gap-dashboard': 4,
      'career-roadmap': 5,
    };
    unlockStep(stepMap[screen]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Persistent Global Stepper Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        maxUnlockedStep={maxUnlockedStep}
      />

      {/* Screen View Container */}
      <main className="flex-1">
        {currentScreen === 'current-skills' && (
          <CurrentSkillsScreen
            skills={userSkills}
            onUpdateSkills={handleUpdateSkills}
            onProceed={() => {
              unlockStep(2);
              navigateTo('target-role');
            }}
          />
        )}

        {currentScreen === 'target-role' && (
          <TargetJobRoleScreen
            selectedRole={selectedRole}
            onSelectRole={handleSelectRole}
            userSkills={userSkills}
            onBack={() => navigateTo('current-skills')}
            onProceed={() => {
              unlockStep(3);
              navigateTo('ai-analysis');
            }}
          />
        )}

        {currentScreen === 'ai-analysis' && (
          <AIAnalysisScreen
            userSkills={userSkills}
            targetRole={selectedRole}
            analysis={analysis}
            onAnalysisGenerated={(newAnalysis) => setDynamicAnalysis(newAnalysis)}
            onAnalysisComplete={() => {
              unlockStep(4);
              navigateTo('gap-dashboard');
            }}
          />
        )}

        {currentScreen === 'gap-dashboard' && (
          <SkillGapDashboardScreen
            analysis={analysis}
            selectedRole={selectedRole}
            userSkills={userSkills}
            onBack={() => navigateTo('target-role')}
            onProceed={() => {
              unlockStep(5);
              navigateTo('career-roadmap');
            }}
          />
        )}

        {currentScreen === 'career-roadmap' && (
          <CareerRoadmapScreen
            analysis={analysis}
            selectedRole={selectedRole}
            userSkills={userSkills}
            onBack={() => navigateTo('gap-dashboard')}
            onRestart={() => {
              navigateTo('current-skills');
            }}
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">SkillGap AI</span>
            <span>—</span>
            <span>AI Skill Gap Analyzer & Learning Roadmap</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Target Role: {selectedRole.title}</span>
            <span>•</span>
            <span>5-Screen Workflow</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
