import React, {Component} from 'react'


class HeightBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            hIndex: null,
            wIndex: null,
            size: 0,
            color: '#FFFFFF'
        }
        this.chooseColor = this.chooseColor.bind(this)

    }
    componentDidMount(){
        this.setState({hIndex: this.props.heightIndex, wIndex: this.props.widthIndex, size: this.props.pixSize})
    }
    chooseColor(){
        this.setState({color: this.props.chosenColor})
    }

    render(){
        return (
            
            <div style={{border: 'solid black .5px',width: this.state.size + 'px', height: this.state.size + 'px', backgroundColor: this.state.color}}
                onClick={() => this.chooseColor()}
            >
            </div>
        )
    }
}


// widthArr.push({wInd: i, hInd: 0, color: '#FFFFFF'})
export default HeightBox