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
    return <div style={{ padding: "2rem" }}>❌ 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <p style={{ marginTop: "1rem" }}>{product.description}</p>
      <p>
        <strong>가격:</strong> {product.price.toLocaleString()}원
      </p>
      <p>상태: {product.onSale ? "🟢 판매중" : "🔴 판매종료"}</p>
      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🛒 장바구니에 담기
      </button>
    </div>
  );
};

export default ProductDetail;
