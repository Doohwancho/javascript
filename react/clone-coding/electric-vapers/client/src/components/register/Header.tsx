import styled from "styled-components";

const StyledHeader = styled.h1`
  height: 200px;
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 30px;
    height: 150px;
  }
`;

const Header = () => { //TODO - component/register/header.tsx와 component/header/header 이름 같아도, 다른 디렉토리에서 가져오면 괜찮나보네? 
  return <StyledHeader>회원가입</StyledHeader>;
};

export default Header;
