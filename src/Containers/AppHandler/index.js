import React  from 'react';
import { useSelector } from 'react-redux';
import {getAuthStatusSelector} from '../../store/general/selectors';
import AccountRouter from '../AccountRouter';
import AuthRouter from '../AuthRouter';

const AppHandler = () => {
    const isAuth = useSelector(getAuthStatusSelector);
    return isAuth ? <AccountRouter/> : <AuthRouter/>;
}

export default AppHandler;