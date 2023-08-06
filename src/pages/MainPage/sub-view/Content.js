import React, {useEffect, useState} from "react";
import { Container as MapDiv, NaverMap, Marker, NaverMapsProvider } from 'react-naver-maps';

const Content = () => {
    
    //Logic 구현 부분

    const [centerLat, setCenterLat] = useState(37.5666103)
    const [centerLng, setCenterLng] = useState(126.9783882)

    return (
        <div style={{backgroundColor:"aqua"}}>
            Test를 위한 Content 부분 입니다.
            <MapDiv
                style={{
                    height: 800,
                }}
                >
                <NaverMap>
                    <Marker defaultPosition={{ lat: centerLat, lng: centerLng }} />
                </NaverMap>
            </MapDiv>
            
        </div>
    )
}
export default Content;