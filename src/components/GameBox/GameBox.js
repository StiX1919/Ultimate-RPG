import React, {Component} from 'react'

import Fighter from '../Fighter/Fighter'
import Coin from '../Coin/Coin'
import './GameBox.css'
import { setInterval } from 'timers';

class GameBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            height: 400,
            width: 600,
            raining: false,
            coins: []
        }

        this.makeItRain = this.makeItRain.bind(this)
    }
    componentDidMount(){
        this.setState({raining: true})
    }

    makeItRain() {
        setInterval(() => {
            let top = Math.floor(Math.random() * this.state.height - 30)
            let left = Math.floor(Math.random() * this.state.width - 30)
            // console.log(top, left)
            if(this.state.coins.length <= 10){
                this.setState({coins: [...this.state.coins, {top, left}]})

            }
        }, 5000)
        return this.state.coins.map(coin => {
            return <div style={{ position: 'absolute', top: coin.top, left: coin.left}}>
                        <Coin />   
                    </div>
        })
    }

    render(){
        console.log(this.state.coins)
        return (
            <div style={{position: 'fixed', 'border': 'solid black 2px','height': this.state.height, 'width': this.state.width}}>
                <Fighter boxHeight={this.state.height} 
                        boxWidth={this.state.width}/>
                {this.makeItRain()}
            </div>
        )
    }
}

export default GameBox