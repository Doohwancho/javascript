import styled from "styled-components";
import { kakaoConfig } from "../../config/kakao";

const StyledKakaoLogin = styled.a`
  width: 100%;
  height: 50px;
  background-color: #fae100;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-size: 14px;
`;

const KakaoIcon = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25 10.9526C25 16.4214 19.4043 20.8525 12.5 20.8525C11.8203 20.8528 11.1413 20.809 10.4673 20.7212C10.362 20.7073 10.2552 20.7317 10.1665 20.79L5.479 23.873C5.40494 23.9217 5.31797 23.9471 5.22935 23.9458C5.14073 23.9445 5.05453 23.9167 4.9819 23.8659C4.90927 23.8151 4.85356 23.7436 4.82197 23.6608C4.79037 23.578 4.78436 23.4876 4.80469 23.4014L5.69482 19.6348C5.71727 19.5408 5.7081 19.442 5.66873 19.3537C5.62937 19.2654 5.56199 19.1926 5.47705 19.1465C2.17236 17.3633 0 14.3584 0 10.9526C0 5.48389 5.59668 1.05273 12.5 1.05273C19.4033 1.05273 25 5.48486 25 10.9526Z"
        fill="#411C1D"
      />
      <path
        d="M8.00293 8.52441C8.00267 8.34846 7.93259 8.17981 7.80809 8.05548C7.68358 7.93116 7.51482 7.86133 7.33887 7.86133H3.9668C3.79068 7.86133 3.62177 7.93129 3.49723 8.05583C3.3727 8.18036 3.30273 8.34927 3.30273 8.52539C3.30273 8.70151 3.3727 8.87042 3.49723 8.99495C3.62177 9.11949 3.79068 9.18945 3.9668 9.18945H4.98877V13.4614C4.98877 13.6375 5.05873 13.8065 5.18327 13.931C5.3078 14.0555 5.47671 14.1255 5.65283 14.1255C5.82895 14.1255 5.99786 14.0555 6.12239 13.931C6.24693 13.8065 6.31689 13.6375 6.31689 13.4614V9.18848H7.33887C7.51499 9.18848 7.68389 9.11851 7.80843 8.99398C7.93297 8.86944 8.00293 8.70053 8.00293 8.52441Z"
        fill="#FFF200"
      />
      <path
        d="M15.8638 12.8105H14.5171V8.52441C14.5171 8.34829 14.4471 8.17939 14.3226 8.05485C14.1981 7.93032 14.0291 7.86035 13.853 7.86035C13.6769 7.86035 13.508 7.93032 13.3835 8.05485C13.2589 8.17939 13.189 8.34829 13.189 8.52441V13.4766C13.189 13.5638 13.2061 13.6501 13.2395 13.7307C13.2729 13.8113 13.3218 13.8845 13.3835 13.9461C13.4451 14.0078 13.5183 14.0567 13.5989 14.0901C13.6795 14.1234 13.7658 14.1406 13.853 14.1406H15.8638C16.0399 14.1406 16.2088 14.0707 16.3333 13.9461C16.4579 13.8216 16.5278 13.6527 16.5278 13.4766C16.5278 13.3004 16.4579 13.1315 16.3333 13.007C16.2088 12.8825 16.0399 12.8125 15.8638 12.8125V12.8105Z"
        fill="#FFF200"
      />
      <path
        d="M17.7031 7.86133C17.6159 7.86133 17.5296 7.8785 17.449 7.91188C17.3684 7.94525 17.2952 7.99416 17.2336 8.05583C17.1719 8.11749 17.123 8.1907 17.0896 8.27127C17.0562 8.35183 17.0391 8.43819 17.0391 8.52539V13.4605C17.0391 13.6366 17.109 13.8055 17.2336 13.93C17.3581 14.0545 17.527 14.1245 17.7031 14.1245C17.8792 14.1245 18.0482 14.0545 18.1727 13.93C18.2972 13.8055 18.3672 13.6366 18.3672 13.4605V8.52441C18.3669 8.34846 18.2969 8.17981 18.1723 8.05548C18.0478 7.93116 17.8791 7.86133 17.7031 7.86133V7.86133Z"
        fill="#FFF200"
      />
      <path
        d="M21.4565 12.9639L19.5371 10.6934L21.1484 9.1875C21.2121 9.12793 21.2635 9.05639 21.2996 8.97698C21.3356 8.89756 21.3557 8.81183 21.3586 8.72466C21.3615 8.63749 21.3473 8.5506 21.3166 8.46895C21.2859 8.38729 21.2395 8.31248 21.1799 8.24877C21.1204 8.18507 21.0488 8.13372 20.9694 8.09766C20.89 8.0616 20.8043 8.04154 20.7171 8.03861C20.6299 8.03569 20.543 8.04996 20.4614 8.08062C20.3797 8.11127 20.3049 8.15771 20.2412 8.21728L18.3691 9.96826V11.7856L18.5645 11.6016L20.4419 13.8208C20.5557 13.9553 20.7182 14.0391 20.8937 14.0537C21.0693 14.0684 21.2434 14.0127 21.3779 13.8989C21.5124 13.7852 21.5962 13.6226 21.6109 13.4471C21.6255 13.2715 21.5698 13.0974 21.4561 12.9629L21.4565 12.9639Z"
        fill="#FFF200"
      />
      <path
        d="M10.8174 8.46875C10.5176 7.71045 9.44483 7.7085 9.14209 8.46582L7.22656 13.2612C7.1613 13.4249 7.16367 13.6077 7.23317 13.7696C7.30266 13.9315 7.43359 14.0591 7.59717 14.1245V14.1245C7.76073 14.1898 7.94351 14.1874 8.10531 14.1179C8.26711 14.0484 8.39468 13.9175 8.45996 13.7539L8.78906 12.9272H11.1528L11.4795 13.7515C11.5115 13.8325 11.5592 13.9065 11.6199 13.9691C11.6805 14.0317 11.7529 14.0818 11.8329 14.1164C11.9129 14.1511 11.9989 14.1696 12.086 14.171C12.1732 14.1724 12.2598 14.1566 12.3408 14.1245C12.4219 14.0925 12.496 14.0447 12.5586 13.9841C12.6213 13.9234 12.6714 13.851 12.706 13.7709C12.7407 13.6909 12.7592 13.6048 12.7605 13.5176C12.7619 13.4304 12.746 13.3438 12.7139 13.2627L10.8174 8.46875ZM9.32031 11.5991L9.97705 9.95508L10.6279 11.5991H9.32031Z"
        fill="#FFF200"
      />
    </svg>
  );
};

const KakaoLogin = () => {
  const KakaoLoginHandler = async () => {
    const getCodeUrl = "https://kauth.kakao.com/oauth/authorize";
    const parameter = `?client_id=${kakaoConfig.restApiKey}&redirect_uri=${kakaoConfig.redirectUri}&response_type=code`;
    window.location.href = getCodeUrl + parameter;
  };

  return (
    <StyledKakaoLogin onClick={KakaoLoginHandler}>
      <KakaoIcon />
      <ButtonText>카카오톡으로 3초만에 시작하기</ButtonText>
    </StyledKakaoLogin>
  );
};

export default KakaoLogin;