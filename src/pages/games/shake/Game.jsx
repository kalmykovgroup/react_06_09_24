import './Game.css'
import {Component} from "react";
import Matrix from "./matrix/Matrix.jsx";
import Control from "./control/Control.jsx";



class Game extends Component {


    constructor(props) {
        super(props);

        this.initial()

    }

    initial(){

        this._matrix = <Matrix gameState={this.props.gameState} setRef={action => this.matrix = action}/>;

        this._control = <Control gameState={this.props.gameState} setRef={action => this.refControl = action} refMatrix={() => this.matrix()} />;
    }

    render() {

        return ( <>
            <div className="game">
                {this._matrix}
               {this._control}
            </div>

        </>);
    }


    componentWillUnmount(){

        const positions = [];

        for(let object of this.matrix().snake.state.body){
            positions.push(object.action().state.position);
        }


        this.props.saveState({
            positions : positions,
            direction : this.refControl().state.direction
        });
    }
}

export default Game;