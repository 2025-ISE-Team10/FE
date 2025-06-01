import React, { useEffect, useState } from "react";
import products from "../data/products.json";

const CartPage = () => {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      const userCart = parsedUser.cart || [];
      const filtered = products.filter((p) => userCart.includes(p.id));
      setCartProducts(filtered);
    }
  }, []);

  const handleCheckout = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (user.cart.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    const updatedUser = {
      ...user,
      cart: [],
      orders: [...(user.orders || []), ...user.cart], // 주문 내역 저장 (선택)
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setCartProducts([]);
    alert("✅ 결제가 완료되었습니다!");
  };

  if (!user) return <p style={{ padding: "2rem" }}>로그인이 필요합니다.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛒 내 장바구니</h2>
      {cartProducts.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          {cartProducts.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                display: "flex",
                gap: "1rem",
                alignItems: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <p>
                  <strong>가격:</strong> {product.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={handleCheckout}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              fontSize: "16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            💳 결제하기
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
