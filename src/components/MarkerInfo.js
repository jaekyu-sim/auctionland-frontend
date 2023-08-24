import React from 'react';

const MarkerInfo = ({ marker, position }) => {
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
      <h3>마커 정보</h3>
      <p>위도: {marker.y}</p>
      <p>경도: {marker.x}</p>
    </div>
  );
};

export default MarkerInfo;