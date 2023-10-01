import './JournalItem.css';

function JournalItem(props) {
    const formatedDate = new Intl.DateTimeFormat('en-EN').format(props.date);

    return (
        <>
            <h3 className="journal-item__header">{props.title}</h3>
            <div className="journal-item__body">
                <p className="journal-item__date">{formatedDate}</p>
                <p className="journal-item__text">{props.text}</p>
            </div>
        </>
    );
}

export default JournalItem;
