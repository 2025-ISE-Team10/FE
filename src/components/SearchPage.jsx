// src/pages/SearchPage.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import products from "../data/products.json";
import { Search, ShoppingBag, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "./Header";

const SearchPage = () => {
  /* ── 쿼리 문자열에서 검색어 추출 ───────────────────────── */
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchTerm = decodeURIComponent(params.get("query") || "").trim();

  /* ── 로그인 상태 (필요 시) ──────────────────────────────── */
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  /* ── 필터링 ────────────────────────────────────────────── */
  const filteredProducts = products.filter(
    (p) =>
      searchTerm &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("ko-KR").format(price);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-x-hidden">
      <Header
        userId={userId}
        setUserId={setUserId}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ── 페이지 타이틀 ───────────────────────── */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            상품 검색
          </h1>
          <p className="text-gray-600 text-lg">
            원하는 상품을 빠르게 찾아보세요
          </p>
        </div>

        {/* ── 결과 영역 ─────────────────────────── */}
        <div className="space-y-6">
          {searchTerm && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                검색 결과 ({filteredProducts.length}개)
              </h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                “{searchTerm}” 검색중
              </Badge>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6">
              {filteredProducts.map((p) => (
                <Card
                  key={p.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="flex md:flex-row gap-4">
                      {/* 썸네일 */}
                      <Link
                        to={`/product/${p.id}`}
                        className="flex-shrink-0 w-24 md:w-32 h-24 md:h-32 overflow-hidden rounded-md"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* 정보 */}
                      <div className="flex flex-col flex-1 pr-2">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <Link
                              to={`/product/${p.id}`}
                              className="flex-1 hover:text-blue-600"
                            >
                              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                                {p.title}
                              </h3>
                            </Link>
                            <Badge
                              variant={p.onSale ? "default" : "secondary"}
                              className={
                                p.onSale ? "bg-green-500 hover:bg-green-600" : ""
                              }
                            >
                              {p.onSale ? "판매중" : "판매종료"}
                            </Badge>
                          </div>

                          {/* 설명 2줄까지만 */}
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {p.description}
                          </p>

                          {p.rating && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">{renderStars(p.rating)}</div>
                              <span className="text-sm font-medium text-gray-700">
                                {p.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({p.reviewCount?.toLocaleString()}개 리뷰)
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl md:text-2xl font-bold text-gray-900">
                            {formatPrice(p.price)}원
                          </span>
                          <div className="flex gap-2">
                            <Link to={`/product/${p.id}`}>
                              <Button variant="outline" className="hover:bg-gray-50">
                                자세히 보기
                              </Button>
                            </Link>
                            <Button
                              disabled={!p.onSale}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              장바구니
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchTerm ? (
            /* 검색어는 있지만 결과 없음 */
            <Card className="py-16">
              <CardContent className="text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500">
                  “{searchTerm}”에 대한 상품을 찾을 수 없습니다.
                </p>
              </CardContent>
            </Card>
          ) : (
            /* 쿼리 자체가 없음 */
            <Card className="py-16">
              <CardContent className="text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  검색어가 없습니다
                </h3>
                <p className="text-gray-500">
                  상단 헤더에서 검색어를 입력해 주세요.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
