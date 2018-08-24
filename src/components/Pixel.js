import React, {Component} from 'react'

// import HeightBox from './HeightBox'

class Pixel extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <div style={{border: 'solid black .5px',width: this.props.pixSize + 'px', height: this.props.pixSize + 'px', backgroundColor: this.props.pixel.color}}
            onClick={() => this.props.chooseColor(this.props.color, this.props.index, this.props.allArr)}
            >
        </div>
        )
    }
}

export default Pixel