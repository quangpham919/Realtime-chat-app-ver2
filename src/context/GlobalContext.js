import React, {createContext, useState, useReducer} from "react"
import io from "socket.io-client"
import axios from "axios";
import Reducer from "./ReducerAction";

// eslint-disable-next-line no-unused-vars
const initialState = {
    rooms: [],
    chats: [],
    users: [],
    events: [],
    loading: false,
    error:null
}

//Emit socket event to server

 let socket;

const sendChat = (chatAction) => {
    //chatAction { room, message, user}
    socket.emit("chat message", chatAction)
}

const sendUser = (user) => {
    // User {name, token}
    socket.emit('user joined', user)
}

const joinRoom = (joinRoomEvent) => {
    socket.emit('join room', joinRoomEvent)
}

const leaveRoom = (leaveRoomEvent) => {
    socket.emit('leave room', leaveRoomEvent)
}

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [user,setUser] = useState('');
    const [token,setToken] = useState('');
    const [activeRoom, setActiveRoom] = useState('General');
    const [state,dispatch]= useReducer(Reducer,initialState);
    const SERVER = `https://quang-api-chat.herokuapp.com`;
    
    if(!socket) { 
        socket = io(`${SERVER}`)    
        

    socket.on("user joined", ({user}) => {
        const token = localStorage.getItem("token");
        const event = {
            type: "User Join Chat",
            source: "GUEST JOIN",
            author: user
        }
        addEvent(event, token);
        
    });

    socket.on("join room",({user,room}) => {
        const token = localStorage.getItem("token");
        const event = {
            type:"User Join Room",
            source:room,
            author:user
        }
        addEvent(event,token)
    })
    
    socket.on("leave room", ({user, room}) => {
        const token = localStorage.getItem("token");
        const event = {
            type:"User Leave Room",
            source:room,
            author:user
        }
        addEvent(event,token)
    })
}         
    const addEvent = async (event, token) => {
        const config = {
            headers:{
               "Content-Type":"application/json",
               "Authorization":`Bearer ${token}`
            }
        }
        
        try{    
            // eslint-disable-next-line
            const response = await axios.post(`${SERVER}/api/event`,event,config);  

        }catch(error) {
            console.error(error.response.data.error)
        }

    }

     async function getAllChats(token) {
         const config = {
             headers: {
                 "Authorization" : `Bearer ${token}`
             }
         };

         try {
             const response = await axios.get(`${SERVER}/api/chat`,config);
             dispatch({
                 type:"GET_CHATS",
                 payload:response.data.data
             })
         }
         catch(error) {
             console.error(error);
             dispatch({
                 type:"CHAT_ERROR",
                 payload:error.response.data.error
             })
         }
     }

     async function addChatMessage(token,msg) {
         const config = {
             headers: {
                 "Content-Type":"application/json",
                 "Authorization" : `Bearer ${token}`
             }
         }

         try{
             const response = await axios.post(`${SERVER}/api/chat`,msg,config);
             
            dispatch({
                type:"ADD_CHAT",
                payload:response.data.data
            })
             
         }

         catch(error){
             dispatch({
                 type:"ADD_CHAT_ERROR",
                 payload:error.response.data.error
             })
         }
     }

     // get All Rooms from DB
     async function getAllRoom (token,msg) {
        const config = {
            headers:{
               "Authorization":`Bearer ${token}`
            }
        }
        try{
            const response = await axios.get(`${SERVER}/api/room`,config,msg);
            
            dispatch({
                type:'GET_ROOMS',
                payload:response.data.data
            });
            
         } catch(err){
             dispatch({
                 type:'ROOM_ERROR',
                 payload:err.response.data.error
             })
         }
    }

    // get Chats by room
    async function getChatByRoom(token,room){
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }

        try{
            const response = await axios.get(`${SERVER}/api/chat/room/${room}`,config);

            dispatch({
                type:"GET_CHAT_BY_ROOM",
                payload: response.data.data
            })
        }
        catch (error){ 
            console.error(error);
            dispatch({
                type:"GET_CHAT_BY_ROOM_ERROR",
                payload:error.response.data.error
            })
        }
    }
return( 
    <GlobalContext.Provider value={{
            //states    
            user,
            setUser,
            token,
            setToken,
            activeRoom,
            setActiveRoom,
            //socket emit action
            sendUser,
            joinRoom,
            leaveRoom,
            sendChat,
            socket,
            //initialState
            rooms:state.rooms,
            users:state.users,
            chats:state.chats,
            //API Interact
            getAllRoom,
            getAllChats,
            getChatByRoom,
            addChatMessage,
            dispatch
    }}>
            
            {children}
        </GlobalContext.Provider> 
    )
}