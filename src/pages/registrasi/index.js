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

function Registrasi(){
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '',
        password: '',
        ulangi_password:''
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        ulangi_password: ''

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

        if(!form.ulangi_password){
            newError.ulangi_password = 'Re-Password is Required!'
        }else if(form.ulangi_password !== form.password){
            newError.ulangi_password = "Re-Password Must Be Same Like Password"
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
                auth.createUserWithEmailAndPassword(form.email, form.password)
            }catch(e){
                const newError = {};

                switch(e.code){
                    case 'auth/email-already-in-use':
                        newError.email = 'Email Already Exists!';
                    break;

                    case 'auth/invalid-email':
                        newError.email = 'Email Invalid!';
                    break;

                    case 'auth/weak-password':
                        newError.password = 'Password is Very Weak!';
                    break;

                    case 'auth/operation-not-allowed':
                        newError.email = 'Email and Password Methods Are Not Supported';
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

                <Textfield
                    id= "ulangi_password"
                    type= "password"
                    name= "ulangi_password"
                    margin= "normal"
                    label = "Re-Password"
                    fullWidth
                    required
                    value={form.ulangi_password}
                    onChange={handleChange}
                    helperText={error.ulangi_password}
                    error={error.ulangi_password?true:false}
                    disabled={isSubmiting}
                />
            
                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button disabled={isSubmiting} type="submit" color="primary" variant="contained" size="large">
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

export default Registrasi;