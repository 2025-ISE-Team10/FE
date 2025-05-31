// src/component/SearchPage.jsx
import React, { useState } from "react";
import products from "../data/products.json";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{ padding: "2rem", backgroundColor: "#eee", minHeight: "80vh" }}
    >
      <h2 style={{ color: "black" }}>🔍 상품 검색</h2>
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "300px",
          marginBottom: "1.5rem",
          fontSize: "16px",
        }}
      />

      {filteredProducts.length > 0 ? (
        <div>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Link>

              <div>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h4 style={{ margin: "0 0 0.5rem" }}>{product.title}</h4>
                </Link>

                <p style={{ margin: "0 0 0.5rem" }}>{product.description}</p>
                <p style={{ margin: "0 0 0.5rem" }}>
                  <strong>가격:</strong> {product.price.toLocaleString()}원
                </p>
                <p>상태: {product.onSale ? "🟢 판매중" : "🔴 판매종료"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>🔎 검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;
