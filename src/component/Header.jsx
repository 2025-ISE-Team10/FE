import { Link } from "react-router-dom";
import { blueButtonStyle } from "./StartingInterface";
import { toast } from "react-toastify";

export default function Header({ userId, setUserId, isLoggedIn, setIsLoggedIn }) {
    
    const handleLogout = () => {
        // 로그아웃 핸들러 함수
        setUserId(null); // 사용자 ID 초기화
        setIsLoggedIn(false); // 로그인 상태를 false로 설정
        toast.success("로그아웃 되었습니다."); // 성공 메시지 표시
    }

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

                {/* 로그인 버튼 (이미 로그인되어 있는 경우 로그아웃 버튼) */}
                {(isLoggedIn) ? 
                ([
                <Link to={`/mypage`} className={blueButtonStyle}>마이페이지</Link>,
                <Link to={`/cart`} className={blueButtonStyle}>장바구니</Link>,
                <button onClick={handleLogout}className={blueButtonStyle}>로그아웃</button>,
                ]) : 
                (<Link to={`/login`} className={blueButtonStyle}>로그인</Link>)}
            </div>
        </header>
    );
};