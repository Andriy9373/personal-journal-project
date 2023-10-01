import './Aside.css';

function Aside(props) {

    return (
        <div className="aside">
            {props.children}
        </div>
    );
}

export default Aside;
