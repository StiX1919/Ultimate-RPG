import React, {Component} from 'react'

import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './CreateCharacter.css'

import {createNewHero, chooseStats} from '../../../../../ducks/reducers/CCReducer'

class CreateCharacter extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            class: '',
            startingStats: 10,
        }
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentDidMount() {
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    chooseStats(dir, ind){
      let newStats = this.props.stats.slice()
      if(dir === '>'){
        this.setState({startingStats: this.state.startingStats - 1})

        newStats[ind].value++
        this.props.chooseStats(newStats)
      } else if(dir === '<' && this.state.startingStats < 11){
        this.setState({startingStats: this.state.startingStats + 1})

        newStats[ind].value--
        this.props.chooseStats(newStats)
      }
    }

    createNewHero() {
      this.props.createNewHero({name: this.state.name, heroClass: this.state.class})
      window.location.href='/UltimateRPG/CharacterSelect'
    }

    render() {
      let statList = this.props.stats.map((stat, ind )=> {
        return (
          <div className='statBox'>
            <h4>{stat.type}</h4>
            {stat.value > 0 &&
              <button onClick={(e) => this.chooseStats('<', ind)}>{'<'}</button>
            }

            <h4>{stat.value}</h4>

            {this.state.startingStats > 0 &&
              <button onClick={(e) => this.chooseStats('>', ind)}>{'>'}</button>
            }
        
          </div>
        )
      })
        return (
            <div className='hero_Creation_Component'>
                <div>
                    <h1>Create a New Hero</h1>
                    <div className='hero_Creation_Box'>
                        <h3>Hero Name</h3>
                        <input value={this.state.name} placeholder={'ex: Lord Farquad'} name='name' onChange={e => this.changeHandler(e)}/>
                        <h4>Hero class</h4>
                        <input value={this.state.class} placeholder={'ex: Rogue'} name='class' onChange={e => this.changeHandler(e)}/>
                    </div>
                    <div className='stat-selectors'>
                    {this.state.startingStats}
                      {statList}
                    </div>
                </div>
                <button onClick={() => this.createNewHero()}></button>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer})

export default withRouter(connect(mapStateToProps, {createNewHero, chooseStats})(CreateCharacter))