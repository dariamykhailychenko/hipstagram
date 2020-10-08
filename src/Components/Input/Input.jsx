import React from 'react';

const Input = (props) => {
    return (
        <input 
            id={props.id} 
            type={props.type}
            name={props.name} 
            placeholder={props.placeholder} 
            onChange={props.onChange}
            value={props.value}
            checked={props.checked}
            ref={props.reference}
            className={props.className}
        />
    );
};

export default Input;