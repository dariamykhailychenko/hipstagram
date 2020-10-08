import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Button from '../../Button';
import NotFound from './NotFound.jsx';
import { useDispatch } from 'react-redux';
import { 
    getUsersByLoginThunk, 
    followUserThunk, 
    getCurrentUserThunk,
    getUserFollowersByLoginThunk,
    getUserFollowingsByLoginThunk
} from '../../../store/general/thunks';
import { useSelector } from 'react-redux';
import { getUserDataSelector, getFoundUsers } from '../../../store/general/selectors';
import { Link } from 'react-router-dom';
import { UserAvatar } from '../../Icons/Icons';
import './search.css';

const Search = ({match}) => {
    const { value } = match.params;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk());
    }, [dispatch]);

    const currentUser = useSelector(getUserDataSelector);

    const [searchValue, updateSearchValue] = useState('');

    useEffect(() => {
        if (value === 'followers') {
            dispatch(getUserFollowersByLoginThunk(searchValue, currentUser));
        } else if (value === 'followings') {
            dispatch(getUserFollowingsByLoginThunk(searchValue, currentUser));
        }
        else { 
            dispatch(getUsersByLoginThunk(searchValue));
        }
    }, [dispatch, value, searchValue, currentUser]);

    const followUser = (userId) => {
        dispatch(followUserThunk(userId));
    }

    const users = useSelector(getFoundUsers);
    const getFollowButtonName = (userId) => {
        if (currentUser && currentUser.following) {
            return currentUser.following.find(el => el.id === userId) ? 'Unfollow' : 'Follow';
        }
        return 'Follow';
    }

    return (
        <>
            <Header isSearch="true" updateSearchValue={updateSearchValue} title="Search"/>
            <div className="wrapper">
                <div className="common-block">
                    {(users && users.length > 0) ?
                        <FoundUsers value={value} users={users} 
                            getFollowButtonName={getFollowButtonName} 
                            followUser={followUser}/>
                        :
                        <NotFound/> 
                    }
                </div>
            </div>
        </>
    );
}

const FoundUsers = ({value, users, getFollowButtonName, followUser}) => {
    const userElements = users.map(user => <FoundUser value={value} user={user} getFollowButtonName={getFollowButtonName} 
        followUser={followUser} key={value ? user.id : user._id}/>)
    return (
        <div className="search-wrapper">
            {userElements}
        </div>
    )
}

const FoundUser = ({value, user, getFollowButtonName, followUser}) => {
    return (
        <div className="user-block">
            <div className="user">
                <Link to={`/profile/${value ? user.id : user._id}`}>
                    <div className="avatar-block">
                        {user.avatar ?
                        <img className="user-avatar" src={user.avatar} alt="avatar" />
                        : <UserAvatar/>}
                    </div>
                </Link>
                <div className="name-block">
                    {user.login}
                </div>
            </div>
            <Button className="btn-subscribe" 
            name={getFollowButtonName(value ? user.id : user._id)} 
            onClick={() => followUser(value ? user.id : user._id)}></Button>
        </div>
    );
}

export default Search;