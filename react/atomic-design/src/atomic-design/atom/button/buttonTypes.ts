import type { ColorToken } from "../theme";

type ButtonVariant = "solid" | "ghost" | "outline" | "link" | "unstyled";
type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  color?: ColorToken;
}

export type { ButtonVariant, ButtonSize };
