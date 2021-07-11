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

function Login(props){
    const {location} = props;
    const classes = useStyles();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const[isSubmiting, setSubmiting] = useState(false);

    const {auth, user, loading} = useFirebase();

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

        if(!form.password){
            newError.password = 'Password is Required!';
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
                await
                auth.signInWithEmailAndPassword(form.email, form.password)
            }catch(e){
                const newError = {};

                switch(e.code){
                    case 'auth/user-not-found':
                        newError.email = 'Email is Not Registered!';
                    break;

                    case 'auth/invalid-email':
                        newError.email = 'Email Invalid!';
                    break;

                    case 'auth/wrong-password':
                        newError.password = 'Wrong Password!';
                    break;

                    case 'auth/user-disabled':
                        newError.email = 'Account Has Been Disabled or Blocked!';
                    break;

                    default:
                        newError.email = 'Something Went Wrong, Please Try Again!';
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
        const redirecTo = location.state && 
        location.state.from && 
        location.state.from.pathname? 
        location.state.from.pathname : '/';
        return <Redirect to={redirecTo}/>
    }

    console.log(user)
    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5" component="h1">
                Login Page
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

                <Textfield
                    id= "password"
                    type= "password"
                    name= "password"
                    margin= "normal"
                    label = "Password"
                    fullWidth
                    required
                    value={form.password}
                    onChange={handleChange}
                    helperText={error.password}
                    error={error.password?true:false}
                    disabled={isSubmiting}
                />

            
                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button disabled={isSubmiting} type="submit" color="primary" variant="contained" size="large">
                            LOGIN
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button disabled={isSubmiting} component={Link} variant="contained" size="large" to="/registrasi">
                            SIGNIN
                        </Button>
                    </Grid>
                </Grid>

                <div className={classes.forgotPassword}>
                    <Typography component={Link} to="/lupa-password">
                        Forgot Password?
                    </Typography>
                </div>
            </form>
        </Paper>
    </Container>

}

export default Login;