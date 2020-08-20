import React,{useContext,useEffect,useCallback} from "react";
import {Drawer, Divider, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {GlobalContext} from "../context/GlobalContext";
import FaceIcon from '@material-ui/icons/Face';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

    drawer:{
        width:drawerWidth,
        flexShrink:0,
        
    },
    drawerPaper: {
        width:drawerWidth
    },
    drawerContainer:{
        overflow: 'auto',
    },
    item:{
        margin: theme.spacing(2,0)
    },
    user:{
        margin:theme.spacing(2),
        
    },
    roomName:{
        color:"#1098f7",
        fontWeight:"600px"
    },
    

}))


const RoomList = () => {
    const {getAllRoom,setActiveRoom,activeRoom, rooms, user,setUser, leaveRoom, joinRoom} = useContext(GlobalContext)
    const currentUser = user;
    
    const classes = useStyles()
    
    const getAllRoomsFromDB = useCallback(
        (token) => {
            // eslint-disable-next-line
            getAllRoom(token)
        },
        [ getAllRoom],
    )
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if(!user){
            setUser(localStorage.getItem("user"))
        }
        joinRoom({
            user:currentUser,
            room:'General'
        })

        getAllRoomsFromDB(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleClick = async (room) => {
        
        if(activeRoom !== room) {
            // user leave activeRoom 
           leaveRoom({
               user:currentUser,
               room:activeRoom
           })
        }
        await setActiveRoom(room)
        //user join room
        joinRoom({
            user:currentUser,
            room:room
        })
          
    }

    return (
        <div className="rooms-container"> 
        
        <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
            paper: classes.drawerPaper, 
        }}>
        <div className="user-container">
            <div> <Typography variant="h5" className={classes.user}> <FaceIcon className={classes.icon}/> Hi, {currentUser} </Typography> </div>
        </div> 
        <Divider/>
        <div className={classes.drawerContainer}> 
        <List>
        {
                rooms.map((room) => (
                   
                    <ListItem button onClick={ e => {handleClick(e.target.innerText)}} key={`room-name-${room.name}`} className={classes.item}> 
                        <ListItemText primary={room.name} className={classes.roomName}/>
                    </ListItem>
                ))
                    
                
        }
        </List> 
        </div>       
        </Drawer>
        </div>
    )
}

export default RoomList;