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

import {getMonster, getMonsters, removeMonster} from '../../../../../ducks/reducers/monsterReducer'
import {addRewards} from '../../../../../ducks/reducers/heroReducer'
import {getMap} from '../../../../../ducks/reducers/mapReducer'

class AdventureScreen extends Component {
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
    if(!this.props.areaMap[0]){
        this.props.getMap(this.props.mapX, this.props.mapY)
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

        <CharacterBox getNewMon={this.props.getMonster}/>
        
        
          {this.props.currentMonster && this.props.currentMonster.hp <= 0 
            
            ? <Link to='/UltimateRPG/hero/Map' onClick={() => {
              this.props.removeMonster(this.props.match.params.monsterID)
              this.props.addRewards(this.props.rewards)
            }}>
                <button>Back to Map</button>
              </Link>
            :  !this.props.currentMonster
            ? <h1>Hello</h1>
            : <AtkInterface />
          }


        
          {this.props.currentMonster && this.props.currentMonster.hp > 0
            ? <MonsterBox />

            : !this.props.currentMonster
            ? <h1>another hello</h1>
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
// not today!
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer, ...state.mapReducer})

export default withRouter(connect(mapStateToProps, { getMonster, getMap, getMonsters, removeMonster, addRewards })(AdventureScreen));