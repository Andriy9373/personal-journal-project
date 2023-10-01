import styles from './Header.module.css';
import SelectUser from '../SelectUser/SelectUser';

function Header() {

    return (
        <>
            <p className={styles.header}>
                Personal Journal
            </p>
            <SelectUser/>
        </>
    );
}

export default Header;
