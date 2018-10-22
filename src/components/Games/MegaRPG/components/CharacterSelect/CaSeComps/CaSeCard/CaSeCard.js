import React, {Component} from 'react'

import {connect} from 'react-redux'


import './CaSeCard.css'

class CaSeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const hero = this.props.hero
        return(
            <div className='hero_card'>
                <img className='hero_img' src={hero.picture} alt='hero_pic'/>
                <div>
                    <h2>{hero.hero_name}</h2>
                    <h3>{hero.hero_class}</h3>

                    <h5>Strength:{hero.strength}</h5>
                    <h5>Endurance:{hero.endurance}</h5>
                    <h5>Speed:{hero.speed}</h5>
                    <h5>Intelligence: {hero.intelligence}</h5>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer})

export default connect(mapStateToProps)(CaSeCard);