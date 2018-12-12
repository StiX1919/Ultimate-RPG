import React, {Component} from 'react'

import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

//RPG links
import UltimateRPG from '../components/Games/UltimateRPG/RPGLanding'
import CreateCharacter from '../components/Games/UltimateRPG/components/CreateCharacter/CreateCharacter'
import WorldMap from '../components/Games/UltimateRPG/components/WorldMap/WorldMap'
import AdventureScreen from '../components/Games/UltimateRPG/components/AdventureScreen/AdventureScreen'
// import AdventureScreen from '../components/Games/UltimateRPG/components/AdventureScreen/AdventureScreen'
import HeroHub from '../components/Games/UltimateRPG/components/HeroHub/HeroHub'

import Navbar from '../components/Navbar/Navbar'
//Pixart links
import PixelArt from '../components/Games/PixelArt/PixelArt'

import Landing from '../components/Landing/Landing'
import SideBar from '../components/Games/UltimateRPG/components/SideBar/SideBar'

import {getUser} from '../ducks/reducers/userReducer'


import './routerStyle.css'

//work on getting the map update call to work before the transition to a new area today
class GameRouter extends Component{
    componentDidMount(){
        this.props.getUser()
    }
        
    render(){
        return (
            <div>
                {window.location.pathname !== '/' &&
                    <Navbar place={window.location.pathname} user={this.props.userReducer.user}/>
                }
                <Switch>
                    <Route path='/' exact render={() => <Landing user={this.props.userReducer.user}/>}/>
                    <Route path='/PixelArt' exact render={() =>
                        <PixelArt userID={this.props.userReducer.user}/>
                    }/>
                </Switch>

                <Switch>
                    <Route path='/UltimateRPG' exact render={() =>
                        this.props.userReducer.user 
                        ? <Redirect to='/UltimateRPG/CreateCharacter'/>
                        : <UltimateRPG />
                        
                    }/>
                    <Route path='/UltimateRPG/CreateCharacter' render={() => 
                        this.props.userReducer.user !== null
                        ? <CreateCharacter />
                        : <Redirect to='/UltimateRPG'/>
                    }/>
                    <Route path='/UltimateRPG/hero' render={() => 
                        this.props.userReducer.user !== null
                        ? <div className='rpg-page'>
                                <SideBar />
                                <Switch >
                                    <Route path='/UltimateRPG/hero/Map' component={WorldMap} />
                                    <Route path='/UltimateRPG/hero/battle/:monsterID' component={AdventureScreen} /> 

                                    <Route path='/UltimateRPG/hero/:heroName' component={HeroHub}/>
                                </Switch>
                            </div>

                        
                        : <Redirect to='/UltimateRPG'/>
                        
                    } />
                    

                    
                         

                    

                    
                </Switch>
            </div>

        )
    }
}
const mapStateToProps = state => (state)
    
export default withRouter(connect(mapStateToProps, {getUser})(GameRouter))
