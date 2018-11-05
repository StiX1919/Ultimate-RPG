import React from 'react'

import {Route, Switch} from 'react-router-dom'

//RPG links
import MegaRPG from '../components/Games/MegaRPG/Landing'
import CreateCharacter from '../components/Games/MegaRPG/components/CreateCharacter/CreateCharacter'
import CharacterSelect from '../components/Games/MegaRPG/components/CharacterSelect/CharacterSelect'
import WorldMap from '../components/Games/MegaRPG/components/WorldMap/WorldMap'
import AdventureScreen from '../components/Games/MegaRPG/components/AdventureScreen/AdventureScreen'
// import AdventureScreen from '../components/Games/MegaRPG/components/AdventureScreen/AdventureScreen'
import HeroHub from '../components/Games/MegaRPG/components/HeroHub/HeroHub'

//Pixart links
import PixelArt from '../components/Games/PixelArt/PixelArt'

import Landing from '../components/Landing/Landing'


//work on getting the map update call to work before the transition to a new area today
export default (
        
        <Switch>
            <Route path='/MegaRPG/battle/:monsterID' component={AdventureScreen} />
            <Route path='/MegaRPG/Map' component={WorldMap} />         
            <Route path='/MegaRPG/hero/:heroID' component={HeroHub} /> 
            <Route path='/MegaRPG/CharacterSelect' component={CharacterSelect}/>
            <Route path='/MegaRPG/CreateCharacter' component={CreateCharacter}/>
            <Route path='/MegaRPG' component={MegaRPG}/>
            
            <Route path='/PixelArt' component={PixelArt}/>

            <Route path='/' exact component={Landing}/>
        </Switch>
    )