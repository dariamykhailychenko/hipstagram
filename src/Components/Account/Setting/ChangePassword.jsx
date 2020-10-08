import React from 'react';
import Input from '../../Input';
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { updatePasswordThunk } from '../../../store/general/thunks';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import './style.css';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const { handleSubmit, register, errors, setValue } = useForm(); 

    const dispatch = useDispatch();
    const onSubmitPassword = (value) => {
        dispatch(updatePasswordThunk(value));
        setValue('password', '');
        setValue('confirmPassword', '');
    };

    const refPassword = () => {
        return {
            required: "Required",
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                message: "Invalid password"
            }
        }
    }

    const refConfirmPassword = () => {
        return {
            required: "Required",
            validate: value => value.confirmPassword === value.password || "The passwords do not match"
        }
    }

    return (
        <form className="setting-block" onSubmit={handleSubmit(onSubmitPassword)}>
            <ToastContainer/>
            <h3>Change password</h3>
            <div className="user-data">
                <div className="block">
                    <aside className="aside">
                        <label>New Password</label>
                    </aside>
                    <div className="change-text">
                        <Input
                            className="text"
                            id="password" 
                            type="password" 
                            name="password" 
                            reference={register(refPassword())}
                        />
                        <div className="error-form">{errors.newPassword && errors.newPassword.message}</div>
                    </div>
                </div>
                <div className="block">
                    <aside className="aside">
                        <label>Confirm new password</label>
                    </aside>
                    <div className="change-text">
                        <Input
                            className="text"
                            id="confirmPassword" 
                            type="password" 
                            name="confirmPassword" 
                            reference={register(refConfirmPassword())}
                        />
                        <div className="error-form">{errors.confirmPassword && errors.confirmPassword.message}</div>
                    </div>
                </div>
                <div className="btn">
                    <Button className="btn-subscribe" name="Change"/>
                </div>
            </div>
        </form>
    );
}

export default ChangePassword;