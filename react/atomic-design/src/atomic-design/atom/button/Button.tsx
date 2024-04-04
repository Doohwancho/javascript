/** @jsxImportSource @emotion/react */
import variantPresetColors from "../theme";
import type { ColorToken } from "../theme";
import { css } from "@emotion/react";
import PropTypes from "prop-types";

/**
 * Q. what is this code?
 *
 * Button Component의 default props를 정하고, props 받았을 때, 특정한 style만 표현한다.
 *
 * variant, color, size, children을 props로 받을 수 있다.
 *
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

/**
 * types
 */
type HEX = `#${string}`;
type TButtonSize = "sm" | "md" | "lg" | "xl";
type TButtonVariant = "solid" | "outline" | "ghost" | "link" | "unstyled";

/**
 * interface
 */
interface IButtonProps {
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: ColorToken;
  children: string;
}

// utils
/**
 * takes color which has a format like 'green-lighten3'
 * and parse it into baseColor: 'green', colorVariant:'lighten3'
 * then returns hex code of those colors from colors.ts
 *
 * @param color ex. 'green-light1'
 * @returns hex code(ex. #ebbe01) for 'green-light1 color I defined on colors.ts
 */
const colorTokenParser = (color: ColorToken) => {
  //color: green-lighten1
  color = color || buttonDefaultColorToken;
  const defaultVariant = "base";
  const baseColor = color.includes("-") ? color.split("-")[0] : color; //'green'
  const colorVariant = color.includes("-") //'lighten1'
    ? color.split("-")[1]
    : defaultVariant;
  if (baseColor && variantPresetColors[baseColor]) {
    const parsedColor = variantPresetColors[baseColor][colorVariant]; //#66bb6a, which is hex color for green-lighten1 I defined on colors.ts file
    return parsedColor;
  }
  console.log("ERROR! - there is a problem regarding parsing color token");
};

/**
 * style
 */
const buttonDefaultColorToken: ColorToken = "green-lighten1";
const whiteish: HEX = colorTokenParser("grey-lighten5");

const buttonSizeSet: TButtonSize[] = ["sm", "md", "lg", "xl"];

const buttonDefaultStyle = {
  backgroundColor: colorTokenParser(buttonDefaultColorToken), //should return hex color for green-lighten1 -> #eb4646
  // backgroundColor: "#66bb6a",
  // backgroundColor: "blue",
  // backgroundColor: "#eb4646",
  border: "groove", //none, solid, outset, dashed, double, groove, inset,
  borderRadius: "4px", //how round the corner should be?
  whiteSpace: "nowrap",
  cursor: "default", //default, pointer, auto
  // height: "32px",
  // fontSize: "14px",
  // padding: "0 16px",
};
/**
 * component의 variant를 미리 정해놓고, variant에 따라 style을 바꿔주는 함수
 *
 * @param variant
 *  - "solid" | "outline" | "ghost" | "link" | "unstyled";
 * @param color
 *  - ColorToken = ${ColorPallete}-${keyof BaseColorScheme} from colors.ts
 * @returns
 *  - variant에 맞는 color를 적용한 style
 */
const buttonVariantStyle = (variant: TButtonVariant, color: ColorToken) => {
  const parsedColor: HEX = colorTokenParser(color);
  const switchBackground = {
    background: "none",
    color: parsedColor,
  };

  switch (variant) {
    case "outline":
      return {
        ...switchBackground,
        border: `solid ${parsedColor} 1px`,
        "&:hover": css({ background: parsedColor, color: whiteish }),
      };
      break;
    case "ghost":
      return {
        ...switchBackground,
        "&:hover": css({ background: parsedColor, color: whiteish }),
      };
      break;
    case "link":
      return {
        ...switchBackground,
        "&:hover": css({ color: parsedColor, textDecoration: "underline" }),
      };
      break;
    case "unstyled":
      return {
        background: "none",
      };
      break;
    default: // solid
      return {
        backgroundColor: parsedColor,
        color: whiteish,
      };
      break;
  }
};

const buttonSizeStyle = (size: TButtonSize | undefined) => {
  const sizeIndex = buttonSizeSet.indexOf(size);
  return {
    height: (sizeIndex + 3) * 8,
    fontSize: (sizeIndex + 6) * 2,
    padding: `0 ${(sizeIndex + 3) * 4}px`,
  };
};

/**
 *
 * @param children
 *  - button안에 써지는 텍스트
 *  - ex. '클릭', '다운로드', '회원가입', etc
 * @param variant
 *  - "solid" | "outline" | "ghost" | "link" | "unstyled"
 * @param size
 *  - "sm" | "md" | "lg" | "xl"
 * @param color
 *  - ColorToken = ${ColorPallete}-${keyof BaseColorScheme} from colors.ts
 *  - ex. 'green-lighten1'
 * @returns
 */
const Button = ({ children, variant, size, color }: IButtonProps) => {
  const buttonStyle = {
    ...buttonDefaultStyle,
    ...buttonVariantStyle(variant, color || buttonDefaultColorToken),
    ...buttonSizeStyle(size),
  };
  return <button css={{ ...buttonStyle }}>{children}</button>; //Q. what children are you talking about?
};

Button.displayName = "Button";
Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.oneOf(buttonSizeSet),
  children: PropTypes.string.isRequired,
};
Button.defaultProps = {
  variant: "solid",
  size: "md",
  children: "button",
};

export default Button;
