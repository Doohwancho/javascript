import type { ColorToken, HEX } from "../theme";
import { getColorByToken } from "../theme";
import { css } from "@emotion/react";
import { ButtonSize, ButtonVariant } from "./buttonTypes";

const buttonSizeSet: ButtonSize[] = ["sm", "md", "lg", "xl"];

//default values
const buttonDefaultVariant: ButtonVariant = "solid";
const buttonDefaultSize: ButtonSize = "md";
const buttonDefaultColorToken: ColorToken = "green-lighten1";
// const buttonDefaultTextColorWhite: HEX = getColorByToken("grey-lighten5");
const buttonDefaultTextColorBlack: HEX = "#000000";
const buttonDefaultStyle = {
  backgroundColor: getColorByToken(buttonDefaultColorToken), //should return hex color for green-lighten1 -> #eb4646
  border: "groove", //none, solid, outset, dashed, double, groove, inset,
  borderRadius: "4px", //how round the corner should be?
  whiteSpace: "nowrap",
  cursor: "default", //default, pointer, auto
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
const buttonVariantStyle = (variant: ButtonVariant, color: ColorToken) => {
  const parsedColor: HEX = getColorByToken(color);
  const switchBackground = {
    background: "none",
    color: parsedColor,
  };

  switch (variant) {
    case "outline":
      return {
        ...switchBackground,
        border: `solid ${parsedColor} 1px`,
        "&:hover": css({
          background: parsedColor,
          color: buttonDefaultTextColorBlack,
        }),
      };
    case "ghost":
      return {
        ...switchBackground,
        "&:hover": css({
          background: parsedColor,
          color: buttonDefaultTextColorBlack,
        }),
      };
    case "link":
      return {
        ...switchBackground,
        "&:hover": css({ color: parsedColor, textDecoration: "underline" }),
      };
    case "unstyled":
      return {
        background: "none",
      };
    default: // solid
      return {
        backgroundColor: parsedColor,
        color: buttonDefaultTextColorBlack,
      };
  }
};

const buttonSizeStyle = (size: ButtonSize | undefined) => {
  const sizeIndex = buttonSizeSet.indexOf(size);
  return {
    height: (sizeIndex + 3) * 8,
    fontSize: (sizeIndex + 6) * 2,
    padding: `0 ${(sizeIndex + 3) * 4}px`,
  };
};

export { buttonSizeSet };

export const useStyles = ({
  variant = buttonDefaultVariant,
  size = buttonDefaultSize,
  color = buttonDefaultColorToken,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorToken;
}) =>
  css(
    buttonDefaultStyle,
    buttonVariantStyle(variant, color),
    buttonSizeStyle(size)
  );
