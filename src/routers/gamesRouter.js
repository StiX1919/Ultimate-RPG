import React, {Component} from 'react'

import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

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




//work on getting the map update call to work before the transition to a new area today
class GameRouter extends Component{
    constructor(){
        super()
        this.state = {
            userID: null
        }
    }
    componentDidMount(){
        axios.get('/api/getUser').then(response => {
            console.log(response)
            this.setState({userID: response.data})
        })
    }
        
    render(){
        console.log(this.state.userID)
        return (
            <div>
                <Navbar place={window.location.pathname} user={this.state.userID}/>
                <Switch>
                    <Route path='/' exact component={Landing}/>
                    <Route path='/UltimateRPG' exact render={() =>
                        <UltimateRPG userID={this.state.userID}/>
                    }/>
                    
                    <Route path='/PixelArt' exact render={() =>
                        <PixelArt userID={this.state.userID}/>
                    }/>
                    <Route path='/UltimateRPG/battle/:monsterID' component={AdventureScreen} />
                    <Route path='/UltimateRPG/Map' component={WorldMap} />         
                    <Route path='/UltimateRPG/hero/:heroName' component={HeroHub} /> 

                    <Route path='/UltimateRPG/CharacterSelect' render={() => 
                       this.state.userID !== null
                       ? <CharacterSelect />
                       : <Redirect to='/UltimateRPG'/>
                    }/>

                    <Route path='/UltimateRPG/CreateCharacter' render={() => 
                        this.state.userID !== null
                        ? <CreateCharacter />
                        : <Redirect to='/UltimateRPG'/>
                     }/>
                
                    
                    
                </Switch>
            </div>

        )
    }
}
    
export default withRouter(GameRouter)