import React, { Component } from 'react';

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './HeroHub.css';

import CharacterBox from '../AdventureScreen/AScomponents/CharacterBox/CharacterBox'

import { getMap } from '../../../../../ducks/reducers/mapReducer'
import { getMonsters } from '../../../../../ducks/reducers/monsterReducer'


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
    this.props.getMonsters(this.props.mapX, this.props.mapY)
    this.props.getMap(this.props.mapX, this.props.mapY)

    if(!this.props.heroes[0]){
        window.location.href= '/UltimateRPG'
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

    return (
    <div className='page'>

        <CharacterBox />
        {/*add location here*/}
        <Link to='/UltimateRPG/Map'>
          <button onClick={ this.openMap }>Open Map</button>
        </Link>

    </div>
    );
  }
}
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.userReducer, ...state.mapReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMap, getMonsters })(HeroHub));