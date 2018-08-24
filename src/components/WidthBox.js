import React, {Component} from 'react'

import HeightBox from './HeightBox'

class WidthBox extends Component {
    constructor(props){
        super(props)

    }

    render(){
        return (
            <div>
                {this.props.heightArr.map((box, i) => {
                    return <HeightBox key={`${this.props.widthIndex}x${i}`} widthIndex={this.props.widthIndex} heightIndex={i} pixSize={this.props.pixSize} chosenColor={this.props.chosenColor}/>
                })}
            </div>
        )
    }
}

export default WidthBox