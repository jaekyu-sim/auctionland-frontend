import React, {useEffect, useState} from "react";
import { Container as MapDiv, NaverMap, Marker, NaverMapsProvider, useNavermaps, InfoWindow } from 'react-naver-maps';

import { useRecoilValue, selector } from "recoil";
import { auctionDataState } from "../../../atoms";

import { Spin, Popover } from 'antd';

import MarkerInfo from '../../../components/MarkerInfo';

const Content = () => {
    
    //Logic 구현 부분
    //const { naver } = window;
    //const navermaps = naver.maps;
    const navermaps = useNavermaps();

    //let infoWindows = [];

    const [map, setMap] = useState(null);

    const [centerLat, setCenterLat] = useState(37.5666103)
    const [centerLng, setCenterLng] = useState(126.9783882)

    const [markerList, setMarkerList] = useState([]);
    const [markerPrintList, setMarkerPrintList] = useState([]);

    const [minMaxLatLng, setMinMaxLatLng] = useState([9999, 9999, 0, 0]);

    const [targetLocation, setTargetLocation] = useState();

    const [loading, setLoading] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [infoWindowPosition, setInfoWindowPosition] = useState(null);


    const auctionDataFromRecoil = useRecoilValue(auctionDataState);
    

    useEffect( () => {
        console.log("content data : ", auctionDataFromRecoil);
        
        if(auctionDataFromRecoil.length === 0)
        {
            setMarkerList([])
        }
        else
        {
            setLoading(true);
            setMarkerList([])

            let tmpMarkerList = [];

            for(let i = 0 ; i < auctionDataFromRecoil.length ; i++)
            {

                console.log("navermaps : ", navermaps);
                console.log("navermaps.Service : ", navermaps.Service);
                if(navermaps)
                {
                    console.log(auctionDataFromRecoil[i].jData);

                    navermaps.Service.geocode({
                        query: auctionDataFromRecoil[i].jData
                    }, function(status, response){

                        let htmlAddresses = [];
                        let item = response.v2.addresses[0];
                        let point = new naver.maps.Point(item.x, item.y);
                        setMarkerList((prev) => [...prev, point])
                        //tmpMarkerList.push(point);
                        console.log("item : ", item); })
                }
                
            }

            


        }

            
            //console.log("tmpMarkerList : ", tmpMarkerList);
            //setMarkerList([...tmpMarkerList]);


            // dokdo = new naver.maps.LatLngBounds(
            //     new naver.maps.LatLng(37.2380651, 131.8562652),
            //     new naver.maps.LatLng(37.2444436, 131.8786475)),

            // const mapBounds = navermaps.LatLngBounds(

            // )
        
        
    }, [auctionDataFromRecoil])

    useEffect(() => {
        console.log("markerlist : ", markerList)

        if(markerList.length === auctionDataFromRecoil.length)
        {
            console.log("길이 같아짐")
            setMarkerPrintList(markerList);
            let minLat = 9999;
            let minLng = 9999;
            let maxLat = 0;
            let maxLng = 0;
            for(let i = 0 ; i < markerList.length ; i++)
            {
                if(markerList[i].x < minLat)
                {
                    minLat = markerList[i].x;
                }
                if(markerList[i].x > maxLat)
                {
                    maxLat = markerList[i].x;
                }
                if(markerList[i].y < minLng)
                {
                    minLng = markerList[i].y;
                }
                if(markerList[i].y > maxLng)
                {
                    maxLng = markerList[i].y;
                }
            }

            console.log(minLat, minLng, maxLat, maxLng);
            
            let tmpTargetLocation = new navermaps.LatLngBounds(
                new navermaps.LatLng(minLng, minLat),
                new navermaps.LatLng(maxLng, maxLat)
            )
            
            if(map)
            {
                console.log("tmpTargetLocation : ", tmpTargetLocation)
                map.fitBounds(tmpTargetLocation);
            }
            setTargetLocation(tmpTargetLocation);
            console.log("markerlsit : ::", markerList);
            for(let i = 0 ; i < markerList.length ; i++)
            {
                console.log("marker1 : ", markerList[i].x, markerList[i].y)
                let markerTmp = markerList[i]
                console.log("marlistTmp : ", markerTmp.x)
                // let infoWindow = new navermaps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"'+ key.substr(0, 1) +'"</b>.</div>'
                // });
                // infoWindows.push(infoWindow);
            }
            setMarkerList(markerList);
        }

        setLoading(false)
        

    }, [markerList])

    function auctionMarker(){

    }
    const handleMarkerClick = (marker) => {
        
        // 마커 클릭 시 MarkerInfo 창의 위치 계산
        const offsetX = 30; // 마커 옆에 표시하려면 좌표를 조정합니다.
        const offsetY = -30; // 마찬가지로 좌표를 조정합니다.
        const infoWindowPosition = {
        lat: marker.y + offsetY,
        lng: marker.x + offsetX,
        };
        setInfoWindowPosition(infoWindowPosition);
        setSelectedMarker(marker);
    };

    
    

    return (
        <Spin tip="경매 결과를 나타내는 중입니다" spinning={loading}>
            <div style={{ backgroundColor: "aqua", display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height:'100%' }}>
                    <MapDiv
                        style={{
                            height: '80%',
                            width: "80vw"
                        }}
                    >
                    <NaverMap ref={setMap}>
                        {markerList.map((marker, index) => (
                            <Marker
                                key={index}
                                position={{ lat: marker.y, lng: marker.x }}
                                title={`경매물 ${index + 1}`}
                                onClick={() => {handleMarkerClick(marker)}}
                            ></Marker>
                        ))}
                    </NaverMap>
                    {selectedMarker && (
                        <MarkerInfo marker={selectedMarker} position={infoWindowPosition} />
                    )}
                    </MapDiv>
                </div>
            </div>
        </Spin>
    )
}
export default Content;