import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import * as Apis from "../../../utils/Api";

const Header = () => {

    const { Option } = Select;
    
    const [sido, setSido] = useState("");
    const [sidoList, setSidoList] = useState([]);
    const [siguList, setSiguList] = useState([]);
    const [sidongList, setSidongList] = useState([]);

    const handleSidoChange = async (value) => {
        setSido(value);

        const depth = 2;
        const parentData = value;
        const params = {parentData : parentData, depth : depth}

        const returnSiguNameList = await Apis.getAPI("/api/auctionland/getLocationName", {params: params});
        //console.log(returnSiguNameList);
        setSiguList(returnSiguNameList.data);
    }

    const handleSidoCdCall = async () => {
        const depth = 1;
        const parentData = "";
        const params = {parentData : parentData, depth : depth}
        
        const returnSidoNameList = await Apis.getAPI("/api/auctionland/getLocationName", {params: params});
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
                >
                {siguList.map((option) => (
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
