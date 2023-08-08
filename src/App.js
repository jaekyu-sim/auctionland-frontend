import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import React, {useState, useEffect} from "react";
import MainPage  from "./pages/MainPage/MainPage";




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
            <Routes>
                <Route path="/" element = {<MainPage></MainPage>}></Route>
            </Routes>
        </>
    )
}

export default App;