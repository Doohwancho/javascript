import { variantPresetColors } from "../token/colors";
import { HEX, ColorToken } from "../token/colorTypes";

/**
 * takes color which has a format like 'green-lighten3'
 * and parse it into baseColor: 'green', colorVariant:'lighten3'
 * then returns hex code of those colors from colors.ts
 *
 * @param color ex. 'green-light1'
 * @returns hex code(ex. #ebbe01) for 'green-light1 color I defined on colors.ts
 */
export const getColorByToken = (color: ColorToken): HEX => {
  const [prefix, suffix] = color.split("-");
  return variantPresetColors[prefix][suffix];
};

export const hexToRgba = (hex: HEX, opacity: number) => {
  // console.log(
  //   `rgba('${parseInt(hex.substring(1, 3), 16)}','${parseInt(
  //     hex.substring(3, 5),
  //     16
  //   )}','${parseInt(hex.substring(5, 7), 16)}','${opacity}')`
  // );
  return `rgba(${parseInt(hex.substring(1, 3), 16)},${parseInt(
    hex.substring(3, 5),
    16
  )},${parseInt(hex.substring(5, 7), 16)},${opacity})`;
};
