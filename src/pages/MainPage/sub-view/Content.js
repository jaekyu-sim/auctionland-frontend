import React, {useEffect, useState, useRef} from "react";
import { Container as MapDiv, NaverMap, Marker, NaverMapsProvider, useNavermaps, InfoWindow, Listener, Overlay } from 'react-naver-maps';

import { useRecoilValue, selector } from "recoil";
import { auctionDataState, locationCodeDataState } from "../../../atoms";

import { Spin, Popover } from 'antd';

import MarkerInfo from '../../../components/MarkerInfo';

const Content = (props) => {
    
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
    const locationCodeDataFromRecoil = useRecoilValue(locationCodeDataState);
    const [etcAuctionData, setEtcAuctionData] = useState([]);

    const markerRef = useRef(null);
    

    useEffect( () => {
        //console.log("content data : ", auctionDataFromRecoil);
        
        if(auctionDataFromRecoil.length === 0)
        {
            setMarkerList([])
        }
        else
        {
            setSelectedMarker(null);
            setLoading(true);
            setMarkerList([])

            let tmpMarkerList = [];

            for(let i = 0 ; i < auctionDataFromRecoil.length ; i++)
            {
                //console.log("navermaps : ", navermaps);
                //console.log("navermaps.Service : ", navermaps.Service);
                if(navermaps)
                {
                    //console.log(auctionDataFromRecoil[i].jData);

                    navermaps.Service.geocode({
                        query: auctionDataFromRecoil[i].jData
                    }, function(status, response){

                        let htmlAddresses = [];
                        let item = response.v2.addresses[0];
                        let point = new naver.maps.Point(item.x, item.y);
                        let value = {id : i, location : point}
                        setMarkerList((prev) => [...prev, value])
                        //tmpMarkerList.push(point);
                        //console.log("item : ", item);
                     })
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
        //console.log("markerlist : ", markerList)

        if(markerList.length === auctionDataFromRecoil.length)
        {
            setMarkerPrintList(markerList);
            let minLat = 9999;
            let minLng = 9999;
            let maxLat = 0;
            let maxLng = 0;
            for(let i = 0 ; i < markerList.length ; i++)
            {
                if(markerList[i].location.x < minLat)
                {
                    minLat = markerList[i].location.x;
                }
                if(markerList[i].location.x > maxLat)
                {
                    maxLat = markerList[i].location.x;
                }
                if(markerList[i].location.y < minLng)
                {
                    minLng = markerList[i].location.y;
                }
                if(markerList[i].location.y > maxLng)
                {
                    maxLng = markerList[i].location.y;
                }
            }

            //console.log(minLat, minLng, maxLat, maxLng);
            
            let tmpTargetLocation = new navermaps.LatLngBounds(
                new navermaps.LatLng(minLng, minLat),
                new navermaps.LatLng(maxLng, maxLat)
            )
            
            if(map)
            {
                //console.log("tmpTargetLocation : ", tmpTargetLocation)
                map.fitBounds(tmpTargetLocation);
            }
            setTargetLocation(tmpTargetLocation);
            //console.log("markerlsit : ::", markerList);
            for(let i = 0 ; i < markerList.length ; i++)
            {
                //console.log("marker1 : ", markerList[i].location.x, markerList[i].location.y)
            }
            setMarkerList(markerList);
        }

        setLoading(false)
        

    }, [markerList])

    function markerCompare(marker){
        if(navermaps)
        {
            if(marker === selectedMarker)
            {
                return navermaps.Animation.BOUNCE
            }

        }


    }
    const handleMarkerClick = async (marker, index) => {
        
        // 마커 클릭 시 MarkerInfo 창의 위치 계산
        const offsetX = 30; // 마커 옆에 표시하려면 좌표를 조정합니다.
        const offsetY = -30; // 마찬가지로 좌표를 조정합니다.
        const infoWindowPosition = {
        lat: marker.y + offsetY,
        lng: marker.x + offsetX,
        };
        const tmpSelectedMarker = marker;
        setInfoWindowPosition(infoWindowPosition);
        setSelectedMarker(marker);

        console.log("recoil : ", locationCodeDataFromRecoil.data.locationCode)

        

        // if (markerRef.current) {
        //     const markerInstance = markerRef.current;
        //     // markerInstance를 사용하여 마커 정보를 가져오거나 조작합니다.
        //     console.log("marker 정보 : ", markerInstance)
        //     console.log("marker Position : ", markerInstance.getPosition()); // 마커의 위치 가져오기 예시

        //     if(markerInstance.getAnimation() === null)
        //     {
        //         markerInstance.setAnimation(navermaps.Animation.BOUNCE)
        //     }
        //     else
        //     {
        //         markerInstance.setAnimation(null)
        //     }
        // }
        

        const tmpJData = auctionDataFromRecoil[index].jData;
        const tmpGPrice = auctionDataFromRecoil[index].gPrice;
        const tmpCPrice = auctionDataFromRecoil[index].cPrice;
        const tmpYNum = auctionDataFromRecoil[index].yNum;
        
        //console.log(tmpJData, tmpGPrice, tmpCPrice, tmpYNum)
        const tmpEtcAuctionData = {jData : tmpJData, gPrice : tmpGPrice, cPrice : tmpCPrice, yNum : tmpYNum}
        setEtcAuctionData(tmpEtcAuctionData)


        //전자정부 API 호출 부분.
        let locationCodeDataForCallGovAPI = locationCodeDataFromRecoil.data.locationCode.substring(0, 5);

        //let realTradeDate = await Apis.getAPI("/api/auctionland/getRealTradeData", {params: locationCodeDataForCallGovAPI})


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
                                ref={markerRef}
                                key={index}
                                position={{ lat: marker.location.y, lng: marker.location.x }}
                                title={`경매물 ${index + 1}`}
                                onClick={() => {handleMarkerClick(marker, index)}}
                                //animation={}
                            >
                            </Marker>
                        ))}
                    </NaverMap>
                    {selectedMarker && (
                        <MarkerInfo marker={selectedMarker} position={infoWindowPosition} address={etcAuctionData.jData} gPrice={etcAuctionData.gPrice} cPrice={etcAuctionData.cPrice} />
                    )}
                    </MapDiv>
                </div>
            </div>
        </Spin>
    )
}
export default Content;