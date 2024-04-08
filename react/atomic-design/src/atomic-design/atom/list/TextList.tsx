/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface TextItemProps {
  text: string;
  fontSize?: number;
  color?: string;
}

//list-style: auto;
const TextItem: React.FC<TextItemProps> = ({ text, fontSize = 16, color = '#000' }) => {
  const textItemStyles = css`
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

const TextList: React.FC<TextListProps> = ({ items, fontSize, color, className = '' }) => {
  const textListStyles = css`
    display: block;
    list-style-type: decimal; /* none, decimal, disc, circle, square */
    ${className}

    /* ul/ol에 left margin이 없으면 numbering이 안됨 */
    margin-block-start: 1em; 
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  `;
  return (
    <>
        <ol css={textListStyles}> 
            {items.map((item, index) => (
                <TextItem key={index} text={item} fontSize={fontSize} color={color} />
            ))}
        </ol>
    </>
  );
};

export default TextList;