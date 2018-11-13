import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './AdventureScreen.css';


import CharacterBox from './AScomponents/CharacterBox/CharacterBox'
import MonsterBox from './AScomponents/MonsterBox/MonsterBox'
// import Shop from './AScomponents/Shop/Shop'
import AtkInterface from './AScomponents/AtkInterface/AtkInterface'

import {getMonster, removeMonster} from '../../../../../ducks/reducers/monsterReducer'

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
    <div className='page'>
      <div className="battle_interface">

        <CharacterBox getNewMon={this.props.getMonster}/>
        <AtkInterface />
        
          {this.props.currentMonster && this.props.currentMonster.hp <= 0 &&
            <Link to='/UltimateRPG/hero/Map' onClick={() => this.props.removeMonster(this.props.match.params.monsterID)}>
              <button>Back to Map</button>
            </Link>
          }


        
          {this.props.currentMonster && this.props.currentMonster.hp > 0 && <MonsterBox />}
          
       
        
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
const mapStateToProps = state => ({...state.heroReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMonster, removeMonster })(AdventureScreen));