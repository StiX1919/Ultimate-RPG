import React, {Component} from 'react'

import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import axios from 'axios'

//RPG links
import UltimateRPG from '../components/Games/UltimateRPG/RPGLanding'
import CreateCharacter from '../components/Games/UltimateRPG/components/CreateCharacter/CreateCharacter'
import CharacterSelect from '../components/Games/UltimateRPG/components/CharacterSelect/CharacterSelect'
import WorldMap from '../components/Games/UltimateRPG/components/WorldMap/WorldMap'
import AdventureScreen from '../components/Games/UltimateRPG/components/AdventureScreen/AdventureScreen'
// import AdventureScreen from '../components/Games/UltimateRPG/components/AdventureScreen/AdventureScreen'
import HeroHub from '../components/Games/UltimateRPG/components/HeroHub/HeroHub'

import Navbar from '../components/Navbar/Navbar'
//Pixart links
import PixelArt from '../components/Games/PixelArt/PixelArt'

import Landing from '../components/Landing/Landing'

import {getUser} from '../ducks/reducers/userReducer'




//work on getting the map update call to work before the transition to a new area today
class GameRouter extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.getUser()
    }
        
    render(){
        console.log(this.props.userReducer)
    
        return (
            <div>
                <Navbar place={window.location.pathname} user={this.props.userReducer.user}/>
                <Switch>
                    <Route path='/' exact component={Landing}/>
                    <Route path='/UltimateRPG' exact render={() =>
                        this.props.userReducer.user 
                        ? <Redirect to='/UltimateRPG/CharacterSelect'/>
                        : <UltimateRPG userID={this.props.userReducer.user}/>
                    }/>
                    
                    <Route path='/PixelArt' exact render={() =>
                        <PixelArt userID={this.props.userReducer.user}/>
                    }/>
                    <Route path='/UltimateRPG/battle/:monsterID' component={AdventureScreen} />
                    <Route path='/UltimateRPG/Map' component={WorldMap} />         
                    <Route path='/UltimateRPG/hero/:heroName' component={HeroHub} /> 

                    <Route path='/UltimateRPG/CharacterSelect' render={() => 
                        this.props.userReducer.user !== null
                       ? <CharacterSelect />
                       : <Redirect to='/UltimateRPG'/>
                    }/>

                    <Route path='/UltimateRPG/CreateCharacter' render={() => 
                        this.props.userReducer.user !== null
                        ? <CreateCharacter />
                        : <Redirect to='/UltimateRPG'/>
                     }/>
                
                    
                    
                </Switch>
            </div>

        )
    }
}
const mapStateToProps = state => (state)
    
export default withRouter(connect(mapStateToProps, {getUser})(GameRouter))
