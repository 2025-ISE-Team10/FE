import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./component/LoginPage"
import StartingInterface from "./component/StartingInterface"
import { use, useContext, useState } from "react"
import { ToastContainer } from "react-toastify";

function App() {
  // App 컴포넌트는 전체 애플리케이션의 루트 컴포넌트입니다.
  // 사용자 ID와 로그인 상태를 관리하기 위한 상태 변수들입니다.
  const [userId, setUserId] = useState(null); // 현재 로그인한 사용자의 ID를 저장합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 사용자의 로그인 상태를 저장합니다.

  return (
    <>
    <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
      {/* react-router-dom을 사용하여 라우팅 설정 */}
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartingInterface userId={userId} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
            <Route path="/login" element={<LoginPage setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            {/* 다른 페이지 라우트 추가 가능 */}
          </Routes>
      </BrowserRouter>
        <footer className="mt-auto px-4 py-6 text-sm text-center text-gray-500 bg-white border-t">
          <div className="space-x-4">
          <a href="#">FAQ</a>
          <a href="#">고객센터</a>
          <a href="#">이용약관</a>
          </div>
          <p className="mt-2">© 2025 Geup Inc.</p>
      </footer>
    </>
  )
}

export default App;
