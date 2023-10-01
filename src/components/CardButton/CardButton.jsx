import './CardButton.css';

function CardButton(props) {

    const customClass = `card-button ${props.className ? props.className : ''}`;

    return (
        <button {...props} className={customClass}>{props.children}</button>
    );
}

export default CardButton;
