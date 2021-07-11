import React from "react";

// Material UI
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';

// Style 
import useStyles from './style';

function NotFound(){

    const classes = useStyles();
    return (
        <Container maxWidth="xs"> 
            <Paper className={classes.paper}>
                <Typography variant="subtitle1"> PAGE NOT FOUND </Typography>
                <Typography variant="h3"> 404 </Typography>
                <Typography component={Link} to="/"> Back to Homepage </Typography>
            </Paper>
        </Container>
    )

}

export default NotFound;