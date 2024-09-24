import {Component} from "react";
import './Control.css'
import {connect} from "react-redux";
import {saveState} from "../../../../store.js";
class Control extends Component {

  direction = {
        Top: 'top',
        Bottom: 'bottom',
        Left: 'left',
        Right: 'right',
    };


    state = {
        direction: this.direction.Top,
        speed : 500
    }

    constructor(props) {
        super(props);


        this.state = {
            direction: this.props.direction ?? this.direction.Top,
            speed : 500
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.isRun = false;
    }

    handleKeyDown(event){

        if (event.keyCode === 38 && this.state !== this.direction.Top) this.turn(this.direction.Top);

        else if (event.keyCode === 40 && this.state !== this.direction.Bottom) this.turn(this.direction.Bottom);

        if (event.keyCode === 37 && this.state !== this.direction.Left) this.turn(this.direction.Left);

        if (event.keyCode === 39 && this.state !== this.direction.Right) this.turn(this.direction.Right);

        if(this.isRun){
            event.preventDefault();
        }
    }

    componentDidMount(){

        const positions = this.props.positions ?? [];

        if(positions.length === 0)
        {
            let x = (this.props.matrix.current.width / 2 - this.props.matrix.current.snake.sizeHead) ;
            let y = (this.props.matrix.current.height / 2 - this.props.matrix.current.snake.sizeHead) ;

            let startPosition = {x : x, y : y}

            startPosition.x = startPosition.x - (startPosition.x % this.props.matrix.current.snake.sizeHead);
            startPosition.y = startPosition.y - (startPosition.y % this.props.matrix.current.snake.sizeHead);

            positions.push(startPosition);
        }

        this.props.matrix.current.snake.setStartPosition(positions);

        document.addEventListener("keydown", this.handleKeyDown, false);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }


    turn(direction){
        this.setState({
            direction: direction
        })
    }

    
    start(){
        if(!this.isRun){
            this.isRun = true;
            this.interval = setInterval(() => { this.tic(this); }, this.state.speed);
        }
    }





    tic(){
        let x = this.props.matrix.current.snake.state.body[0].action.state.position.x;
        let y = this.props.matrix.current.snake.state.body[0].action.state.position.y;

        switch (this.state.direction){
            case this.direction.Top:     y = y - this.props.matrix.current.snake.sizeHead; break;
            case this.direction.Bottom:  y = y + this.props.matrix.current.snake.sizeHead; break;
            case this.direction.Left:    x = x - this.props.matrix.current.snake.sizeHead; break;
            case this.direction.Right:   x = x + this.props.matrix.current.snake.sizeHead; break;
        }

        if(x < 0 || y < 0 || x > this.props.matrix.current.width - this.props.matrix.current.snake.sizeHead || y > this.props.matrix.current.height - this.props.matrix.current.snake.sizeHead){
            clearInterval(this.interval);
            this.props.matrix.current.setState({
                isGameOver: true,
                isRun: false
            });
            return;
        }


        this.props.matrix.current.snake.move({x: x, y : y});
    }
    


    render() {
        return (<div className="control">
            <button onClick={() => this.start()}>start</button>
            <button onClick={() => this.props.matrix.current.snake.setPart()}>addPart</button>
            <br/>

        </div> );
    }
}




function mapStateToProps(state) {
    return {
        positions: state.positions,
        direction: state.direction
    }
}

const mapDispatchToProps =  {
    saveState
}

export default connect(mapStateToProps , mapDispatchToProps, null, { forwardRef: true })(Control);