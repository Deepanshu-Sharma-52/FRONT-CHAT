import React from "react";
import {Routes,Route} from "react-router";
import App from "../App";
import ChatPage from "../Components/chatPage";


const AppRoutes=()=>{
    return (
        <Routes>
        <Route path="FRONT-CHAT/"element={<App/>}/>
        <Route path="FRONT-CHAT/chat"element={<ChatPage/>}/>
      </Routes>
    );
};

export default AppRoutes;