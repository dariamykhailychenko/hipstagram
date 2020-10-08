import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Input';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../../../store/general/thunks';
import { UserProfile } from '../../Icons/Icons';
import { LogoutUser } from '../../Icons/Icons';
import { SearchUser } from '../../Icons/Icons';
import { OpenFeeds } from '../../Icons/Icons';
import './style.css';

const Header = ({isSearch, title, updateSearchValue}) => {
    const dispatch = useDispatch();
    
    const logoutUser = () => {
        dispatch(logoutThunk());
    }

    const heandlerSearch = (timer=null) => (e) => {
        let value = e.target.value;
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout (() =>  {
            e.preventDefault();
            updateSearchValue(value);
        }, 1500)
    }

    return (
        <header className="header">
            <div className="search-block">
                {isSearch ?
                    <Input id="search" name="search" className="search" onChange={heandlerSearch()} placeholder="Search..."/> 
                    :
                    <Link className="btn-edit-profile" to="/search">
                        <ul>
                            <li className="icon-loupe">
                                <SearchUser/>
                            </li>
                        </ul> 
                    </Link> 
                }
            </div>
            <div className="name">{title}</div>
            <div>
                <ul className="icons-block">
                    <li className="icon"><Link to="/feeds"><OpenFeeds/></Link></li>
                    <li className="icon"><Link to="/profile"><UserProfile/></Link></li>
                    <li className="icon" onClick={logoutUser}><LogoutUser/></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;