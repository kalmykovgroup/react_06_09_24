import './Head.css'
import {Component} from "react";


class Head extends Component {

    state = {
        position : {x : 0, y : 0},
        oldPosition : {x : 0, y : 0}
    }
    constructor(props) {
        super(props);
        if(this.props.position !== undefined){
            this.state.position = this.props.position;
            this.state.oldPosition = this.props.position;
        }

        this.props.setHeadRef(this);
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
             <div className="head" style={
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

export default Head;