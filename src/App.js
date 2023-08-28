import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import React, {useState, useEffect} from "react";
import MainPage  from "./pages/MainPage/MainPage";
import HomePage  from "./pages/HomePage/HomePage";
import { RecoilRoot } from 'recoil';



const App = () => {
    return(
        <>
            {/* 
                컴포넌트 선언 및 라우팅 주소 입력
                ex)
                <Routes>
                    <Route path = "/path1 입력" element = {<페이지1 선언/>}></Route>
                    <Route path = "/path2 입력" element = {<페이지2 선언/>}></Route>
                </Routes>
            */}
            <RecoilRoot>
                <Routes>
                    <Route path="/" exact element = {<HomePage></HomePage>}></Route>
                    <Route path="/main" element = {<MainPage></MainPage>}></Route>
                </Routes>
            </RecoilRoot>
        </>
    )
}

export default App;