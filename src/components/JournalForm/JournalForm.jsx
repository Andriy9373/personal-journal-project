import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classNames from 'classnames';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm(props) {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, values, isFormReadyToSubmit } = formState;
    const { userId } = useContext(UserContext);

    const titleRef = useRef();
    const textRef = useRef();
    const dateRef = useRef();

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        if (!props.data) {
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }
        dispatchForm({ type: 'SET_VALUE', payload: { ...props.data } });
    }, [props.data, userId]);

    useEffect(() => {
        let timerId;
        if (!isValid.title || !isValid.text || !isValid.date) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: 'RESET_VALIDITY' });
            }, 2000);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            props.onSubmit(values);
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }
    }, [isFormReadyToSubmit, values, userId, props]);

    const submit = e => {
        e.preventDefault();
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        dispatchForm({ type: 'SUBMIT' });
    };

    const onChange = e => {
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
    };

    const deleteJournalItem = () => {
        props.onDelete(props.data?.id);
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    };

    return (
        <form className={styles['journal-form']} onSubmit={submit}>
            <div className={styles['form-row']}>
                <Input
                    name='title'
                    type='text'
                    appearence='title'
                    ref={titleRef}
                    isValid={isValid.title}
                    value={values.title}
                    onChange={onChange}
                />
                {
                    props.data?.id &&
                    <button className={styles['delete']} type='button' onClick={deleteJournalItem}>
                        <i className='fa-solid fa-trash'></i>
                    </button>
                }
            </div>

            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <i className='fa-regular fa-calendar'></i>
                    <span>Date</span>
                </label>
                <Input
                    name="date"
                    id="date"
                    type="date"
                    ref={dateRef}
                    isValid={isValid.date}
                    value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
                    onChange={onChange}
                    className={
                        classNames(
                            styles['input']
                        )
                    }/>
            </div>

            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <i className='fa-regular fa-folder'></i>
                    <span>Marks</span>
                </label>
                <Input type="text" onChange={onChange} value={values.tag} name="tag" id="tag" className={
                    classNames(
                        styles['input']
                    )
                }/>
            </div>

            <textarea name="text" ref={textRef} onChange={onChange} value={values.text} cols="30" rows="10" className={
                classNames(
                    styles['input'],
                    { [styles['invalid']]: !isValid.text }
                )
            }></textarea>
            <Button>Save</Button>
        </form>
    );
}

export default JournalForm;
