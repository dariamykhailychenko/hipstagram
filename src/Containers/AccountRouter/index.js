import React  from 'react';
import AccountWrapper from '../../Components/Account/AccountWrapper';
import { Redirect, Route, Switch } from 'react-router-dom';
import Profile from '../../Components/Account/Profile';
import Search from '../../Components/Account/Search';
import Setting from '../../Components/Account/Setting';
import Feeds from '../../Components/Account/Feeds';

const AccountRouter = () => {
    return (
        <AccountWrapper>
            <Switch>
                <Route path="/profile/:userId" component={Profile}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/search/:value" component={Search}/>
                <Route path="/search" component={Search}/>
                <Route path="/setting" component={Setting}/>
                <Route path="/Feeds" component={Feeds}/>
                <Redirect to="/profile"/>
            </Switch>
        </AccountWrapper>
    );
}
 
export default AccountRouter;
