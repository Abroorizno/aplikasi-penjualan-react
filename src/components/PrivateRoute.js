import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useFirebase} from './FirebaseProvider';

function PrivateRoute({component:Components,...restProps})
{
    const {user} = useFirebase();
    return <Route{...restProps}
        render={props => {
            return user ?
            <Components {...props}/>
            :
            <Redirect to ={{
                pathname: './login'
            }}/>
        }}
    />
}

export default PrivateRoute;