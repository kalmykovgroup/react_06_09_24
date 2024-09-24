import './Matrix.css'
import Snake from "../snake/Snake.jsx";
import {Component} from "react";


class Matrix extends Component {

    state = {
        isGameOver : false
    }
    constructor(props) {
        super(props);

        this.width = 600;
        this.height = 500;

        this.snake = null;

        this.setSnakeRef = element => {
            this.snake = element;
        };

    }

    componentDidMount(){

    }

    render() {
        return (<>
                <div className="matrix" style={{width: this.width, height: this.height}}>

                    <div className="textGameOver" style={{ visibility: this.state.isGameOver ? 'visible': 'hidden'}}>
                        <span>Game over</span>
                    </div>

                   <Snake setSnakeRef={this.setSnakeRef} width={this.width} height={this.height} />
                </div>
        </>
        );
    }


}


export default Matrix;