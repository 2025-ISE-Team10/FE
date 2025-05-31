import { use, useContext, useEffect, useRef, useState } from "react";
import users from "../data/users"; // 사용자 데이터 임포트
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginInterface({ setUserId, setIsLoggedIn }) {
  // react-router-dom의 useNavigate 훅 사용
  const navigate = useNavigate();
  // 로그인 상태를 관리하기 위한 상태 변수들
  // 이메일, 비밀번호, 에러 메시지, 로딩 상태를 관리합니다.
  // 사용자 ID는 현재 로그인한 사용자의 ID를 나타냅니다.
  // 이메일과 비밀번호는 로그인 폼에서 입력받는 값입니다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedUsers, setStoredUsers] = useState(() => {
    const local = localStorage.getItem("users");
    return local ? JSON.parse(local) : users;
  }); // 로컬 스토리지에서 가져온 사용자 데이터를 저장할 상태 변수

  // 비밀번호 입력 필드에 대한 참조를 생성합니다.
  const passwordRef = useRef(null);

  // 로그인 핸들러 함수
  const handleLogin = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    setLoading(true); // 로딩 상태 시작
    setError(""); // 에러 메시지 초기화

    // 사용자 데이터에서 이메일과 비밀번호를 확인합니다.
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // 로그인 성공 시 사용자 ID를 Context에 설정하고 홈으로 리다이렉트합니다.
      setUserId(user.id); // 로그인한 사용자의 ID를 설정합니다.
      setIsLoggedIn(true); // 로그인 상태를 true로 설정합니다.
      setEmail(""); // 입력값 초기화
      setPassword(""); // 입력값 초기화

      toast.success(`로그인 성공! 어서오세요, ${user.name}님!`); // 성공 메시지 표시
      navigate("/search"); // 검색으로 이동 (페이지 리로드 없이)
    } else {
      // 로그인 실패 시 에러 메시지를 설정합니다.
      toast.error("이메일 또는 비밀번호가 올바르지 않습니다."); // 에러 메시지 표시
      setTimeout(() => {
        setError("");
      }, 1500); // 1.5초 후 에러 메시지 초기화

      setPassword(""); // 입력값 초기화
      passwordRef.current.focus(); // 비밀번호 입력 필드에 포커스 설정
    }
    setLoading(false); // 로딩 상태 종료
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 홈으로 이동 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
        aria-label="홈으로 이동"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12 text-gray-500 hover:text-gray-700"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* 로그인 폼 컨테이너 */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 relative">
        {/* 로그인 폼 제목 */}
        <h2 className="text-2xl font-semibold text-center mb-6">로그인</h2>
        <p className="text-sm text-center text-gray-500 mb-4">
          Geup에 오신 것을 환영합니다! <br />
          계정을 입력하여 로그인하세요.
        </p>
        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* 이메일 입력 필드 */}
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* 비밀번호 입력 필드 */}
          <input
            ref={passwordRef}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* 에러 메시지 표시 */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        {/* 비밀번호 찾기 및 회원가입 링크 */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            비밀번호 찾기
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          계정이 없으신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
