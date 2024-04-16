/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinnerStyles = css`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #000;
  animation: ${spinnerAnimation} 1s ease-in-out infinite;
`;

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = '#000' }) => {
  const customStyles = css`
    width: ${size}px;
    height: ${size}px;
    border-top-color: ${color};
  `;

  return <div css={[spinnerStyles, customStyles]} />;
};

export default Spinner;