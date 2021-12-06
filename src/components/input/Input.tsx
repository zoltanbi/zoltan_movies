import React, { ChangeEventHandler } from 'react';

import './input.scss';

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: any;
}

const Input = (props: InputProps) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            // @ts-ignore
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
};

export default Input;
