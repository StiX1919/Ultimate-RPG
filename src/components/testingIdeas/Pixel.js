import React, {Component} from 'react'

// import HeightBox from './HeightBox'

class Pixel extends Component {
    constructor(props){
        super(props)

    }
//border exists only if size is 10px
    render(){
        return (
            <div style={{border: this.props.pixSize === 10 ? 'solid black .5px' : 'solid black 0',width: this.props.pixSize + 'px', height: this.props.pixSize + 'px', backgroundColor: this.props.pixel.color}}
            onClick={() => this.props.chooseColor(this.props.color, this.props.index, this.props.allArr)}
            >
        </div>
        )
    }
}

export default Pixel