import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { toast } from "react-toastify";
import Header from "./Header";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      toast.warn("로그인이 필요합니다.");
      return;
    }
    if (user.cart.includes(product.id)) {
      toast.info("이미 장바구니에 담긴 상품입니다.");
      return;
    }

    const updatedUser = {
      ...user,
      cart: [...user.cart, product.id],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success(`${product.title} ${quantity}개가 장바구니에 추가되었습니다!`);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "찜하기 해제: 상품이 제거되었습니다." : "찜하기 완료: 상품이 추가되었습니다.");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">판매중</Badge>;
      case 'out-of-stock':
        return <Badge variant="destructive">품절</Badge>;
      case 'limited':
        return <Badge variant="secondary" className="bg-orange-500 hover:bg-orange-600 text-white">한정수량</Badge>;
      default:
        return null;
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('ko-KR').format(price);

  if (!product) {
    return <div className="p-8 text-red-500 text-lg font-semibold">❌ 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header userId={userId} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={handleFavoriteToggle}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <Heart className={`w-6 h-6 transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">{product.category}</Badge>
                {getStatusBadge(product.status)}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}원</span>
                {product.originalPrice && <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}원</span>}
              </div>
              {product.originalPrice && (
                <Badge variant="destructive" className="text-sm">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% 할인
                </Badge>
              )}
            </div>

            <Card className="bg-gray-50 border-none">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">상품 설명</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="text-lg font-medium text-gray-900">수량:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200" disabled={quantity <= 1}>-</button>
                  <span className="px-6 py-2 font-medium text-gray-900 bg-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200">+</button>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleAddToCart} disabled={product.status === 'out-of-stock'} className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  {product.status === 'out-of-stock' ? '품절' : '장바구니에 담기'}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 font-medium border-2 hover:bg-gray-50 transition-all duration-300" disabled={product.status === 'out-of-stock'}>
                    바로 구매
                  </Button>
                  <Button variant="outline" className="h-12 font-medium border-2 hover:bg-gray-50 transition-all duration-300">
                    문의하기
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-800 font-medium">💫 무료배송</span>
                  <span className="text-blue-600">5만원 이상 구매시</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;