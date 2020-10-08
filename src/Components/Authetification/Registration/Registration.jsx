import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../Input';
import Button from '../../Button';
import { registrationThunk } from '../../../store/general/thunks';
import { ToastContainer} from 'react-toastify';
import { useForm } from 'react-hook-form';


const Registration = () => {
    const { handleSubmit, register, errors, setValue } = useForm();

    const dispatch = useDispatch();
    const onSubmit = value => {
        dispatch(registrationThunk(value));
        setValue('login', '');
        setValue('email', '');
        setValue('password', '');
    };

    const refLogin = () => {
        return { 
            required: "Required",
            pattern: {
                value: /^[a-zA-Z]{1,20}$/,
                message: "Invalid login. Login must consists of only alphabetic characters"
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

    const refPassword = () => {
        return {
            required: "Required",
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                message: "Invalid password"
            }
        }
    }
  
    return (
        <div className="content-block">
            <p className="heading">Sign Up</p>
            <ToastContainer/>
            <form className="form-block" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Login</label>
                    <Input
                        className="input-block"
                        id="login" 
                        type="text" 
                        name="login" 
                        placeholder="Enter your login"
                        reference={register(refLogin())}
                    />
                    <div className="error-form">{errors.login && errors.login.message}</div>
                    <label>Email</label>
                    <Input
                        className="input-block"
                        id ="email" 
                        type="text" 
                        name="email" 
                        placeholder="Enter your email"
                        reference={register(refEmail())}
                    />
                    <div className="error-form">{errors.email && errors.email.message}</div>
                    <label>Password</label>
                    <Input
                        className="input-block"
                        id ="password" 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password"
                        reference={register(refPassword())}
                    />
                    <div className="error-form">{errors.password && errors.password.message}</div>
                </div>
                <Button className="submit-button style-button-submit" id="submit-button" name="Sign up"></Button>
            </form>
            <div className="link-block">
                If you have account you can <Link className="link" to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default Registration;