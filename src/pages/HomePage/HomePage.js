import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import "./App.css"; // 애니메이션 스타일링을 위한 CSS 파일

const HomePage = () => {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  // 3초 뒤에 `MainPage`로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // 페이지가 처음 로드될 때 텍스트를 나타나게 함
  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className="home-page">
      <h1 className={`animated-text ${showText ? "show" : ""}`}>
        부동산 구매는 경매로부터
      </h1>
    </div>
  );
};
export default HomePage;