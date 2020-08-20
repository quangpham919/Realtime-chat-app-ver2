import React from 'react'
import {Typography, Paper} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {makeStyles,withStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    messageContainer:{
        display:'flex',
        justifyContent:"flex-start",
        with:"100%",
        borderRadius:"50px",
        fontSize:"0.5rem"
    },
    currentUserMessage: {
        background:"#1098f7",
        "& Typography":'white'
    },
    flexEnd:{
        justifyContent:"flex-end",
        '& body1': {
            color:"white"
        }
    },
    flexStart:{
        marginLeft:"1rem"
    },  
    msgContainer:{
        margin:theme.spacing(1)
    }
}))

const WhiteTextTypography = withStyles({
    root:{
        color:"#ffff"
    }
})(Typography);


const Message = ({chat, user}) => {
    const currentUser = localStorage.getItem("user");
    const classes = useStyles();
    let isSentByCurrentUser = false;
    
    if (user === currentUser) {
        isSentByCurrentUser= true;
    }

    return (
        isSentByCurrentUser ? (
            <div className={`${classes.messageContainer} ${classes.flexEnd}`}> 
                <Paper className= {`${classes.currentUserMessage} ${classes.msgContainer}`} elevation={0}>  
                <WhiteTextTypography variant="body1"> {chat} </WhiteTextTypography>
                </Paper>
            </div>
        ) :
        (
            <div className={`${classes.messageContainer} ${classes.flexStart}`}>
                <AccountCircleIcon/> <Paper className= {` ${classes.msgContainer}`}  elevation={0}> 
                <Typography variant="caption" display="block"> {user}</Typography>
                <Typography variant="body1"> {chat} </Typography> 
                </Paper>
              </div>
        )
    )
}

export default Message;