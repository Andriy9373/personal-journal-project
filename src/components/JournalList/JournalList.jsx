import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList(props) {
    const { userId } = useContext(UserContext);

    if (props.items.length === 0) {
        return <p>No items. Add one</p>;
    }

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        }
        return -1;
    };

    return (
        <div className="journal-list">
            {props.items
                .filter(item => item.userId === userId)
                .sort((a, b) => sortItems(a, b))
                .map(item =>
                    <CardButton key={item.id} onClick={() => props.setItem(item)}>
                        <JournalItem title={item.title} text={item.text} date={item.date}/>
                    </CardButton>
            )}
        </div>
    );
}

export default JournalList;
