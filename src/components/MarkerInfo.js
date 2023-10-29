import React from 'react';

const MarkerInfo = ({ marker, position, address, gPrice, cPrice}) => {
  const infoWindowStyle = {
    position: 'absolute',
    top: `${position.lat}px`,
    left: `${position.lng}px`,
    backgroundColor: 'white',
    padding: '10px',
    border: '1px solid #ccc',
    zIndex: 1000, // 정보 창이 다른 요소 위에 나타나도록 zIndex 설정
  };

  return (
    <div style={infoWindowStyle}>
      <h3>경매물 정보</h3>
      <p>주소 : {address}</p>
      <p>법원 감정 가격 : {gPrice}</p>
      <p>최저 입찰 가격 : {cPrice} / 법원 감정가격 대비 ** %</p>
      <p></p>
    </div>
  );
};

export default MarkerInfo;