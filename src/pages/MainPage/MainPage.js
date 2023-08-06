import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./sub-view/Header";
import Content from "./sub-view/Content";
const MainPage = () => {

    // const navigate = useNavigate();
    // const navigateToTestpage1 = () => {
    //     navigate("/TestPage1")
    // }
    // const navigateToTestpage2 = () => {
    //     navigate("/TestPage2")
    // }

    const [id, setId] = useState()
    const [pw, setPw] = useState()

    const submitUserInformation = () => {
        console.log("id : ", id , ", pw : ", pw)
    }
    return(
        <div style={{flexDirection:'column', display:'flex'}}>
            <Header></Header>
            <Content></Content>
            
        </div>
    )
}
export default MainPage;