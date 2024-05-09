import styled from "styled-components";

import loading from "../../assets/image/loading.svg";

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.4;
`;

const Loading = () => { //TODO - login에 submit이건, 글작성에 submit이건, setIsLoading(true); 하면, 해당 loading image가 나오고, false하면 다시 내려감
  return (
    <StyledLoading>
      <Image src={loading} />
    </StyledLoading>
  );
};

export default Loading;
