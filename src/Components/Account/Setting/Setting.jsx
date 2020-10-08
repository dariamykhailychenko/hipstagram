import React, { useEffect } from 'react';
import Header from '../Header';
import ChangeProfile from './ChangeProfile';
import ChangePassword from './ChangePassword';
import { useDispatch } from 'react-redux';
import { getCurrentUserThunk } from '../../../store/general/thunks';
import './style.css';


const Setting = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, [dispatch]);

    return (
        <>
            <Header title="Settings"/>
            <div className="wrapper">
                <div className="common-block">
                    <div className="setting-wrapper">
                        <ChangeProfile/>
                        <ChangePassword/>
                    </div>
                </div>
            </div>
        </>  
    );
}

export default Setting;