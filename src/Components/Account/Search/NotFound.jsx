import React from 'react';
import { NotFoundUser } from '../../Icons/Icons';

const NotFound = () => {
    return (
        <div className="not-found">
            <NotFoundUser/>
            <div className="title">Users not found</div>
        </div>
    );
}

export default NotFound;