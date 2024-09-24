import './Game.css';
import React, {Component} from "react";
import Matrix from "./matrix/Matrix.jsx";
import Control from "./control/Control.jsx";
import {saveState} from "../../../store.js";
import {connect} from "react-redux";

class Game extends Component {


    constructor(props) {
        super(props);

        this.matrix = React.createRef();
        this.control = React.createRef();
    }


    render() {

        return ( <>
           <div>
               <Matrix ref={this.matrix} />
               <Control ref={this.control} matrix={this.matrix} />
            </div>

        </>);
    }


    componentWillUnmount() {

        const positions = [];

        for(let object of this.matrix.current.snake.state.body){
            positions.push(object.action.state.position);
        }
        this.props.saveState({
            positions : positions,
            direction : this.control.current.state.direction
        });
    }

}

const mapStateToProps = (state) => {
    return {
        positions: state.positions,
        duration: state.duration
    }
}

const mapDispatchToProps =  {
    saveState
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);