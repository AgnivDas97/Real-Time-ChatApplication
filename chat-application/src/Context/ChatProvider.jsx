import React,{ createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider =({children})=>{
    const [user,setUser] = useState();
    const [selectedChat,setSelectedChat] = useState()
    const [chats,setChats]= useState([])
    const history = useNavigate();
     const [notification, setNotification] = useState([]);
    const person = { name: "Alex" };
    // console.log(children,"childer")
    useEffect(()=>{
        const userInfo =JSON.parse(localStorage.getItem("userInfo"));
        // console.log(userInfo,"abc")
        setUser(userInfo)
        if (!userInfo) history("/");
    },[history])
    // console.log(user,"userrrrr")
    return(
        <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,notification,
        setNotification}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatProvider;