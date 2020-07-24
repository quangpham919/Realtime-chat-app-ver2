import React, {createContext, useState} from "react"
import io from "socket.io-client"

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

const sendChatAction = (chatAction) => {
    //chatAction { room, message}
    socket.emit("chat message", chatAction)
}

const sendUser = (user) => {
    // User {name, token}
    socket.emit('user joined', user)
}

const joinRoom = (joinRoomEvent) => {
    socket.emit('join room', joinRoomEvent )
}

const leaveRoom = (leaveRoomEvent) => {
    socket.emit('leave room', leaveRoomEvent)
}

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [user,setUser] = useState('');
    const [token,setToken] = useState('');
    const [activeRoom, setActiveRoom] = useState('General');
    //const [state,dispatch]= useReducer(reducer,initialState);
    const SERVER = `https://quang-api-chat.herokuapp.com`

    if(!socket) {

        socket = io(`${SERVER}/`)
        
        socket.emit("")
       
    }


    return( 
        <GlobalContextProvider value={{
            user,
            setUser,
            token,
            setToken,
            activeRoom,
            setActiveRoom,
            //socket emit action
            sendChatAction,
            sendUser,
            joinRoom,
            leaveRoom
        }}>
            
            {children}
        </GlobalContextProvider> 
    )
}

