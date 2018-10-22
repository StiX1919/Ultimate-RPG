import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './HeroHub.css';

import CharacterBox from '../AdventureScreen/AScomponents/CharacterBox/CharacterBox'

import { getMap } from '../../../../../ducks/reducers/mapReducer'


class HeroHub extends Component {
  constructor(props) {
    super()
    this.state = {
      shop: false,
      skills: false,
      skillView: false,
      skillArr: []
    }
    this.openShop = this.openShop.bind(this)

  }
  componentDidMount() {
    this.props.getMap(this.props.mapX, this.props.mapY)

    if(!this.props.heroes[0]){
        window.location.href= '/games/MegaRPG'
    }
    
  }

  openShop() {
    if(this.state.shop === true){
      this.setState({shop: false})
    } else this.setState({shop: true})
  }

  openSkillView() {
    if(this.state.skillView === true){
      this.setState({skillView: false})
    } else this.setState({skillView: true})
  }

  render() {

    let dungs = <h3>Scouting</h3>;

    if(this.props.dungeons[0]){
        dungs = this.props.dungeons.map((dungeon, i) => {
            return (
                <h1 key={i}>{dungeon.name}</h1>
            )
        })
    }

    return (
    <div className='page'>

        <CharacterBox />
        {/*add location here*/}
        <Link to='/games/MegaRPG/Map'>
          <button onClick={ this.openMap }>Open Map</button>
        </Link>

    </div>
    );
  }
}
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.userReducer, ...state.mapReducer})

export default withRouter(connect(mapStateToProps, { getMap })(HeroHub));