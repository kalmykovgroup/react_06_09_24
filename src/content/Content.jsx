import './Content.css'
import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import About from "../pages/about/About.jsx";
import Home from "../pages/home/Home.jsx";
import Game from "../pages/games/shake/Game.jsx";



class Content extends Component {

        state = {
            gameState : undefined
        }
    constructor(props) {
        super(props);
    }

    render() {

        return ( <>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="game" element={<Game gameState={this.state.gameState} saveState={(pos) => this.saveGameState(pos)}/>}/>
                </Routes>
            </div>

        </>);
    }

    saveGameState(gameState){
       this.setState({
           gameState : gameState
       });
    }
}

export default Content;