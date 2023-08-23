import React, { useState, useEffect } from "react";
import { Select, Space, Button, Spin } from "antd";
import * as Apis from "../../../utils/Api";

import { useRecoilState } from "recoil";
import { auctionDataState } from "../../../atoms";

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

    const [loading, setLoading] = useState(false);

    //const [auctionDataRecoil, setAuctionDataRecoil] = useState(auctionDataState);
    const [auctionDataRecoil, setAuctionDataRecoil] = useRecoilState(auctionDataState)

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

        let searchResult = [];

        setLoading(true);
        

        // 1. 우선 Location 정보 파라미터 제작
        const locationDatas = {daepyoSidoCd: sido, daepyoSiguCd : sigu, daepyoSidongCd : sidong, daepyoSiriCd : siri}

        const returnAuctionDatas = await Apis.getAPI("/api/auctionland/getAuctionData", {params: locationDatas})

        for(let i = 0 ; i < returnAuctionDatas.data.length ; i++)
        {
            // 2. 경매 데이터 중 필요값 추출
            // 2-1. 경매 데이터 중 주소값 추출
            let auctionData = returnAuctionDatas.data[i];
            //console.log(auctionData)

            let currentStartIndex = -1;
            let targetStartChar = "<a	";
            let targetStartIdx = 1;

            
            let currentEndIndex = -1;
            let currentEndIndex2 = -1;
            let targetEndChar = ">";
            let targetEndIdx = 1;

            
            for (let i = 0; i < targetStartIdx; i++) {
                currentStartIndex = auctionData.indexOf(targetStartChar, currentStartIndex + 1);
                if (currentStartIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex = auctionData.indexOf(targetEndChar, currentStartIndex + currentEndIndex + 10); // 넉넉잡아 10만큼 뒤에 인덱스부터 검사 시작
                if (currentEndIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex2 = auctionData.indexOf("</a>", currentEndIndex + 10);
                if (currentEndIndex2 === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }


            //console.log("currentIndex : " + currentStartIndex, currentEndIndex, targetStartIdx, targetEndIdx);
            //console.log(auctionData.substring(currentEndIndex+6, currentEndIndex2))
            //auctionData.substring(currentEndIndex+6, currentEndIndex2) -> 필요한 주소값
            const jusoData = auctionData.substring(currentEndIndex+6, currentEndIndex2)


            // 2-2. 경매 데이터 중 주소값 제외한 나머지(가격, 시세대비 가격, 유찰횟수) 추출
            let tmpString = "";

            //<div class="tbl_btm_noline">
            currentStartIndex = -1;
            targetStartChar = "<div class=\"tbl_btm_noline\">";
            targetStartIdx = 1;

            
            currentEndIndex = -1;
            currentEndIndex2 = -1;
            targetEndChar = ">";
            targetEndIdx = 1;

            
            for (let i = 0; i < targetStartIdx; i++) {
                currentStartIndex = auctionData.indexOf(targetStartChar, currentStartIndex + 1);
                if (currentStartIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex = auctionData.indexOf(targetEndChar, currentStartIndex + currentEndIndex + 10); // 넉넉잡아 10만큼 뒤에 인덱스부터 검사 시작
                if (currentEndIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex2 = auctionData.indexOf("</div>", currentEndIndex + 10);
                if (currentEndIndex2 === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }


            //console.log("currentIndex : " + currentStartIndex, currentEndIndex, targetStartIdx, targetEndIdx);
            //console.log(auctionData.substring(currentEndIndex+6, currentEndIndex2))

            tmpString = auctionData.substring(currentEndIndex+6, currentEndIndex2);
            
            const gamjeongPrice = tmpString.replace(/\s+/g, "");


            //<div class="tbl_btm_noline">
            currentStartIndex = -1;
            targetStartChar = "<div class=\"tbl_btm_line\">";
            targetStartIdx = 1;

            
            currentEndIndex = -1;
            currentEndIndex2 = -1;
            targetEndChar = ">";
            targetEndIdx = 1;

            for (let i = 0; i < targetStartIdx; i++) {
                currentStartIndex = auctionData.indexOf(targetStartChar, currentStartIndex + 1);
                if (currentStartIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex = auctionData.indexOf(targetEndChar, currentStartIndex + currentEndIndex + 10); // 넉넉잡아 10만큼 뒤에 인덱스부터 검사 시작
                if (currentEndIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex2 = auctionData.indexOf("<br />", currentEndIndex + 10);
                if (currentEndIndex2 === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }


            //console.log("currentIndex : " + currentStartIndex, currentEndIndex, targetStartIdx, targetEndIdx);
            //console.log(auctionData.substring(currentEndIndex+8, currentEndIndex2))

            tmpString = auctionData.substring(currentEndIndex+8, currentEndIndex2);
            const choijeoIpchalPrice =  tmpString.replace(/\s+/g, "");

            //<div class="tbl_btm_noline">
            currentStartIndex = -1;
            targetStartChar = "<div class=\"tbl_btm_line\">";
            targetStartIdx = 2;

            currentEndIndex = -1;
            currentEndIndex2 = -1;
            targetEndChar = ">";
            targetEndIdx = 1;
            
            for (let i = 0; i < targetStartIdx; i++) {
                currentStartIndex = auctionData.indexOf(targetStartChar, currentStartIndex + 1);
                if (currentStartIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex = auctionData.indexOf(targetEndChar, currentStartIndex + currentEndIndex + 10); // 넉넉잡아 10만큼 뒤에 인덱스부터 검사 시작
                if (currentEndIndex === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }

            for (let i = 0; i < targetEndIdx; i++) {
                currentEndIndex2 = auctionData.indexOf("</div>", currentEndIndex + 10);
                if (currentEndIndex2 === -1) {
                    break; // 해당 인덱스 미만에서 더 이상 찾을 수 없음
                }
            }
 


            tmpString = auctionData.substring(currentStartIndex + "<div class=\"tbl_btm_line\">".length, currentEndIndex2)
            const yucahlNum = tmpString.replace(/\s+/g, "");


            //console.log("result : ", gamjeongPrice, choijeoIpchalPrice, yucahlNum);

            searchResult.push({jData : jusoData, gPrice : gamjeongPrice, cPrice : choijeoIpchalPrice, yNum : yucahlNum});

            
        }

        console.log(searchResult);

        setAuctionDataRecoil(searchResult);

        

        console.log(returnAuctionDatas);

        setLoading(false);
        
    }

    useEffect(() => {
        handleSidoCdCall();
    }, []);

    return (
        <Spin tip="경매결과를 조회중입니다." spinning={loading}>
            <div style={{height:'10vh'}}>
                <div id="AuctionLandLogo">
                    Auction Land
                </div>
                <div id="NavBar" style={{ position: 'absolute', bottom: 0, padding: '10px' }}>
                    <label>시/도 : </label>
                    <Select defaultValue="선택"
                        style={{width : '140px', paddingLeft: '5px', paddingRight:'5px'}}
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
                        style={{width : '200px', paddingLeft: '5px', paddingRight:'5px'}}
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
                        style={{width : '140px', paddingLeft: '5px', paddingRight:'5px'}}
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
                        style={{width : '140px', paddingLeft: '5px', paddingRight:'5px'}}
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
                </div>
                {/* 나머지 입력 요소들 */}
            </div>
        </Spin>
    )
}

export default Header;
