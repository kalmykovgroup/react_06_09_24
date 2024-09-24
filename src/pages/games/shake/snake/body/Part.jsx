import './Part.css'
import {Component} from "react";

class Part extends Component {

    state = {
        position : {x: 0, y:0},
        oldPosition : {x: 0, y:0}
    }
    constructor(props) {
        super(props);

        props.setPartRef(this);

        if(this.props.position !== undefined){
            this.state.position = this.props.position;
            this.state.oldPosition = this.props.position;
        }


    }

    componentDidMount(){

    }

    move(newPosition, callBack = null){
        const oldPosition = this.state.position;

        this.setState({
                position : newPosition,
                oldPosition : oldPosition
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
            </div>
        </>);
    }
}

export default Part;