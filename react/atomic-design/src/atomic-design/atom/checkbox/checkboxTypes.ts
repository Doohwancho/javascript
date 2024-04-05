import type { ColorToken } from "../theme";

type CheckboxSize = "sm" | "md" | "lg" | "xl";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: ColorToken;
} // TODO

export type { CheckboxSize, CheckboxProps };
