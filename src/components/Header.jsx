import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import { blueButtonStyle } from "./StartingInterface";
import { toast } from "react-toastify";

export default function Header({ setUserId, setIsLoggedIn }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  /* ───────── 검색 상태 ───────── */
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  const filteredProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  /* ───────── 이벤트 ───────── */
  const handleLogout = () => {
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    toast.success("로그아웃 되었습니다.");
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setShowDropdown(false);
    navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleSelectProduct = (id) => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-10 px-4 py-3">
      <div className="mx-auto flex items-center justify-between gap-2">
        {/* ─── 로고 ─── */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="Geup Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-lg font-bold">Geup</h1>
        </Link>

        {/* ─── 검색바 ─── */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 max-w-xl"
          ref={inputRef}
        >
          <input
            type="text"
            placeholder="상품 검색"
            className="w-full p-2 pr-24 border border-gray-300 rounded-xl"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(!!e.target.value);
            }}
            onFocus={() => searchTerm && setShowDropdown(true)}
          />
          <button
            type="submit"
            className={`${blueButtonStyle} absolute right-0 top-1/2 -translate-y-1/2 rounded-xl`}
          >
            검색
          </button>

          {/* ─── 드롭다운 ─── */}
          {showDropdown && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto overflow-x-hidden z-20">
              {filteredProducts.length ? (
                filteredProducts.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onMouseDown={() => handleSelectProduct(p.id)}
                  >
                    {/* 썸네일 */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    />
                    {/* 텍스트 */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{p.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-full">{p.description}</p>
                    </div>
                    {/* 가격 */}
                    <span className="text-sm font-semibold text-blue-600 flex-shrink-0 whitespace-nowrap">
                      {p.price.toLocaleString()}원
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-500">검색 결과가 없습니다.</li>
              )}
            </ul>
          )}
        </form>

        {/* ─── 우측 유저 ─── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isLoggedIn && storedUser ? (
            <>
              <span className="text-sm font-semibold whitespace-nowrap hidden md:block">
                {storedUser.name}님, 안녕하세요!
              </span>
              <Link to="/mypage" className={blueButtonStyle}>마이페이지</Link>
              <Link to="/cart" className={blueButtonStyle}>장바구니</Link>
              <button onClick={handleLogout} className={blueButtonStyle}>로그아웃</button>
            </>
          ) : (
            <Link to="/login" className={blueButtonStyle}>로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}
