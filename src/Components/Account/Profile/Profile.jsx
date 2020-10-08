import React, {useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Button from '../../Button';
import { UserAvatar } from '../../Icons/Icons';
import ModalNewPost from '../../Modal/ModalNewPost';
import ModalPost from '../../Modal/ModalPost';
import { PlusPost } from '../../Icons/Icons';
import { getUserDataSelector, getSelectedUser } from '../../../store/general/selectors';
import { useSelector } from 'react-redux';
import { getCurrentUserThunk, getUserByIdThunk, followUserFromProfileThunk } from '../../../store/general/thunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './profile.css';

const Profile = ({match}) => {
    const { userId } = match.params;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUserThunk());
        if (userId) {
            dispatch(getUserByIdThunk(userId));
        }
    }, [dispatch, userId]);

    let currentUser = useSelector(getUserDataSelector);
    
    let isCurrent = true;
    let getUserSelector = null;
    if (userId) {
        isCurrent = false;
        getUserSelector = getSelectedUser;
    } else {
        currentUser = null;
        getUserSelector = getUserDataSelector;
    }

    let user = useSelector(getUserSelector);
    const userAvatar = user.avatar;
    const login = user.login || '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const posts = user.posts ? user.posts : [];
    const postsSize = posts ? posts.length : '0';
    const followersSize = user.followers ? user.followers.length : user.followersCount; 
    const followingSize = user.following ? user.following.length : user.followingsCount;

    const[openModal, setOpenModal] = useState({open: false, id: ''});
    const openModalFunction = (postId) => {
        setOpenModal({open: true, id: postId});
    }
    const closeModalFunction = () => {
        setOpenModal({open: false, id: ''});
    }

    const[openModalNewPost, setOpenModalNewPost] = useState(false);
    const openModalNewPostFunction = () => {
        setOpenModalNewPost(true);
    }
    const closeModalNewPostFunction = () => {
        setOpenModalNewPost(false);
    }

    const followUser = () => {
        dispatch(followUserFromProfileThunk(user.id));
    }
    const getFollowButtonName = () => {
        if (currentUser && currentUser.following) {
            return currentUser.following.find(el => el.id === user.id) ? 'Unfollow' : 'Follow';
        }
        return 'Follow';
    }

    return (
        <>
            <Header title={login}/>
            <div className="wrapper">
                <div className="common-block">
                    <div className="user-wrapper">
                        {openModal.open ? <ModalPost closeModalFunction={closeModalFunction} 
                                            login={login} 
                                            avatar={userAvatar}
                                            currentUserLogin={isCurrent ? user.login : currentUser.login} 
                                            postId={openModal.id}/> 
                                        : ''
                        }
                        <div className="header-block">
                            <div className="avatar">
                                {userAvatar ? <img className="avatar-user" src={userAvatar} alt="avatar"/> : <UserAvatar/>}     
                            </div>
                            <div className="information-block">
                                <ul className="counter-block">
                                    <li className="item">
                                        <span>{postsSize}</span>
                                        Posts
                                    </li>
                                    <Link to="/search/followers">
                                        <li className="item">
                                            <span>{followersSize}</span>
                                            Followers
                                        </li>
                                    </Link>
                                    <Link to="/search/followings">
                                        <li className="item">
                                            <span>{followingSize}</span>
                                            Followings
                                        </li>
                                    </Link>
                                </ul>
                                {isCurrent ?
                                    <div className="operation-block">
                                        <Link className="btn-edit-profile" to="/setting">Edit profile</Link>
                                        {openModalNewPost ? <ModalNewPost closeModalNewPostFunction={closeModalNewPostFunction}/> : ''}
                                        <ul className="add-post" onClick={openModalNewPostFunction}>
                                            <li>
                                                <PlusPost/>
                                            </li>
                                        </ul>
                                    </div> :
                                    <div className="operation-block">
                                        <Button className="btn-edit-profile" onClick={followUser} name={getFollowButtonName()}/>
                                    </div>
                                }
                                <div>{firstName + ' ' + lastName}</div>
                            </div>
                        </div>
                        <Publications posts={posts} openModalFunction={openModalFunction}/>
                    </div>
                </div>
            </div>
        </>
    );
}

const Publications = ({posts, openModalFunction}) => {
    const publicationElements = posts.slice(0).reverse().map(element => 
        <Publication openModalFunction={openModalFunction} publication={element} key={element._id}/>
    );
    return (
        <div className="publications-block">
           {publicationElements}
        </div>
    );
}

const Publication = ({openModalFunction, publication}) => {
    return (     
        <div className="publication" onClick={() => openModalFunction(publication._id)}>
            <img className="img" src={publication.imgUrl} alt="post"/>
        </div>
    );
}

export default Profile;