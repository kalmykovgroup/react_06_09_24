import {Component} from "react";
import './Control.css'
class Control extends Component {

  direction = {
        Top: 'top',
        Bottom: 'bottom',
        Left: 'left',
        Right: 'right',
    };


    state = {
        direction: this.direction.Top
    }

    constructor(props) {
        super(props);

        if(this.props.gameState !== undefined){
            this.state.direction = this.props.gameState.direction;
        }

        this.props.setRef(() => this);
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

        this.matrix = this.props.refMatrix();

        const positions = this.props.gameState !== undefined ? this.props.gameState.positions : [];

        if(positions.length === 0)
        {
            let x = (this.matrix.width / 2 - this.matrix.snake.sizeHead) ;
            let y = (this.matrix.height / 2 - this.matrix.snake.sizeHead) ;

            let startPosition = {x : x, y : y}

            startPosition.x = startPosition.x - (startPosition.x % this.matrix.snake.sizeHead);
            startPosition.y = startPosition.y - (startPosition.y % this.matrix.snake.sizeHead);

            positions.push(startPosition);
        }

        this.matrix.snake.setStartPosition(positions);

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

            this.interval = setInterval(() => { this.tic(this); }, 550);
        }
    }




    tic(){
        const pos = this.matrix.snake.state.body[0].action().state.position;

        switch (this.state.direction){
            case this.direction.Top:     pos.y = pos.y - this.matrix.snake.sizeHead; break;
            case this.direction.Bottom:  pos.y = pos.y + this.matrix.snake.sizeHead; break;
            case this.direction.Left:    pos.x = pos.x - this.matrix.snake.sizeHead; break;
            case this.direction.Right:   pos.x = pos.x + this.matrix.snake.sizeHead; break;
        }

        if(pos.x < 0 || pos.y < 0 || pos.x > this.matrix.width - this.matrix.snake.sizeHead || pos.y > this.matrix.height - this.matrix.snake.sizeHead){
            clearInterval(this.interval);
             this.matrix.setState({
                 isGameOver: true,
                 isRun: false
             });
            return;
        }


        this.matrix.snake.move(pos);
    }
    
    addPart(){
        this.matrix.snake.setPart();
    }

    render() {
        return (<div className="control">
            <button onClick={() => this.start()}>start</button>
            <button  onClick={() => this.addPart()}>addPart</button>

            <br/>

        </div> );
    }
}

export default Control;