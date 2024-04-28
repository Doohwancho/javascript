import React from'react';

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children: React.ReactNode,
  type: "button" | "submit" | "reset" | undefined,
  color: "primary" | "secondary" | undefined,
}

type SuperButtonProps = ButtonProps & { //기존 type에 &을 써서 상속받음
  size: "small" | "medium" | "large" | undefined,
}

export default function CButton({...rest} : SuperButtonProps) {
  return (
    <button {...rest}>
        Click Me!
    </button>
  );
}