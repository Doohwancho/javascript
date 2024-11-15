// Step.tsx
import React, { ReactNode } from 'react';

interface StepProps {
  name: string;
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <>{children}</>;
}