import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components Page
import NotFound from './pages/404';
import Login from './pages/login';
import LupaPasword from './pages/lupa-password';
import Registrasi from './pages/registrasi';
import Private from './pages/private';
import PrivateRoute from './components/PrivateRoute';

//Firebase Context Provider
import FirebaseProvider from './components/FirebaseProvider';

// Import Component Materal-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './config/theme';

// Notistack Provider
import {SnackbarProvider} from 'notistack';

function App() {
  return (
    <>
      <CssBaseline />
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3500}>
            <FirebaseProvider>
              <Router>
                <Switch>
                  <PrivateRoute path="/" exact component={Private}/>
                  <PrivateRoute path="/pengaturan" component={Private}/>
                  <PrivateRoute path="/product" component={Private}/>
                  <PrivateRoute path="/transaksi" component={Private}/>
                  <Route path="/registrasi" component={Registrasi}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/lupa-password" component={LupaPasword}/>
                  <Route component={NotFound}/>
                </Switch>
              </Router>
            </FirebaseProvider>
          </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
