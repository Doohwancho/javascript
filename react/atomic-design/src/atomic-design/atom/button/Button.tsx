/** @jsxImportSource @emotion/react */
import type { ButtonProps } from "./buttonTypes";
import { useStyles } from "./useStyles";

/**
 * @param variant
 *  - "solid" | "outline" | "ghost" | "link" | "unstyled";
 * @param color
 *  - ColorToken = ${ColorPallete}-${keyof BaseColorScheme} from colors.ts
 *  - ex. 'green-lighten1'
 *  - lighten1 ~ lighten5 등, 밝기의 세기에 따라 구분되어 green 객체에 저장되 있으며, value는 color HEX code이다.
 * @param size
 *  - "sm" | "md" | "lg" | "xl"
 * @param children
 *  - button안에 써지는 텍스트
 *
 * 특징
 * 1. variant에 따라서 style을 바꿔주고,
 * 2. size에 따라서 height, fontSize, padding을 바꿔준다.
 *
 * 내가 의도한 부분에 있어서만 확장에 열리고, 변경에는 닫힌 코드.
 */
const Button = ({ children, variant, size, color }: ButtonProps) => {
  const buttonStyle = useStyles({ variant, size, color });

  return <button css={{ ...buttonStyle }}>{children}</button>; //Q. what children are you talking about?
};

export default Button;
