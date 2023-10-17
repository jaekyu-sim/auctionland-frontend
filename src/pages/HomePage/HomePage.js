import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // 스타일링을 위한 CSS 파일

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
      <div className={`text-container ${showText ? "show" : ""}`}>
        <h1 className="animated-text">
          경매 매물의 위치와 시세를
          <br />
          그 누구보다 편리하게
        </h1>
      </div>


      {/* <!-- Explanation in JS tab --> */}

      {/* <!-- The two texts --> */}
      <div id="container">
        <span id="text1"></span>
        <span id="text2"></span>
      </div>

      {/* <!-- The SVG filter used to create the merging effect --> */}
      <svg id="filters">
        <defs>
          <filter id="threshold">
            {/* <!-- Basically just a threshold effect - pixels with a high enough opacity are set to full opacity, and all other pixels are set to completely transparent. --> */}
            <feColorMatrix in="SourceGraphic"
                type="matrix"A  
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
export default HomePage;