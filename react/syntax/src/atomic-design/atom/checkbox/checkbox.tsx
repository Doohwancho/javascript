/** @jsxImportSource @emotion/react */
import { variantPresetColors } from "../theme/token/colors";
import type { ColorToken, Color } from "../theme/";
import { getColorByToken } from "../theme/";
import type { CheckboxSize, CheckboxProps } from "./checkboxTypes";
import { css } from "@emotion/react";
// import { useEffect, useRef } from "react";

const checkboxSizeSet: CheckboxSize[] = ["sm", "md", "lg", "xl"];

const checkboxWrapperStyle = {};
const checkboxDefaultColorToken: ColorToken = "teal-lighten3";

const checkboxDefaultStyle = (color: ColorToken | undefined) => {
  color = color || checkboxDefaultColorToken;
  return css({
    accentColor: getColorByToken(color),
  });
};
const Checkbox = (props: CheckboxProps) => {
  const checkboxStyle = {
    ...checkboxDefaultStyle(props?.color),
  };
  return (
    <div className="checkbox_wrapper" css={checkboxWrapperStyle}>
      <label>
        <input
          type="checkbox"
          name="color"
          value="blue"
          {...props}
          css={checkboxStyle}
        />{" "}
        checkbox
      </label>
    </div>
  );
};

Checkbox.displayName = "Input";

export default Checkbox;
