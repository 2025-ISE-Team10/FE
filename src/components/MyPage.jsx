// src/component/MyPage.jsx
import React, { useEffect, useState } from "react";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEmail(parsed.email);
      setPassword(parsed.password);
    }
  }, []);

  const handleSave = () => {
    if (!user) return;
    const updatedUser = {
      ...user,
      email,
      password,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("정보가 저장되었습니다.");
  };

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>마이페이지</h2>
      <p>
        <strong>이름:</strong> {user.name}
      </p>
      <p>
        <strong>아이디:</strong> {user.id}
      </p>

      <div>
        <label>이메일: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>비밀번호: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>정보 저장</button>
    </div>
  );
};

export default MyPage;
