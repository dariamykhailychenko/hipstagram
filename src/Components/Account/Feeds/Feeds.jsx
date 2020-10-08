import React, {useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Input from '../../Input';
import Button from '../../Button';
import { Like } from '../../Icons/Icons';
import { Forward } from '../../Icons/Icons';
import { getFeedsSelector, getUserDataSelector } from '../../../store/general/selectors';
import { useSelector } from 'react-redux';
import { getFeedThunk, likePostFromFeedThunk, getCurrentUserThunk } from '../../../store/general/thunks';
import { useDispatch } from 'react-redux';
import './style.css';

const Feeds = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFeedThunk());
        dispatch(getCurrentUserThunk());
    }, [dispatch]);

    const feeds = useSelector(getFeedsSelector);
    const currentUser = useSelector(getUserDataSelector);

    const currentLogin = currentUser ? currentUser.login : '';

    const likePost = (postId) => {
        dispatch(likePostFromFeedThunk(postId));
    }

    const getFeedById = (postId) => {
        if (feeds) {
            return feeds.find(feed => feed._id === postId);
        }
        return [];
    }

    const isLiked = (postId) => {
        const feed = getFeedById(postId);
        return feed.likes.map(user => user.login).find(userLogin => userLogin === currentLogin) ? true : false;
    }

    return (
        <>
            <Header title="Feeds"/>
            <div className="wrapper">
                <div className="common-block">
                    <div className="feeds-wrapper">
                        <div className="post-block">
                            {
                                feeds.slice(0).reverse().map(element => {
                                    return(
                                        <div className="post">
                                            <div className="photo-wrapper">
                                                <Link to={`/profile/${element.ownerId}`}>
                                                    <img className="post-photo" src={element.imgUrl} alt="post"/>
                                                </Link>
                                            </div>
                                            <form className="modal-form">
                                                <div className="modal-active">
                                                    <ul className="icon-items">
                                                        <li className="icon" onClick={() => likePost(element._id)}>
                                                            <Like isLiked={isLiked(element._id)}/>
                                                        </li>
                                                        <li className="icon">
                                                            <Forward/>
                                                        </li>
                                                    </ul>
                                                    <div className="number-likes">
                                                        Likes <span>who</span> and <span>quantity</span> other...
                                                    </div>
                                                </div>
                                                <div className="comments-block">
                                                    <div>
                                                        <Input className="comment" placeholder="Add comments..."/>
                                                    </div>
                                                    <Button className="button-send" name="Send"></Button>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Feeds;