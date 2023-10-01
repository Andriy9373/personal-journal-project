import { forwardRef } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

const Input = forwardRef(function Input({ type = 'text', isValid = true, className, appearence, name, ...props }, ref) {

    return (
        <input type={type} name={name} ref={ref} {...props} className={
            classNames(
                className,
                styles['input'],
                {
                    [styles['invalid']]: !isValid,
                    [styles['input-title']] : appearence === 'title'
                }
            )
        }/>
    );
});

export default Input;
