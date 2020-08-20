import React, {useState, useContext,useEffect} from 'react'
import {makeStyles } from "@material-ui/core/styles"
import {Paper,Typography,Button, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {GlobalContext } from "../context/GlobalContext"
import Message from "../common/Message"
import SendIcon from '@material-ui/icons/Send';
import {css} from "glamor";
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
    height: "80%",
    width: "100%"
  });


const useStyles = makeStyles(theme => ({
   MessageList:{
       display:"flex",
       flexDirection:"column",
      
       height:"100vh"
   },
   activeRoom:{
        alignSelf:"center",
        margin:theme.spacing(2),
        
   },
   paper:{
       width:"15rem",
       backgroundColor:"#1098f7",
       textAlign:"center",
       
   },
   inputBar: {
      alignSelf:"start",
      margin:"0% 1%"
   },
   inputBarContainer:{
    display:"flex",
    alignItems:"center",
    
    position:'fixed',
    bottom:"0px",
    width:"100%", 
    }, 
    inputMessage:{
        flex:"1",
        border:'none',
        background:"#f3fbfb",
        alignItems:"center",
        height:"3rem",
        fontSize:"15px",
        borderRadius:"25%",
        "&.inputMessage":{
            outlined:"none"
        }
    },
    buttonContainer:{
    flex:"auto",
    fontSize:"15px",
    float:"right",
    paddingLeft:"10px"
    }
}))

const MessageList = () => {

    const {activeRoom,sendChat,getAllChats,chats,dispatch,socket,addChatMessage} = useContext(GlobalContext) 
    const user = localStorage.getItem("user");
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");
    

    useEffect(()=>{
      
        getAllChats(token);     
        
        // eslint-disable-next-line 
    },[])
     
    useEffect(()=>{
        socket.on("chat message", function(msg){

            const token = localStorage.getItem("token");
            addChatMessage(token,msg);   
            
        })
    },[])

    const InputValidate = (message) => {
        if(!message) {
            return false;
        }
        return true;
    }

    const handleChange = (e) =>{
        e.preventDefault();
        setMessage(e.target.value);
    }

    const handleClick =  () => {
        const chatAction = {
            message:message,
            author:user,
            room:activeRoom || "General"
        }
         
        sendChat(chatAction);
        setMessage("");
    }

    const handleKeyPress = (e) => {
        
        if(e.keyCode === 13 ) {
            handleClick();
            
        }
        e.preventDefault();
    }

    
    return( 
        <div className={classes.MessageList}>
            <div className={classes.activeRoom}> 
                <Paper className={classes.paper} elevation = {1}> 
                    <Typography className={classes.roomName} variant="h4">{activeRoom}  </Typography> 
                    
                </Paper> 
            </div>
            <ScrollToBottom className={`${ROOT_CSS}`}> 
            <div className="messagesContainer"> 

                    { chats.filter((chat) => {
                            return chat.room === activeRoom
                            }).map((chat,index) =>  {
                                return(
                                <div key={index}> <Message chat={chat.message} user={chat.author}/> </div> 
                                )
                    })      }
            
            </div> 
            </ScrollToBottom>              
            <div className={classes.inputBar}> 
                
            <div className={classes.inputBarContainer}> 
            <input type="text" id="input-message" className={classes.inputMessage} onKeyUp={(e)=>{handleKeyPress(e)}} onChange={handleChange} name="message" placeholder="  Type a message..." value={message} />
            <div className={classes.buttonContainer}> 
                <Button variant="contained" id="sendButton" color="primary" disabled={!InputValidate(message)} onClick={handleClick}> 
                    <SendIcon/>
                 </Button>
             </div> 
            </div>

            </div>

        </div>
    )
}

export default MessageList;