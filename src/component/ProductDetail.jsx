import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAddToCart = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const alreadyInCart = user.cart.includes(product.id);
    if (alreadyInCart) {
      alert("이미 장바구니에 담긴 상품입니다.");
      return;
    }

    const updatedUser = {
      ...user,
      cart: [...user.cart, product.id],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("장바구니에 추가되었습니다!");
  };

  if (!product) {
    return (
      <div className="p-8 text-red-500 text-lg font-semibold">
        ❌ 상품을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-cover rounded-xl mx-auto"
        />
        <p className="text-gray-700">{product.description}</p>
        <p className="text-lg font-semibold text-blue-600">
          가격: {product.price.toLocaleString()}원
        </p>
        <p className="text-sm text-gray-600">
          상태:{" "}
          <span className={product.onSale ? "text-green-600" : "text-red-600"}>
            {product.onSale ? "🟢 판매중" : "🔴 판매종료"}
          </span>
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          🛒 장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
