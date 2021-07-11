import React, { useState } from 'react';

// Import Component Material-UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import Textfield from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';


// Import Styles
import useStyles from './style';

// React Router Dom
import { Link, Redirect } from 'react-router-dom';

import isEmail from 'validator/lib/isEmail';

// Firebase Hook
import { useFirebase } from '../../components/FirebaseProvider';

//App Component
import AppLoading from '../../components/AppLoading';

// NotiStack Hook
import {useSnackbar} from 'notistack';

function LupaPassword(){
    const classes = useStyles();
    const [form, setForm] = useState({
        email: ''
    })

    const [error, setError] = useState({
        email: ''
    })

    const[isSubmiting, setSubmiting] = useState(false);

    const {auth, user, loading} = useFirebase();

    const {enqueueSnackbar} = useSnackbar();

    const handleChange = e =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {
        const newError = {...error};

        if(!form.email){
            newError.email = 'Email is Required!';
        }else if(!isEmail(form.email)){
            newError.email = 'Email Not Valid!';
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findError = validate();

        if(Object.values(findError).some(err=>err!== '')){
            setError(findError);
        }else{
            try{
                setSubmiting(true);
                const actionCodeSettings = {
                    url: `${window.location.origin}/login`
                }
                await
                auth.sendPasswordResetEmail(form.email, actionCodeSettings)
                setSubmiting(false);

                enqueueSnackbar(`Check Your Inbox Email : ${form.email}, a Link for Re-Setting Password that has been Sent!`,{
                    variant:'success'
                });
            }catch(e){
                const newError = {};

                switch(e.code){
                    case 'auth/user-not-found':
                        newError.email = 'User Not Found!';
                        enqueueSnackbar(`Please Check or Remembering Your Email when You Create an Account!`,{
                            variant:'warning'
                        });
                    break;

                    case 'auth/invalid-email':
                        newError.email = 'Email Invalid!';
                    break;

                    default:
                        newError.email = 'Something Went Wrong, Please Try Again!'
                    break;
                }
                setError(newError);
                setSubmiting(false);
            }
        }
    }

    if(loading){
        return <AppLoading />
    }

    if(user){
        return <Redirect to="/"/>
    }

    console.log(user)
    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5" component="h1">
                Registration Page
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
                <Textfield
                    id= "email"
                    type= "email"
                    name= "email"
                    margin= "normal"
                    label = "Email Address"
                    fullWidth
                    required
                    value={form.email}
                    onChange={handleChange}
                    helperText={error.email}
                    error={error.email?true:false}
                    disabled={isSubmiting}
                />
            
                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button disabled={isSubmiting} type="submit" color="primary" variant="contained" size="large">
                            SEND
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button disabled={isSubmiting} component={Link} variant="contained" size="large" to="/registrasi">
                            SignIn
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={isSubmiting} component={Link} variant="contained" size="large" to="/login">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>

}

export default LupaPassword;