import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'

import './modal.scss'

interface ModalProps {
    id: string;
    active: boolean;
    children?: React.ReactNode;
}

const Modal = (props: ModalProps) => {

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    return (
        <div id={props.id} className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

interface ModalContentProps {
    onClose?: any;
    children?: React.ReactNode;
}

export const ModalContent = (props: ModalContentProps) => {

    const contentRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        // @ts-ignore
        contentRef.current?.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }
    return (
        <div ref={contentRef} className="modal__content">
            {props.children}
            <div className="modal__content__close" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal
