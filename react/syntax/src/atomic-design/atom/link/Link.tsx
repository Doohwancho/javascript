import React, { MouseEvent, ReactNode } from 'react';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ to, children, className, ...rest }) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Prevent default link behavior
    event.preventDefault();
    
    // Navigate to the specified URL
    window.location.href = to;
  };
  //TODO - style 적용. ex. hyperlink의 hover시 파란색 색상 지우기 등

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};

export default Link;
