import {
  Color,
  variantPresetColors,
  getColorByToken,
  hexToRgba,
} from "./colors";
import { HEX, ColorToken } from "./token/colorTypes";

export default { variantPresetColors, getColorByToken, hexToRgba };
export type { ColorToken, Color, HEX };
