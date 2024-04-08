/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface TextItemProps {
  text: string;
  fontSize?: number;
  color?: string;
}

const TextItem: React.FC<TextItemProps> = ({ text, fontSize = 16, color = '#000' }) => {
  const textItemStyles = css`
    list-style: auto;
    font-size: ${fontSize}px;
    color: ${color};
    margin-bottom: 8px;
  `;

  return <li css={textItemStyles}>{text}</li>;
};

interface TextListProps {
  items: string[];
  fontSize?: number;
  color?: string;
  className?: string;
}

// none, auto, disc, circle, square
// list-style: auto;
// list-style-type: auto; 
const TextList: React.FC<TextListProps> = ({ items, fontSize, color, className = '' }) => {
  const textListStyles = css`
    padding: 0;
    margin: 0;
    ${className}
  `;

  return (
    <>
        {/* <ul css={textListStyles}> TODO - custom style을 넣으면 ul,ol의 numbering이 안붙는 문제*/}
        <ul>
            {items.map((item, index) => (
                <TextItem key={index} text={item} fontSize={fontSize} color={color} />
            ))}
        </ul>
    </>
  );
};

export default TextList;