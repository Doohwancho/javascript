import { Children, ReactNode, isValidElement, useState } from 'react';
/**
 * Q. what is this Funnel pattern?
 * 
 * A. Compount Components 패턴으로 <Funnel> 안에 <Step>을 만듬 
 *    나름 state management도 있음 
 *    useFunnel을 export해서 사용
 *    use-case: multi-step forms
 */


// T extends readonly string[] means it accepts an array of strings as a type parameter
interface FunnelProps<T extends readonly string[]> {
    step: T[number];      // Current step (must be one of the strings in array T)
    children: ReactNode;  // Child components
}

// T extends readonly string[] means it accepts an array of strings as a type parameter
interface StepProps<T extends readonly string[]> {
    name: T[number];      // Current step (must be one of the strings in array T)
    children: ReactNode;  // Child components
}

// Main Funnel component that handles step visibility
const Funnel = <T extends readonly string[]>({ step, children }: FunnelProps<T>) => {
  // Convert children to array and filter for valid React elements
  const validElement = Children.toArray(children).filter(isValidElement);
  // Find the child element whose name prop matches the current step
  const targetElement = validElement.find((child) => (child.props as StepProps<T>)?.name === step);

  // If no matching step is found, render nothing
  if (!targetElement) {
    console.debug("<Step /> given inside <Funnel /> is not part of step-plans when initialized.");
    return null;
  }

  // Render the matching step
  return <>{targetElement}</>;
};

const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

export const useFunnel = <T extends readonly string[]>(steps: T, defaultStep: T[number]) => {
  // Manage the current step state
  const [step, setStep] = useState(defaultStep);

  //history state
  const [history, setHistory] = useState<T[number][]>([defaultStep]);

  const canGoBack = history.length > 1;

  // feat: go to next step with history tracking
  const setStepWithHistory = (newStep: T[number]) => {
    setHistory((prev) => [...prev, newStep]);
    setStep(newStep);
  };

  // feat: go back
  const goBack = () => {
    if(canGoBack) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setStep(newHistory[newHistory.length - 1]);
    }
  };

  // Create a compound component by combining Funnel and Step
  const FunnelElement = Object.assign(
    // Main Funnel component with current step injected
    (props: Omit<FunnelProps<T>, 'step'>) => {
      return <Funnel step={step} {...props} />;
    },
    // Add Step as a sub-component
    { Step: (props: StepProps<T>) => <Step<T> {...props} /> },
  );
 
   // Add Step as a sub-component
  return [FunnelElement, setStepWithHistory, goBack, canGoBack] as const;
};
