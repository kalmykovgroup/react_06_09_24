import './Content.css'
import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import About from "../pages/about/About.jsx";
import Home from "../pages/home/Home.jsx";
import Game from "../pages/games/shake/Game.jsx";



class Content extends Component {


    constructor(props) {
        super(props);
    }

    render() {

        return ( <>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="game" element={<Game />}/>
                </Routes>
            </div>

        </>);
    }

}

export default Content;