import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoutes } from './PublicRoutes';
export const AppRouter = () => {

    const dispatch = useDispatch();
    // protección de rutas
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])


    if ( checking ) {
        return (<h5>Espere ....</h5>);
    }

    return (
            <Router>
                <div>
                    <Switch>
                        <PublicRoutes 
                            exact 
                            path="/login" 
                            component={LoginScreen} 
                            isAuthenticated={ !!uid}
                        />
                        <PrivateRoute 
                            exact 
                            path="/" 
                            component={CalendarScreen} 
                            isAuthenticated={!!uid}
                        />
                        <Redirect to={"/"} />
                    </Switch>
                </div>
            </Router>
    )
}


// isAuthenticated : inidará si debo mostrar la información o no
// !! : indica negación a string vacio !!null : false