import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import CaSeCard from './CaSeComps/CaSeCard/CaSeCard'

import {getUser, getHeroes} from '../../../../../ducks/reducers/userReducer'
import {selectHero} from '../../../../../ducks/reducers/heroReducer'

class CharacterSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser()
        this.props.getHeroes()
      }

    render() {
        let heroCards = (<h2>No heroes yet</h2>)
        if(this.props.heroes[0]) {
            heroCards = this.props.heroes.map((hero, ind) => {
                return  <Link to={`/games/MegaRPG/hero/${hero.hero_id}`} onClick={() => this.props.selectHero(hero)}>
                            <CaSeCard hero={hero} />
                        </Link>
            })
        }
        return(
            <div>
                <Link to='/poop'><h1>ChooseCharacter</h1></Link>
                {heroCards}
                {this.props.isLoading !== true && this.props.heroes.length < 5 &&
                    <Link to ='/games/MegaRPG/CreateCharacter'><button>Create new character</button></Link>
                }
                
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {getUser, getHeroes, selectHero})(CharacterSelect));