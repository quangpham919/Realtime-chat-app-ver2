import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles"
import {Typography, TextField, Button} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
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
        width:"20rem",
        padding:theme.spacing(1,0)
    },
    button:{
        width:"100%",
        margin:theme.spacing(3,0)
    }
}));

const AdminLogin = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();
    
    const hanndleSubmit = (e) => {
        e.preventDefault();
        console.log(`email:${email}
        password: ${password}`)
        console.log("Login button is click")
    }
   

    return (
        <div className={classes.root}>
        <Typography component="h1" variant="h5">
           Admin Login
        </Typography> 
        <form onSubmit={hanndleSubmit} className={classes.formContainer}>
       
        <TextField className={classes.input} fullWidth required value={email}  onChange={e => setEmail(e.target.value)} placeholder="Enter your email:" id="email" label="Email:" variant="outlined"  /> 
        <TextField type="password" className={classes.input} fullWidth required value={password} onChange={e => setPassword(e.target.value)}  placeholder="Enter your password" id="password" label="Password" variant="outlined"  />       
        <Button color="primary" type="submit" fullWidth className={classes.button} disabled={!email || !password}> Submit </Button>
       
        </form>        
    </div> 
    )
}

export default AdminLogin;