import React, {useEffect, useState} from "react";
import { Container as MapDiv, NaverMap, Marker, NaverMapsProvider, useNavermaps } from 'react-naver-maps';

import { useRecoilValue, selector } from "recoil";
import { auctionDataState } from "../../../atoms";

const Content = () => {
    
    //Logic 구현 부분
    //const { naver } = window;
    //const navermaps = naver.maps;
    const navermaps = useNavermaps();

    const [centerLat, setCenterLat] = useState(37.5666103)
    const [centerLng, setCenterLng] = useState(126.9783882)

    const [markerList, setMarkerList] = useState([]);


    const auctionDataFromRecoil = useRecoilValue(auctionDataState);
    

    useEffect( () => {
        console.log("content data : ", auctionDataFromRecoil);
        if(auctionDataFromRecoil.length === 0)
        {

        }
        else
        {
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
    }, [markerList])

    function auctionMarker(){

    }

    // naver.maps.Service.geocode({
    //     query: jusoData
    // }, function(status, response) {
    //     if (status === naver.maps.Service.Status.ERROR) {
    //         return alert('Something Wrong!');
    //     }

    //     if (response.v2.meta.totalCount === 0) {
    //         return alert('totalCount' + response.v2.meta.totalCount);
    //     }

    //     var htmlAddresses = [],
    //         item = response.v2.addresses[0],
    //         point = new naver.maps.Point(item.x, item.y);

    //     if (item.roadAddress) {
    //         htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
    //     }

    //     if (item.jibunAddress) {
    //         htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
    //     }

    //     if (item.englishAddress) {
    //         htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
    //     }

    //     infoWindow.setContent([
    //         '<div style="padding:10px;min-width:200px;line-height:150%;">',
    //         '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
    //         htmlAddresses.join('<br />'),
    //         '</div>'
    //     ].join('\n'));

    //     map.setCenter(point);
    //     infoWindow.open(map, point);
    // });

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