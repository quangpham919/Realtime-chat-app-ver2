import React, {useState, useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import {GlobalContext} from "../context/GlobalContext";
import axios from 'axios';
import { navigate } from "@reach/router";

const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing(4),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding: "10rem 0",     
    },
   
    formContainer:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
        margin:theme.spacing(3),
        
    },
    input:{
        width:"20rem",
        color:'#1098f7'
    },
    button:{
        width:"5rem",
        margin:theme.spacing(3,0)
    },
    loading:{
        margin:theme.spacing(3,0)
    }
    
}));


const UserLogin = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const SERVER = `https://quang-api-chat.herokuapp.com`
    const {setToken, setUser, sendUser} = useContext(GlobalContext);
    const handleChange = (e) => {
        e.preventDefault();
        
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            const user = {
                name: name, 
            }
            axios.post(`${SERVER}/join`,
            user)
            .then(response => {
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user",name)
                setUser(name);
                sendUser({
                    user: name,  
                })
                setLoading(false);
                navigate(`/chat`);
            })
            .catch(err => {
                console.error(err);
            });

        
      
    }
    return(
        <div className={classes.root}>
            <Typography component="h1" variant="h5">
                Guest Join    
            </Typography> 
            <form method="POST" onSubmit={handleSubmit}  className={classes.formContainer}>
            <TextField className={classes.input} fullWidth required value={name} onChange={handleChange} placeholder="Pick a name" id="name" label="Your Name:" variant="outlined"  />    
            {loading ? 
            (<CircularProgress className={classes.loading} />) 
            : (<Button color="primary" type="submit" fullWidth className={classes.button} disabled={!name}> Join </Button>) 
            }
            
            </form>        
        </div> 
    )
}

export default UserLogin;