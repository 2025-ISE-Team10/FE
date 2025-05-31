import React, { useEffect } from "react";
import products from "../data/products.json"; // 상품 데이터 가져오기

export default function StartingInterface() {

    // 페이지 정보
    const [page, setPage] = React.useState(1);
    // 페이지당 상품 수
    const itemsPerPage = 5;

    // 이미지 경로와 스타일 정의
    const imagePath = "/images/";
    const blueButtonStyle = "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

    // 현재 페이지에 표시할 상품 목록
    const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    // 빈 아이템 개수 계산 (항상 5개 div를 만들기 위함)
    const emptyCount = itemsPerPage - currentProducts.length;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* 상단: 검색창 및 로그인 아이콘 */}
        <header className="w-full px-4 py-3 flex items-center justify-between shadow-sm bg-white sticky top-0 z-10">
            <h1 className="text-lg font-bold ">Geup</h1>
            <form className="flex justify-center flex-2">
                <input
                    type="text"
                    placeholder="상품 검색"
                    className="flex-1 mx-4 p-2 border border-gray-300 rounded-xl max-w-md"
                />
                <button type="button" className={blueButtonStyle}>검색</button>
            </form>
            <button className={blueButtonStyle}>로그인</button>
        </header>

        {/* 중단: 프로모션 배너 및 상품 아이콘 */}
        <section className="px-4 py-4 space-y-4">
            {/* 프로모션 배너 */}
            <div className="w-full h-40 bg-blue-200 rounded-2xl flex items-center justify-center text-xl font-bold">
            🔥 여름 맞이 특가 이벤트 🔥
            </div>

            {/* 카테고리 아이콘들 */}
            <div className="grid grid-cols-4 gap-4 text-center">
            {["패션", "전자", "식품", "뷰티"].map((cat) => (
                <div key={cat} className="p-2">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-1"></div>
                <span>{cat}</span>
                </div>
            ))}
            </div>
        </section>

        <section className="px-4 space-y-4">
            {            /* 상품 목록 */}
            {currentProducts.map((product) => (
                <div
                    key={product.id}
                    className="bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4"
                >
                    <img className="w-24 h-24 bg-gray-200 rounded-xl" src={product.image} />
                    <div className="flex-1">
                        <p className="text-lg font-semibold text-blue-600">{product.price}원</p>
                        <h2 className="font-semibold">{product.title}</h2>
                        <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                </div>
            ))}
            {/* 빈 div로 채우기 - div를 5개로 맞추기 위함.*/}
            {Array.from({ length: emptyCount }, (_, i) => (
                <div key={`empty-${i}`} className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl"></div>
                </div>
            ))}
            {/* 페이지네이션 버튼 */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    className={blueButtonStyle}
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={page === 1}
                >
                    이전 page
                </button>
                {/* 현재 페이지 표시 */}
                <span className="flex items-center justify-center text-sm font-medium">
                    {page} / {Math.ceil(products.length / itemsPerPage)}
                </span>
                <button
                    className={blueButtonStyle}
                    onClick={() => setPage((prev) => (prev * itemsPerPage < products.length ? prev + 1 : prev))}
                    disabled={page * itemsPerPage >= products.length}
                >
                    다음 page
                </button>
            </div>
        </section>

        </div>
    );
}
