import React from 'react';
import {Grid} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import RoomList from "./RoomList"
import MessageList from "./MessageList"

const useStyles = makeStyles((theme) => ({
    
}))


const ChatPage = () => {
    const classes = useStyles();
    
   
    return (
       <div className={classes.container}>
            <Grid container spacing={1}> 
                <Grid item xs={2}> 
                    <RoomList/>
                </Grid>
                <Grid item xs={10}>
                    <MessageList/> 
                </Grid>
            </Grid>
       </div>
    )
}

export default ChatPage;