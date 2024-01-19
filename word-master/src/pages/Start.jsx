import Transition from "../components/Transition";

const Start = () => {
  // 빈 Fragment가 아니라 최상위를 <div>로 감싸면 Transition 적용이 안되고 에러 발생함..
  return <>너만의 단어장을 만들고 자유롭게 테스트 해봐!</>;
};

export default Transition(Start);
