import React from 'react';
import './account.css';

const AccountWrapper = ({children}) => {
    return (
        <div className="main-wrapper">
            {children}
        </div>
    );
}

export default AccountWrapper;