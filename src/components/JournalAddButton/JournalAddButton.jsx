import styles from './JournalAddButton.module.css';
import CardButton from '../CardButton/CardButton';

function JournalAddButton({ clearForm }) {

    return (
        <CardButton className={styles['journal-add-button']} onClick={clearForm}>
            <div className={styles['wrapper']}>
                <i className='fa-solid fa-plus'></i>
                <p>Add new memory</p>
            </div>
        </CardButton>
    );
}

export default JournalAddButton;
