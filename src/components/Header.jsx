import { Link, useNavigate } from "react-router-dom";
import { blueButtonStyle } from "./StartingInterface";
import { toast } from "react-toastify";

export default function Header({ setUserId, setIsLoggedIn }) {
  const navigate = useNavigate();

  // 🔍 localStorage에서 로그인 상태 및 사용자 정보 불러오기
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storedUserRaw = localStorage.getItem("user");
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

  // 로그아웃 처리
  const handleLogout = () => {
    // 상태 초기화 (부모 컴포넌트와의 연동)
    setUserId(null);
    setIsLoggedIn(false);

    // localStorage에서 삭제
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    toast.success("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <header className="w-full px-4 py-3 flex items-center justify-between shadow-sm bg-white sticky top-0 z-10">
      <Link to={`/`} className="flex items-center space-x-2">
        <img src={`/logo.png`} alt="Geup Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-lg font-bold ">Geup</h1>
      </Link>

      <form className="flex absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <input
          type="text"
          placeholder="상품 검색"
          className="flex-1 mx-4 p-2 border border-gray-300 rounded-xl w-50%"
        />
        <button type="button" className={blueButtonStyle}>검색</button>
      </form>

      <div className="flex items-center space-x-4">
        {isLoggedIn && storedUser ? (
          <>
            <div className="text-sm font-semibold">
              {storedUser.name}님, 안녕하세요!
            </div>
            <Link to={`/mypage`} className={blueButtonStyle}>마이페이지</Link>
            <Link to={`/cart`} className={blueButtonStyle}>장바구니</Link>
            <button onClick={handleLogout} className={blueButtonStyle}>로그아웃</button>
          </>
        ) : (
          <Link to={`/login`} className={blueButtonStyle}>로그인</Link>
        )}
      </div>
    </header>
  );
}
