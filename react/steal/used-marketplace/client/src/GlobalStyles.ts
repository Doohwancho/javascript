import { createGlobalStyle } from "styled-components";

//TODO - css-reset을 여기에 적용시키면 좋을 듯? 
//TODO - rem size 바뀌는게 root에 정한 size에 따라 바뀌는 걸텐데.. 어케하지? -> 사이즈 안정해줬다는건, default size(10px = 1rem) 쓰겠다는 것. 
//TODO - 일단 flexbox로 가운데 정렬 박고 시작  
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
    color: #212121;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  #root {
    display: flex;
    justify-content: center;
  }

  input {
    border: none;
    outline: none;
    
    /* input 자동완성시 검정색 글씨 지정 */
    &:-webkit-autofill {
      box-shadow: 0 0 0 30px #fff inset;
      -webkit-text-fill-color: #000;
    }

    /* input 자동완성시 파란색 배경색 비활성화 */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default GlobalStyle;
