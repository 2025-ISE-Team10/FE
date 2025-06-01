import React, { useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "./Header";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header userId={userId} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Search className="w-8 h-8 text-blue-600" />
            상품 검색
          </h1>
          <p className="text-gray-600 text-lg">원하는 상품을 빠르게 찾아보세요</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="상품명이나 설명을 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-6">
          {searchTerm && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                검색 결과 ({filteredProducts.length}개)
              </h2>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                "{searchTerm}" 검색중
              </Badge>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 lg:w-1/4">
                        <Link to={`/product/${product.id}`}>
                          <div className="relative h-48 md:h-full overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          </div>
                        </Link>
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <Link
                                to={`/product/${product.id}`}
                                className="flex-1 hover:text-blue-600 transition-colors"
                              >
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                  {product.title}
                                </h3>
                              </Link>
                              <Badge
                                variant={product.onSale ? "default" : "secondary"}
                                className={product.onSale ? "bg-green-500 hover:bg-green-600" : ""}
                              >
                                {product.onSale ? "판매중" : "판매종료"}
                              </Badge>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {product.description}
                            </p>

                            {product.rating && (
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                  {renderStars(product.rating)}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {product.rating}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({product.reviewCount?.toLocaleString()}개 리뷰)
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-gray-900">
                              {formatPrice(product.price)}원
                            </div>
                            <div className="flex gap-3">
                              <Link to={`/product/${product.id}`}>
                                <Button variant="outline" className="hover:bg-gray-50">
                                  자세히 보기
                                </Button>
                              </Link>
                              <Button
                                disabled={!product.onSale}
                                className="bg-blue-600 hover:bg-blue-700 transition-colors"
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                장바구니
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchTerm ? (
            <Card className="py-16">
              <CardContent className="text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-500 mb-6">
                  "{searchTerm}"에 대한 상품을 찾을 수 없습니다.<br />
                  다른 검색어로 시도해보세요.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="hover:bg-gray-50"
                >
                  검색어 지우기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="py-16">
              <CardContent className="text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  검색을 시작해보세요
                </h3>
                <p className="text-gray-500">
                  위의 검색창에 원하는 상품명을 입력하세요.
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
