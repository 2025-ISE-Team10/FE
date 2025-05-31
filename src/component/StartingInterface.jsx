import React, { useContext, useEffect } from "react";
import products from "../data/products.json"; // 상품 데이터 가져오기
import { Link, Route } from "react-router-dom";
import Header from "./Header";

export const blueButtonStyle = "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

export default function StartingInterface({userId, setUserId, isLoggedIn, setIsLoggedIn}) {
    // 페이지 정보
    const [page, setPage] = React.useState(1);
    // 페이지당 상품 수
    const itemsPerPage = 5;

    // 현재 페이지에 표시할 상품 목록
    const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    // 빈 아이템 개수 계산 (항상 5개 div를 만들기 위함)
    const emptyCount = itemsPerPage - currentProducts.length;

    // 패션, 전자, 식품, 뷰티 카테고리 아이콘을 위한 SVG 아이콘
    const categoryIcons = {
        '패션': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-blue-500">
                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
            </svg>
        ),
        '전자': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-blue-500">
            <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
            </svg>
        ),
        '식품': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-blue-500">
            <path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
            </svg>
        ),
        '뷰티': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-blue-500">
            <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
            </svg>
            )
        };


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* 상단: 검색창 및 로그인 아이콘 */}
        <Header userId={userId} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* 중단: 프로모션 배너 및 상품 아이콘 */}
        <section className="px-4 py-4 space-y-4">
            {/* 프로모션 배너 */}
            <div className="w-full h-40 bg-blue-200 rounded-2xl flex items-center justify-center text-xl font-bold">
            🔥 여름 맞이 특가 이벤트 🔥
            </div>

            {/* 카테고리 아이콘들 */}
            <div className="grid grid-cols-4 gap-4 text-center">
                {Object.entries(categoryIcons).map(([cat, svg]) => (
                    <div key={cat} className="p-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-1 flex items-center justify-center">
                            {svg}
                        </div>
                        <div className="text-sm font-medium">{cat}</div>
                    </div>
                ))}
            </div>
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
