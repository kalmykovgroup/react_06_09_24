import './Matrix.css'
import {Component} from "react";
import Snake from "../snake/Snake.jsx";


class Matrix extends Component {

    state = {
        isGameOver : false
    }
    constructor(props) {
        super(props);

        this.props.setRef(() => this);
        this.width = 600;
        this.height = 500;

    }


    componentDidMount(){
      this.snake = this.snake();
    }



    render() {
        return (<>
                <div className="matrix" style={{width: this.width, height: this.height}}>

                    <div className="textGameOver" style={{ visibility: this.state.isGameOver ? 'visible': 'hidden'}}>
                        <span>Game over</span>
                    </div>

                   <Snake gameState={this.props.gameState}  width={this.width} height={this.height}  setRef={ref => this.snake = ref}/>
                </div>
        </>
        );
    }
}


export default Matrix;