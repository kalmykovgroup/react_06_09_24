import './Menu.css'
import {Component} from "react";
import {Link} from "react-router-dom";



class Menu extends Component {


    constructor(props) {
        super(props);

    }
    render() {

        return ( <>
            <div className="menu">
                <nav>
                    <ul>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="game">Game</Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </>);
    }
}

export default Menu;