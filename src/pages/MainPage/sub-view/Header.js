import React, { useState, useEffect } from "react";
import { Select, Space, Button } from "antd";
import * as Apis from "../../../utils/Api";

const Header = () => {

    const { Option } = Select;
    
    const [sido, setSido] = useState("");
    const [sigu, setSigu] = useState("");
    const [sidong, setSidong] = useState("");
    const [siri, setSiri] = useState(""); 
    const [sidoList, setSidoList] = useState([]);
    const [siguList, setSiguList] = useState([]);
    const [sidongList, setSidongList] = useState([]);
    const [siriList, setSiriList] = useState([]);

    const handleSidoChange = async (value) => {
        setSido(value);
        //ghsetSiguList([]);
        //만약 상위->하위 행정단위 순서로 조작 하다가 값자가 상위 행정단위 조작하는 경우 발생시 기존 하위 행정단위 초기화
        setSigu("");
        setSidong("");
        setSiri("");
        setSidongList([]);
        setSiriList([]);

        const parentData = value;
        const params = {sidoData : parentData}

        const returnSiguNameList = await Apis.getAPI("/api/auctionland/getSiguLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSiguList(returnSiguNameList.data);
        
    }

    const handleSiguChange = async (value) => {
        setSigu(value);
        //setSidongList([]);
        setSidong("");
        setSiri("");
        setSiriList([]);

        const parentData = value;
        const params = {sidoData : sido, siguData : parentData}

        const returnSidongNameList = await Apis.getAPI("/api/auctionland/getSidongLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSidongList(returnSidongNameList.data);
    }

    const handleSidongChange = async (value) => {
        setSidong(value);

        setSiri("");
        const parentData = value;
        const params = {sidoData : sido, siguData : sigu, sidongData : parentData}

        const returnSiriNameList = await Apis.getAPI("/api/auctionland/getSiriLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSiriList(returnSiriNameList.data);
    }

    const handleSiriChange = async (value) => {
        setSiri(value);
    }

    const handleSidoCdCall = async () => {
        setSidoList([]);
        setSiguList([]);
        setSidongList([]);
        setSiriList([]);
        
        const returnSidoNameList = await Apis.getAPI("/api/auctionland/getSidoLocationNameList");
        setSidoList(returnSidoNameList.data);
    }

    const handleSearchBtnClick = async () => {
        // 버튼 클릭 시 해당하는 경매 데이터 불러오는 부분.
        

        // 1. 우선 Location 정보 파라미터 제작
        const locationDatas = {daepyoSidoCd: sido, daepyoSiguCd : sigu, daepyoSidongCd : sidong, daepyoSiriCd : siri}

        const returnAuctionDatas = await Apis.getAPI("/api/auctionland/getAuctionData", {params: locationDatas})

        for(let i = 0 ; i < returnAuctionDatas.data.length ; i++)
        {
            let auctionData = returnAuctionDatas.data[i];
            console.log(auctionData)

            let currentIndex = -1;
            let targetChar = ">"
            let targetIdx = 17
            for (let i = 0; i < targetIdx; i++) {
                currentIndex = auctionData.indexOf(targetChar, currentIndex + 1);
                if (currentIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }
            console.log("currentIndex : " + currentIndex);
            console.log(auctionData.substring(currentIndex, currentIndex + 20))




        }

        

        console.log(returnAuctionDatas);
    }

    useEffect(() => {
        handleSidoCdCall();
    }, []);

    return (
        <div style={{backgroundColor:"aqua"}}>
            <label>시/도 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSidoChange}
                value={sido}>
                {sidoList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>시/구 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSiguChange}
                value={sigu}>
                {siguList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>동/면 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSidongChange}
                value={sidong}>
                {sidongList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>리 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSiriChange}
                value={siri}>
                {sidongList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <Button
                onClick={handleSearchBtnClick}>
                검색
            </Button>
            {/* 나머지 입력 요소들 */}
        </div>
    )
}

export default Header;
