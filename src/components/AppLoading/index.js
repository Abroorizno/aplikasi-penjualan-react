import React from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

// Style
import useStyles from './style';

function AppLoading(){

    const classes = useStyles();

    return (
        <Container maxWidth="xs">
            <div className={classes.loadingBox}>
                <Typography variant="h6" component="h2" className={classes.title}>
                    Aplikasi Penjualan
                </Typography>
                <LinearProgress />
            </div>
        </Container>
    )
}

export default AppLoading;