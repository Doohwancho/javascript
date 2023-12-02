# what
커스텀 훅 todo 연습

reference: [리엑트 커스텀 훅은 왜 쓸까? - 한상훈](https://www.youtube.com/watch?v=pXj3JLc-lv4)

# takeaway

- step1. 모든걸 하나에 컴포넌트에 때려막음
- step2. 로직을 함수로 분리
- step3. custom hook으로 로직함수랑 useState를 뺌
- step4. 여러 컴포넌트가 하나의 컴포넌트 w/ useState 참조시 에러남을 확인
- step5. 전역 상태관리 적용, custom hook 안에 1. 전역상태관리 2. API 요청 3. 로직 함수 담고, presentational component로 여러 컴포넌트로 쪼갠 후, 호출.