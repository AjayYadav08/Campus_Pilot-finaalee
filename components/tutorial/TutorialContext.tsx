import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { TUTORIAL_FLOWS, FlowId } from './tutorialFlows';

interface TutorialContextType {
  activeFlow: FlowId | null;
  currentStepIndex: number;
  startFlow: (flowId: FlowId) => void;
  advanceStep: () => void;
  skipFlow: () => void;
  isFlowCompleted: (flowId: FlowId) => boolean;
  resetAllFlows: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeFlow, setActiveFlow] = useState<FlowId | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isFlowCompleted = useCallback((flowId: FlowId) => {
    return localStorage.getItem(`tutorial_${flowId}_done`) === 'true';
  }, []);

  const markFlowCompleted = useCallback((flowId: FlowId) => {
    localStorage.setItem(`tutorial_${flowId}_done`, 'true');
  }, []);

  const resetAllFlows = useCallback(() => {
    const flows: FlowId[] = ['homepage', 'teams', 'team_details', 'event_details', 'calendar'];
    flows.forEach(id => localStorage.removeItem(`tutorial_${id}_done`));
    setActiveFlow(null);
    setCurrentStepIndex(0);
    // Reload the page to reset everything naturally
    window.location.reload();
  }, []);

  const startFlow = useCallback((flowId: FlowId) => {
    if (!isFlowCompleted(flowId)) {
      setActiveFlow(flowId);
      setCurrentStepIndex(0);
    }
  }, [isFlowCompleted]);

  const advanceStep = useCallback(() => {
    if (!activeFlow) return;
    
    const steps = TUTORIAL_FLOWS[activeFlow];
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Flow complete
      markFlowCompleted(activeFlow);
      setActiveFlow(null);
      setCurrentStepIndex(0);
    }
  }, [activeFlow, currentStepIndex, markFlowCompleted]);

  const skipFlow = useCallback(() => {
    if (activeFlow) {
      markFlowCompleted(activeFlow);
      setActiveFlow(null);
      setCurrentStepIndex(0);
    }
  }, [activeFlow, markFlowCompleted]);

  const value = useMemo(() => ({
    activeFlow,
    currentStepIndex,
    startFlow,
    advanceStep,
    skipFlow,
    isFlowCompleted,
    resetAllFlows
  }), [activeFlow, currentStepIndex, startFlow, advanceStep, skipFlow, isFlowCompleted, resetAllFlows]);

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
