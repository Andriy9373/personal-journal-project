import styles from './SelectUser.module.css';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {

    const { userId, setUserId } = useContext(UserContext);

    const onChange = e => {
        setUserId(Number(e.target.value));
    };

    return (
        <select className={styles['select']} name="user" id="user" value={userId} onChange={onChange}>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
        </select>
    );
}

export default SelectUser;
