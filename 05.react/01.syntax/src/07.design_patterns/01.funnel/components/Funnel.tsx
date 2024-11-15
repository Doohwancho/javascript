// Funnel.tsx
import React, { useState, createContext, useContext, ReactElement } from 'react';

interface FunnelContextType {
  step: string;
  setStep: (step: string) => void;
}

const FunnelContext = createContext<FunnelContextType | undefined>(undefined);

interface FunnelProps {
  children: ReactElement[];
}

export function Funnel({ children }: FunnelProps) {
  const [step, setStep] = useState(children[0].props.name);

  return (
    <FunnelContext.Provider value={{ step, setStep }}>
      {children.find(child => child.props.name === step)}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a Funnel');
  }
  return context;
}