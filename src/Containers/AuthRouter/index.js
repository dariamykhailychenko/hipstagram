import React  from 'react';
import AuthWrapper from '../../Components/Authetification/AuthWrapper';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../Components/Authetification/Login';
import Registration from '../../Components/Authetification/Registration';

const AccountRouter = () => {
    return (
        <AuthWrapper>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Redirect to="/login"/>
            </Switch>
        </AuthWrapper>
    );
}

export default AccountRouter;