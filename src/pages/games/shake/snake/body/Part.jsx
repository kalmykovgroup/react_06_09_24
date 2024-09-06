import './Part.css'
import {Component} from "react";

class Part extends Component {

    state = {
        position : {x: 0, y:0},
        oldPosition : {x: 0, y:0}
    }
    constructor(props) {
        super(props);

        if(this.props.startPosition !== undefined){
            this.state.position = this.props.startPosition;
            this.state.oldPosition = this.props.startPosition;
        }

        this.props.setRef(() => this);


    }

    componentDidMount(){
        console.log("visible part");
        console.log(this.state.oldPosition)
    }

    move(newPosition, callBack){
        this.setState({
                oldPosition : this.state.position,
                position : newPosition
            }, callBack
        );
    }


    render() {
        return (<>
            <div className="part" style={
                {
                    left: this.state.position.x,
                    top: this.state.position.y,
                    width: this.props.sizeHead,
                    height: this.props.sizeHead,
                }}>
                x:{this.state.position.x}
                <br/>
                y:{this.state.position.y}
            </div>
        </>);
    }
}

export default Part;