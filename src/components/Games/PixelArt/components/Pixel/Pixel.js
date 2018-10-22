import React, {Component} from 'react'

// import HeightBox from './HeightBox'

class Pixel extends Component {
//border exists only if size is 10px
    render(){
        return (
            <div style={{border: this.props.border ? 'solid black .5px' : 'solid black 0' ,width: this.props.pixSize + 'px', height: this.props.pixSize + 'px', backgroundColor: this.props.pixel.color, opacity: this.props.pixel.opacity}}
            onClick={() => this.props.chooseColor(this.props.color, this.props.opacity, this.props.index, this.props.allArr)}
            >
        </div>
        )
    }
}
// border: this.props.pixSize === 20 ? 'solid black .5px' : 'solid black 0',width: this.props.pixSize + 'px', height: this.props.pixSize + 'px', backgroundColor: this.props.pixel.color

export default Pixel