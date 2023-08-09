import React, { useState, useEffect } from "react";
import { Select, Space } from "antd";
import * as Apis from "../../../utils/Api";

const Header = () => {

    const { Option } = Select;
    
    //Logic 구현 부분
    const [sido, setSido] = useState("");
    const [sidoList, setSidoList] = useState([]);
    const [siguList, setSiguList] = useState([]);
    const [sidongList, setSidongList] = useState([]);

    const handleSidoChange = (value) => {
        //선택한 si 가 가진 gu 정보 받아오는 부분 구현
        setSido(value);
        
        const depth = 2;
        const parentData = sido;
        const params = {parentData : parentData, depth : depth}

        const returnSiguNameList = Apis.getAPI("/api/auctionland/geetLocationName", {params: params});

        return returnSiguNameList;
    }
    const handleSidoCdCall = () => {
        //si Select box 클릭하면 backend 의 H2 DB 의 Sido 정보를 불러오는부분 구현
        //value 사용 안함.
        const depth = 1;
        const parentData = "";
        const params = {parentData : parentData, depth : depth}
        
        const returnSidoNameList = Apis.getAPI("/api/auctionland/getLocationName", {params: params});

        return returnSidoNameList;
    }



    useEffect(async () => {
        //console.log("Header 렌더링 완료.");
        
        const tmpSidoList = await handleSidoCdCall()
        setSidoList(tmpSidoList.data);
        console.log(tmpSidoList)

        //crossOriginIsolated.log(tmpSidoList)
        //console.log("LocationSido Code 불러오기 완료.")
      },[]);

    //   useEffect(() => {
    //     console.log("sidoList : ");
    //     console.log(sidoList);
    //   }, [sidoList])

      useEffect(() => {
        console.log("sido : " + sido)
      }, [sido])


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
            <input></input>
            <label>시/군/구 : </label>
            <input></input>
            <label>동 : </label>
            <input></input>
        </div>
    )
}
export default Header;