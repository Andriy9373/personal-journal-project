import './Button.css';

function Button(props) {
    return (
        <button
            className="button accent"
            onClick={props.onClick}
        >
            { props.children }
        </button>
    );
}

export default Button;
