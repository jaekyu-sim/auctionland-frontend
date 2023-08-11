import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
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

        const parentData = value;
        const params = {sidoData : parentData}

        const returnSiguNameList = await Apis.getAPI("/api/auctionland/getSiguLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSiguList(returnSiguNameList.data);
    }

    const handleSiguChange = async (value) => {
        setSigu(value);

        const parentData = value;
        const params = {sidoData : sido, siguData : parentData}

        const returnSidongNameList = await Apis.getAPI("/api/auctionland/getSidongLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSidongList(returnSidongNameList.data);
    }

    const handleSidongChange = async (value) => {
        setSidong(value);

        const parentData = value;
        const params = {sidoData : sido, siguData : sigu, sidongData : parentData}

        const returnSidongNameList = await Apis.getAPI("/api/auctionland/getSiriLocationNameList", {params: params});
        //console.log(returnSiguNameList);
        setSidongList(returnSidongNameList.data);
    }

    const handleSidoCdCall = async () => {
        
        const returnSidoNameList = await Apis.getAPI("/api/auctionland/getSidoLocationNameList");
        setSidoList(returnSidoNameList.data);
    }

    useEffect(() => {
        handleSidoCdCall();
    }, []);

    return (
        <div style={{backgroundColor:"aqua"}}>
            <label>시/도 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSidoChange}>
                {sidoList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>시/구 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSiguChange}>
                {siguList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>동/면 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSidongChange}>
                {sidongList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>

            <label>리 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                >
                {sidongList.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
            </Select>
            {/* 나머지 입력 요소들 */}
        </div>
    )
}

export default Header;
