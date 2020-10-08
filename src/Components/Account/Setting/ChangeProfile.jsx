import React, {useEffect, useState} from 'react';
import Input from '../../Input';
import Button from '../../Button';
import { UserAvatar } from '../../Icons/Icons';
import { useDispatch } from 'react-redux';
import { getUserDataSelector } from '../../../store/general/selectors';
import { useSelector } from 'react-redux';
import { changeCurrentUserThunk } from '../../../store/general/thunks';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';


const ChangeProfile = () => {
    const { handleSubmit, register, errors, setValue, setError } = useForm();

    const user = useSelector(getUserDataSelector);
    const [avatar, updateAvatar] = useState(user.avatar);
    
    const dispatch = useDispatch();
    useEffect(() => {
        setValue("firstName", user.firstName);
        setValue("lastName", user.lastName);
        setValue("email", user.email);
        updateAvatar(user.avatar);
    }, [setValue, user])

    const setAvatar = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            updateAvatar(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const onSubmit = (value, e) => {
        e.preventDefault();
        value.avatar = avatar;

        if(avatar.size > 1) {
            setError("file", {
                type: "filesize",
                message: "File size should be no more than 2 Mb"
            })
            return;
        }

        dispatch(changeCurrentUserThunk(value));
    };

    const refName = () => {
        return { 
            pattern: {
                value: /^[a-zA-Z]{0,10}$/,
                message: "Invalid name. Name must consists of only 10 alphabetic characters"
            }
        }
    }

    const refLastName = () => {
        return { 
            pattern: {
                value: /^[a-zA-Z]{0,20}$/,
                message: "Invalid last name. Last name must consists of only 20 alphabetic characters"
            }
        }
    }

    const refEmail = () => {
        return {
            required: "Required",
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
            }
        }
    }

    return (
        <form className="setting-block" onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer/>
            <div className="file-field">
                <label className="label">
                    <div className="btn-floating">
                        {avatar ? <img className="avatar-user" src={avatar} alt="avatar"/> : <UserAvatar/>}
                        <div>
                            <Input 
                                type="file" 
                                id="avatar" 
                                name="avatar" 
                                onChange={setAvatar} 
                                reference={register({})}
                            />
                        </div>
                        <div className="error-form">{errors.avatar && errors.avatar.message}</div>
                    </div>
                </label>
            </div>
            <h3>Change profile</h3>
            <div className="user-data">
                <div className="block">
                    <aside className="aside">
                        <label>Name</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="firstName" 
                                type="text" 
                                name="firstName" 
                                reference={register(refName())}
                            />
                        </div>
                        <div className="error-form">{errors.name && errors.name.message}</div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Last Name</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="lastName" 
                                type="text" 
                                name="lastName"
                                reference={register(refLastName())}
                            />
                        </div>
                        <div className="error-form">{errors.lastName && errors.lastName.message}</div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Email</label>
                    </aside>
                    <div className="change-text">
                        <div>
                            <Input
                                className="text"
                                id="email" 
                                type="text" 
                                name="email" 
                                reference={register(refEmail())}
                            />
                        </div>
                        <div className="error-form">{errors.email && errors.email.message}</div>
                    </div>
                </div>
                
                <div className="btn">
                    <Button className="btn-subscribe" name="Change"/>
                </div>
            </div>
        </form>                      
    );
}

export default ChangeProfile;