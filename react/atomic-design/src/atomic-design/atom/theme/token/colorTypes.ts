import { ColorPallete, BaseColorScheme } from "../colors";

export type HEX = `#${string}`;
export type ColorToken = `${ColorPallete}-${keyof BaseColorScheme}`;
