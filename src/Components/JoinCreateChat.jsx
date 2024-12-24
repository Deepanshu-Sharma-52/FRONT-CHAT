import React,{useState} from "react";
import liveChat from "../assets/liveChat.png";
import toast from "react-hot-toast";
import {createRoomApi, joinChatApi} from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
const JoinCreateChat=()=>{

    const [detail, setDetail] = useState({
        roomId: "",
        userName: "",
      });
    const { roomId, userName, setRoomId, setCurrentUser, setConnected } = useChatContext();
    const navigate=useNavigate();
    function handleFormInputChange(event){
        setDetail({
            ...detail,
            [event.target.name]: event.target.value,
        });
    }

    function validateForm(){
        if(detail.roomId ==="" || detail.userName ===""){
            toast.error("Invalid Input....")
            return false;
        }
        return true;
    }

    async function joinChat(){
          if(validateForm()){
            try {
                const room = await joinChatApi(detail.roomId);
                toast.success("Joined..")
                setCurrentUser(detail.userName);
                setRoomId(room.roomId);
                setConnected(true);
                navigate('FRONT-CHAT/chat');
            } catch (error) {
                if(error.status==400){
                    toast.error(error.response.data);
                }else{
                    
                toast.error("Error in joining room");
                }
                console.log(error);
                
            }
          }
    }

     async function createRoom(){
        if(validateForm()){
            console.log(detail);
            //call Api for backend
            try{
                const response= await createRoomApi(detail.roomId);
                console.log(response);
                toast.success("Room Created Successfully !!");
                setCurrentUser(detail.userName);
                setRoomId(response.roomId);
                setConnected(true);
                navigate('FRONT-CHAT/chat');
            } catch(error){
                console.log(error);
                if(error.status==400){
                    toast.error("Room already exists !!");
                }else{
                    toast("Error in creating room");
                }
            }
          }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border p-8 w-full flex-col gap-4 max-w-md rounded dark:bg-gray-500 shadow"> 
               <div>
                     <img src={liveChat} className="w-14 mx-auto"/>
               </div>
                <h1 className="text-2xl font-semibold text-center">Join Room/ Create Room</h1>

                {/* name div */}
                <div className="">
                    <label htmlFor="" className="block font-medum mb-2"> Your name</label>
                    <input onChange={handleFormInputChange} value={detail.userName} type="text" id="name" name="userName" placeholder="Enter your name" className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                {/* room id */}
                <div className="">
                    <label htmlFor="" className="block font-medum mb-2"> Room ID/ New Room ID</label>
                    <input name="roomId" onChange={handleFormInputChange} value={detail.roomId} type="text" id="name" placeholder="Enter the Room Id"  className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                {/* button */}

                <div className="flex justify-center gap-2">
                    <button onClick={joinChat} className="px-3 py-2 my-4 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full">Join Room</button>
                    <button onClick={createRoom} className="px-3 py-2 my-4 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full">Create Room</button>

                </div>
            
            </div>
        </div>
    )
};

export default JoinCreateChat;
