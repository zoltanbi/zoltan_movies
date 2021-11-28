import React from 'react'
import PropTypes from 'prop-types'

import './button.scss';

interface ButtonProps {
    className?: string;
    onClick?: any;
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    return (
        
        <button 
            className={`btn ${props.className}`} 
            // @ts-ignore
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = (props: any) => {
    return (
        <Button
        className={`btn-outline ${props.className}`} 
        // @ts-ignore
        onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </Button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button
