import React, {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './CreateCharacter.css'

import CaSeCard from './CaSeComps/CaSeCard/CaSeCard'
import NameInput from './CaSeComps/NameInput/NameInput'

import {createNewHero, chooseStats, useStats} from '../../../../../ducks/reducers/CCReducer'

import { getHero } from '../../../../../ducks/reducers/heroReducer'

class CreateCharacter extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            class: '',
            startingStats: 10,
            inputModal: false
        }
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentDidMount() {
      if(!this.props.user.name){
        this.setState({inputModal: true})
      }
      if(this.props.user){
        this.props.getHero()
      }
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    chooseStats(dir, ind){
      let newStats = this.props.stats.slice()
      if(dir === '>'){
        this.props.useStats(this.props.startingStats - 1)
        newStats[ind].value++
        this.props.chooseStats(newStats)
      } else if(dir === '<' && this.props.startingStats < 10){
        this.props.useStats(this.props.startingStats + 1)

        newStats[ind].value--
        this.props.chooseStats(newStats)
      }
    }

    createNewHero() {
      this.props.createNewHero({name: this.state.name, heroClass: this.state.class})
      window.location.href='/UltimateRPG/CreateCharacter'
    }

    render() {
      let statList = this.props.stats.map((stat, ind )=> {
        return (
          <div key={ind} className='stat-allocation'>
            <h4 className='stat-all-name'>{stat.type}</h4>
            {stat.value > 0 &&
              <button onClick={(e) => this.chooseStats('<', ind)}>{'<'}</button>
            }

            <h4>{stat.value}</h4>

            {this.props.startingStats > 0 &&
              <button onClick={(e) => this.chooseStats('>', ind)}>{'>'}</button>
            }
        
          </div>
        )
      })

      let demoHero = {
        strength: this.props.stats[0].value,
        speed: this.props.stats[1].value,
        endurance: this.props.stats[2].value,
        intelligence: this.props.stats[3].value,
        pix_art: 'none',
        hero_class: this.state.class,
        hero_name: this.state.name
      }
        return (
            <div className='hero_Creation_Component'>
                <h1>Create a New Hero</h1>
                {this.state.inputModal &&
                  <div className='input-modal'>
                    <NameInput />
                  </div>
                }

                <div className='hero_Creation_Box'>
                    <h3>Hero Name</h3>
                    <input value={this.state.name} placeholder={'ex: Lord Farquad'} name='name' onChange={e => this.changeHandler(e)}/>
                    <h4>Hero class</h4>
                    <input value={this.state.class} placeholder={'ex: Rogue'} name='class' onChange={e => this.changeHandler(e)}/>
                </div>

                <div className='stat-selectors'>
                    <h2>Stats Left: {this.props.startingStats}</h2>
                    {statList}
                </div>
                <div className='example-card'>
                    <CaSeCard hero={demoHero}/>
                </div>
                <button onClick={() => this.createNewHero()}>Create Your Hero</button>
                <Link to='/'><button>Cancel</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {createNewHero, chooseStats, useStats, getHero})(CreateCharacter))