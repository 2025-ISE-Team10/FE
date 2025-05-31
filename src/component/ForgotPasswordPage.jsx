import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [storedUsers, setStoredUsers] = useState(() => {
    const local = localStorage.getItem("users");
    return local ? JSON.parse(local) : [];
  }); // 로컬 스토리지에서 가져온 사용자 데이터를 저장할 상태 변수
    // react-router-dom의 useNavigate 훅 사용
  const navigate = useNavigate();

  const handleFindPassword = (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("유효한 이메일을 입력하세요.");
      return;
    }

    const userExists = storedUsers.some((user) => user.email === email);

    if (!userExists) {
      toast.error("등록되지 않은 이메일입니다.");
      setEmail(""); // 입력값 초기화
      return;
    }

    toast.success("비밀번호 재설정 이메일이 발송되었습니다.");
    navigate("/login"); // 비밀번호 재설정 후 로그인 페이지로 이동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {/* 홈으로 이동 버튼 */}    
        <button
            onClick={() => (navigate("/login"))}
            className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="홈으로 이동"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-gray-500 hover:text-gray-700">
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
        </button>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 relative">
        {/* 비밀번호 찾기 폼 */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          비밀번호 찾기
        </h2>
        <form onSubmit={handleFindPassword} className="space-y-4">
          <input
            type="email"
            placeholder="등록된 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl"
          >
            비밀번호 재설정 메일 보내기
          </button>
        </form>
      </div>
    </div>
  );
}
