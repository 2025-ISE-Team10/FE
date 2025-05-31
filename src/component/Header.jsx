import { Link } from "react-router-dom";
import { blueButtonStyle } from "./StartingInterface";
import { toast } from "react-toastify";
import { useState } from "react";
// 헤더 컴포넌트는 상단에 위치하며, 로고, 검색창, 로그인/로그아웃 버튼 등을 포함합니다.
export default function Header({ userId, setUserId, isLoggedIn, setIsLoggedIn }) {
    // 사용자 ID와 로그인 상태를 props로 받아옵니다.
    const [storedUsers, setStoredUsers] = useState(() => {
        const local = localStorage.getItem("users");
        return local ? JSON.parse(local) : [];
    }); 
    
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
                <div key="userId" className="text-sm font-semibold">{storedUsers[userId-1].name}님, 안녕하세요!</div>,
                <Link to={`/mypage`} className={blueButtonStyle}>마이페이지</Link>,
                <Link to={`/cart`} className={blueButtonStyle}>장바구니</Link>,
                <button onClick={handleLogout}className={blueButtonStyle}>로그아웃</button>,
                ]) : 
                (<Link to={`/login`} className={blueButtonStyle}>로그인</Link>)}
            </div>
        </header>
    );
};