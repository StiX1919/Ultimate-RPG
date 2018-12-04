import React, {Component} from 'react'
import styled from 'styled-components'

import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import CaSeCard from './CaSeComps/CaSeCard/CaSeCard'

import {getUser, getHeroes, getCharm} from '../../../../../ducks/reducers/userReducer'
import {selectHero} from '../../../../../ducks/reducers/heroReducer'

import './CharacterSelect.css'

const StyledLink = styled(Link)`
    text-decoration: none
`


class CharacterSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getUser()
        this.props.getHeroes()
        this.props.getCharm()
      }
      //add check for unique generated item, generate modal if there is none for name and birth date entree

    render() {
        let heroCards = (<h2>No heroes yet</h2>)
        
        if(this.props.heroes[0]) {
            heroCards = this.props.heroes.map((hero, ind) => {
                return  <StyledLink to={`/UltimateRPG/hero/${hero.hero_name}`} onClick={() => this.props.selectHero(hero)}>
                            <CaSeCard hero={hero} />
                        </StyledLink>
            })
        }
        return(
            <div className='char-select-page'>
                {this.props.heroes[0] 
                    ?   <h1 className='choose-char-title'>Choose Character</h1>
                    :   <h1 className='choose-char-title'>Create A Hero</h1>
                }
                {this.props.needsCharm &&
                    <button>Create Your Charm</button>
                }
                <div className='hero-card-holder'>
                    {heroCards}
                </div>
                {this.props.isLoading !== true && this.props.heroes.length < 5 &&
                    <Link to ='/UltimateRPG/CreateCharacter'><button>Create new Hero</button></Link>
                }
                <Link to='/'><h4>Back to Games</h4></Link>
            </div>
        )
    }
}
const mapStateToProps = state => ({...state.reducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {getUser, getHeroes, selectHero, getCharm})(CharacterSelect));