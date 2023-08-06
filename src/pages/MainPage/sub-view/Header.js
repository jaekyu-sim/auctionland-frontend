import React, { useState } from "react";
import { Select, Space } from "antd";
import * as Apis from "../../../utils/Api";

const Header = () => {
    
    //Logic 구현 부분
    const [sidoList, useSidoList] = useState("");
    const [siguList, useSiguList] = useState("");
    const [sidongList, useSidongList] = useState("");

    const handleSidoChange = (value) => {
        //선택한 si 가 가진 gu 정보 받아오는 부분 구현
    }
    const handleSidoClick = (value) => {
        //si Select box 클릭하면 backend 의 H2 DB 의 Sido 정보를 불러오는부분 구현
        //value 사용 안함.
        const depth = 1;
        const parentData = "";
        const params = {parentData : parentData, depth : depth}
        
        const returnSidoNameList = Apis.getAPI("/api/auctionland/getLocationName", {params: params});

        return returnSidoNameList;
    }




    return (
        <div style={{backgroundColor:"aqua"}}>
            <label>시/도 : </label>
            <Select defaultValue="선택"
                style={{width : '120px'}}
                onChange={handleSidoChange}
                onClick={handleSidoClick}
                onDropdownVisibleChange={() => {
                    console.log("눌림~");
                }}
                />
            <input></input>
            <label>시/군/구 : </label>
            <input></input>
            <label>동 : </label>
            <input></input>
        </div>
    )
}
export default Header;