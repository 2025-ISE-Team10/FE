import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import users from "../data/users.json"; // 사용자 데이터 가져오기

export default function SignUpPage() {
  const navigate = useNavigate(); // react-router-dom의 useNavigate 훅 사용
  // 회원가입 상태를 관리하기 위한 상태 변수들
  // 이메일, 비밀번호, 비밀번호 확인, 주소, 에러 메시지를 관리합니다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [storedUsers, setStoredUsers] = useState(() => {
    const local = localStorage.getItem("users");
    return local ? JSON.parse(local) : users;
  }); // 로컬 스토리지에서 가져온 사용자 데이터를 저장할 상태 변수

  // 회원가입 핸들러 함수
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("유효한 이메일을 입력하세요.");
      return;
    }
    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      toast.error("비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const isExisting = storedUsers.some((user) => user.email === email);
      if (isExisting) {
        toast.error("이미 등록된 이메일입니다.");
        return;
      }

      // 회원가입 처리 로직 (예: 서버에 사용자 정보 저장)
      const newUser = {
        'email': email,
        'password' : password,
        'address' : address,
        'id': storedUsers.length + 1, // 임시로 ID 생성 (실제 서버에서는 자동 생성)
        'name': name,
        'cart': [], // 장바구니 초기화
      };

      // users.push(newUser); // 실제로는 서버에 저장해야 함
      // 로컬 스토리지에 사용자 데이터 저장
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

      // 실제 회원가입 처리 없음. 파일에 쓰기는 불가능하므로 성공 메시지만 표시
      toast.success("회원가입이 완료되었습니다.");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      toast.error("회원가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 로그인 화면으로 이동 버튼 */}
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
        {/* 회원가입 폼 컨테이너 */}
        <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl"
          >
            가입하기
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            로그인하러 가기
          </a>
        </div>
        </div>
        </div>
    );
}