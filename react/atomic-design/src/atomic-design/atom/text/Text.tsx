/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface TextProps {
  children: React.ReactNode;
  fontSize?: number;
  bold?: boolean;
  alignment?: 'left' | 'center' | 'right';
  lineBreak?: boolean;
  color?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  fontSize = 16,
  bold = false,
  alignment = 'left',
  lineBreak = false,
  color = '#000',
  className = '',
}) => {
  const textStyles = css`
    font-size: ${fontSize}px;
    font-weight: ${bold ? 'bold' : 'normal'};
    text-align: ${alignment};
    color: ${color};
    white-space: ${lineBreak ? 'pre-wrap' : 'normal'};
    ${className}
  `;

  return <span css={textStyles}>{children}</span>;
};

export default Text;