import React, {Component} from 'react'

import './Coin.css'

class Coin extends Component {
    constructor(props){
        super(props)
        this.state = {
            pTop: 0,
            pLeft: 0
        }

    }

    
    render(){
        return (
            <div style={{'width': 20, 'height': 20, backgroundColor: 'yellow'}}>
            
            </div>
        )
    }
}

export default Coin