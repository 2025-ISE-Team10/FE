import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products.json"; // 상품 데이터 가져오기
import Header from "./Header";

export const blueButtonStyle = "cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

export default function StartingInterface({ userId, setUserId, isLoggedIn, setIsLoggedIn }) {
    // 페이지 정보
    const [page, setPage] = React.useState(1);

    const navigate = useNavigate();
    // 페이지당 상품 수
    const itemsPerPage = 5;

    // 현재 페이지에 표시할 상품 목록
    const currentProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    // 빈 아이템 개수 계산 (항상 5개 div를 만들기 위함)
    const emptyCount = itemsPerPage - currentProducts.length;

    // 카테고리 아이콘
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
        ),
        '교육': (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 fill-blue-500">
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
            </svg>
        )
    };

    // 배너 텍스트와 배경색
    const banners = [
        {
            title: "🔥 당신의 시간은 소중하니까요 🔥",
            text: "빠른 배송, 간편 결제! 시간을 아껴주는 스마트 쇼핑을 경험하세요.",
            bg: "bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-200"
        },
        {
            title: "🛒 필요한 물건만 딱 간편하게 🛒",
            text: "카테고리별 인기 상품을 한눈에! 원하는 것만 골라 쉽고 빠르게 쇼핑하세요.",
            bg: "bg-gradient-to-r from-green-200 via-blue-100 to-green-100"
        },
        {
            title: "🚚 무료 배송 이벤트 진행중! 🎉",
            text: "지금 주문하면 전 상품 무료 배송! 배송비 걱정 없이 쇼핑을 즐기세요.",
            bg: "bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-100"
        }
    ];
    const [bannerIdx, setBannerIdx] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [fade, setFade] = React.useState(false);
    const progressDuration = 6000; // 6초

    React.useEffect(() => {
        setProgress(0);
        setFade(false);
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percent = Math.min((elapsed / progressDuration) * 100, 100);
            setProgress(percent);
            if (percent >= 100) {
                clearInterval(interval);
                setFade(true);
                setTimeout(() => {
                    setBannerIdx((prev) => (prev + 1) % banners.length);
                }, 400); // fade-out 후 배너 변경
            }
        }, 30);
        return () => clearInterval(interval);
    }, [bannerIdx]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* 상단: 검색창 및 로그인 아이콘 */}
            <Header userId={userId} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            {/* 중단: 프로모션 배너 및 상품 아이콘 */}
            <section className="w-full px-4 py-4 space-y-4 ">
                <div>
                    {/* 프로모션 배너 */}
                    <div
                        className={`w-full h-40 rounded-2xl flex flex-col items-center justify-center transition-all duration-400 ${banners[bannerIdx].bg} ${fade ? "opacity-0" : "opacity-100"}`}
                        style={{ transition: "opacity 0.4s" }}
                    >
                        <div className="flex-1 flex flex-col items-center justify-center w-full">
                            <div className="text-xl font-bold text-center text-gray-800">
                                {banners[bannerIdx].title}
                            </div>
                            <div className="flex justify-center mt-2">
                                {banners[bannerIdx].text}
                            </div>
                        </div>
                        {/* 배너 아래 진행률 표시줄 */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* 카테고리 아이콘들 */}
                <div className="grid grid-cols-5 gap-4 text-center mx-40">
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
                        className="cursor-pointer bg-white p-4 rounded-xl shadow-sm flex items-center space-x-4 hover:bg-gray-100 transition"
                        onClick={() => navigate(`/product/${product.id}`)}
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
