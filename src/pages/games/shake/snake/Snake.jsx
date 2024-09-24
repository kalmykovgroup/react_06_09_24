import './Snake.css'
import Head from "./head/Head.jsx";
import React, {Component} from "react";
import Part from "./body/Part.jsx";
import {saveState} from "../../../../store.js";
import {connect} from "react-redux";


class Snake extends Component {

    state = {
        body : [],
        savedPosition: []
   }
    constructor(props) {
        super(props);
        this.props.setSnakeRef(this);

        let min = Math.min(this.props.width , this.props.height);

        this.sizeHead = min / 100 * 5;

        const object = {};

        object.visualElement = <Head position={this.props.positions !== undefined ? this.props.positions[0] : undefined} sizeHead={this.sizeHead} setHeadRef={ref => object.action = ref}/>

        this.setBody(object);

        for(let i = 1; i < this.props.positions?.length; ++i){

            const object = { };

            object.visualElement = <Part position={this.props.positions[i]} sizeHead={this.sizeHead} setPartRef={ref => { object.action = ref; }}/>;

            this.state.body.push(object);

        }


    }

    setBody(object){
        this.state.body.push(object);
    }

    setStartPosition(positions){
        for(let i = 0; i < positions.length; ++i)
            this.state.body[i].action.move(positions[i]);
    }
    move = (position) => {

        const positions = [];

        positions.push(position);

        for(let i = 0; i < this.state.body.length - 1; ++i){
            positions.push(this.state.body[i].action.state.position);
        }


        for(let i = 0; i < this.state.body.length; ++i){
            this.state.body[i].action.move(positions[i]);
        }

    }

    setPart(){
        const lastIdx = this.state.body.length - 1;

        const position = this.state.body[lastIdx].action.state.oldPosition;
        let object =  { }

        object.visualElement = <Part position={position} sizeHead={this.sizeHead} setPartRef={(ref) => object.action = ref}/>;

        this.setState({
            body : [
                ...this.state.body,
                object
            ]
        });

    }





    render() {
        return (<>
            {this.state.body.map((employee, index) => {
                return (
                    <div key={index}>
                        {employee.visualElement}
                    </div>
                );
            })}

        </>);
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

export default connect(mapStateToProps, mapDispatchToProps)(Snake);