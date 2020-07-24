import React, {useState, useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextField, Button, Typography} from "@material-ui/core";
import {GlobalContext} from "../context/GlobalContext";
import axios from 'axios';
import { navigate } from "@reach/router";

const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing(1),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding: "10% 0%"
    },
   
    formContainer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        margin:theme.spacing(3),
        
    },
    input:{
        width:"30rem",
        
    },
    button:{
        width:"100%",
        margin:theme.spacing(3,0)
    }
    
}));


const UserLogin = () => {
    const [name, setName] = useState("");
    const classes = useStyles();
    const SERVER = `https://quang-api-chat.herokuapp.com`
    const {setToken, setUser, sendUser, token} = useContext(GlobalContext);
    const handleChange = (e) => {
        e.preventDefault();
        
        setName(e.target.value);
    }



    const handleSubmit = (e) => {
            axios.post(`${SERVER}/`, 
            {
                name
            }).then(response => {
                setToken(response.data.token);
                setUser(name);
                sendUser({name,token});
                navigate(`/chat`);

            }).catch(err => {
                console.error(err);
            });
        e.preventDefault();
      
    }
    return(
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Guest Join    
            </Typography> 
            <form method="POST" onSubmit={handleSubmit}  className={classes.formContainer}>
           
            <TextField className={classes.input} fullWidth required value={name} onChange={handleChange} placeholder="Pick a name" id="name" label="Your Name:" variant="outlined"  />    
            <Button color="primary" type="submit" fullWidth className={classes.button} disabled={!name} > Join </Button>
           
            </form>        
        </div> 
    )
}

export default UserLogin;