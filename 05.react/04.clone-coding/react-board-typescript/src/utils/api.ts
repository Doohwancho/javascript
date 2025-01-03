import axios from 'axios';
import {store} from '../redux/store';
import {jwtUtils} from "./JwtUtils";

const instance = axios.create({ //TODO - axios 요청을 env설정(prod | local) 설정에 맞게 다르게 보낸다. 
  // baseURL: process.env.NODE_ENV === 'production' ? '' : 'https://api.eastflag.co.kr'
  baseURL: process.env.NODE_ENV === 'production' ? '' : ''
})

/**
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.request.use(
  (config) => {
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    const token = store.getState().Auth.token;
    try {
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`; //TODO - 서버에 요청 보낼 때 jwt 토큰을 헤더에 담는걸 여기서 처리한다. 
      }

      return config;
    } catch (err) {
      console.error('[_axios.interceptors.request] config : ' + err.message);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    return Promise.reject(error);
  }
);

export default instance;
