import './Snake.css'
import Head from "./head/Head.jsx";
import {Component} from "react";
import Part from "./body/Part.jsx";


class Snake extends Component {

    state = {
        body : [],
        savedPosition: []
   }
    constructor(props) {
        super(props);

        let min = Math.min(this.props.width , this.props.height);

        this.sizeHead = min / 100 * 5;

        const object = {};

        object.visualElement = <Head  sizeHead={this.sizeHead} setRef={action => object.action = action}/>

        this.setBody(object);


        if(this.props.gameState !== undefined && this.props.gameState.positions.length > 1){

            for(let i = 1; i < this.props.gameState.positions.length; ++i){

                const object = {};

                object.visualElement = <Part sizeHead={this.sizeHead} setRef={_action => object.action = _action}/>;

                this.state.body.push(object);

            }
        }

        this.props.setRef(() => this);
    }

    setBody(object){
        this.state.body.push(object);
    }

    setStartPosition(positions){
        for(let i = 0; i < positions.length; ++i)
            this.state.body[i].action().move(positions[i]);
    }
    move = (position) => {

        this.state.body[0].action().move(position);

        for(let i = 1; i < this.state.body.length; ++i){

            this.state.body[i].action().move(this.state.body[i - 1].action().state.oldPosition);
        }

    }

    setPart(){
        const lastIdx = this.state.body.length - 1;


        const startPosition = this.state.body[lastIdx].action().oldPosition;


        let obj =  {visualElement : undefined, object : undefined}

        obj.visualElement = <Part startPosition={startPosition} sizeHead={this.sizeHead} setRef={_action => obj.action = () => _action()}/>;


        this.setState({
            body : [
                ...this.state.body,
                obj
            ]
        });

    }


    componentDidMount(){

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

export default Snake;