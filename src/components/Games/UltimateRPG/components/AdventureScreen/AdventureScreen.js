import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './AdventureScreen.css';


import CharacterBox from './AScomponents/CharacterBox/CharacterBox'
import MonsterBox from './AScomponents/MonsterBox/MonsterBox'
import RewardsBox from './AScomponents/RewardsBox/RewardsBox'
// import Shop from './AScomponents/Shop/Shop'
import AtkInterface from './AScomponents/AtkInterface/AtkInterface'
import WorldMap from '../WorldMap/WorldMap'

import {getMonster, getMonsters, removeMonster, setMonster} from '../../../../../ducks/reducers/monsterReducer'
import {addRewards} from '../../../../../ducks/reducers/heroReducer'
import {getMap} from '../../../../../ducks/reducers/mapReducer'

class AdventureScreen extends Component {
  constructor(props) {
    super()
    this.state = {
      shop: false,
      skills: false,
      skillView: false,
      skillArr: [],

      mapOpen: false
    }
    this.openShop = this.openShop.bind(this)
    this.openMap = this.openMap.bind(this)

  }
  componentDidMount() {
    this.props.getMonsters(this.props.mapX, this.props.mapY)
    if(!this.props.areaMap[0]){
        this.props.getMap(this.props.mapX, this.props.mapY)
    }
  }
  openMap(){
    if(this.state.mapOpen === false && this.props.currentMonster){
      this.props.setMonster(null)
    }
    this.setState({mapOpen: !this.state.mapOpen})
  }

  openShop() {
     this.setState({shop: !this.state.shop})
  }

  openSkillView() {
    if(this.state.skillView === true){
      this.setState({skillView: false})
    } else this.setState({skillView: true})
  }

  render() {
    // Start prepping to buy and equip items from shop
    //May move to new component on sidebar
    //
    // let inventory = <h3>Empty</h3>
    // if (this.props.currentInventory[0]){
    //     inventory = this.props.currentInventory.map(item => {
    //         console.log(item,this.props.inventory)
    //         return <div className="inventoryItems">
    //             <h3>{item.name}</h3>
    //             <button onClick={() => this.equipItem(item)}>Equip</button>
    //             </div>
    //     })}
    //     {console.log(this.props.currentHero, 'top hero pors')}
    return (
    <div className='as-page'>
      <div className="battle_interface">

        <CharacterBox openMap={this.openMap}/>
        
        
          {this.props.currentMonster && this.props.currentMonster.monsterInfo.hp <= 0 
            
            ? <button onClick={() => {
              this.props.removeMonster(this.props.currentMonster.index)
              this.props.addRewards(this.props.rewards)
              this.openMap()
            }}>Back to Map</button>
              
            :  !this.props.currentMonster
            ? null
            : <AtkInterface openMap={this.openMap}/>
          }
          {this.state.mapOpen 
            ? <WorldMap openMap={this.openMap}/>
            : this.props.currentMonster && this.props.currentMonster.monsterInfo.hp > 0
              ? <MonsterBox />

              : !this.props.currentMonster
                ? null
                : <RewardsBox />
          }
        
      </div>
      <div className='skills'>
        
        
        {this.state.skills === true &&
          <div>
            <button onClick={this.openSkillView}>Skills</button>
            {this.state.skillArr.map(skill => [
              <h4>{skill.name}: Lv:{skill.level} {skill.exp}/{skill.level * 100}</h4>
            ])}
          </div>
        }
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer, ...state.mapReducer})

export default withRouter(connect(mapStateToProps, { getMonster, getMap, getMonsters, removeMonster, addRewards, setMonster })(AdventureScreen));