import React from 'react'

import {Route, Switch} from 'react-router-dom'

//RPG links
import MegaRPG from '../components/Games/MegaRPG/Landing'
import CreateCharacter from '../components/Games/MegaRPG/components/CreateCharacter/CreateCharacter'
import CharacterSelect from '../components/Games/MegaRPG/components/CharacterSelect/CharacterSelect'
import WorldMap from '../components/Games/MegaRPG/components/WorldMap/WorldMap'
// import AdventureScreen from '../components/Games/MegaRPG/components/AdventureScreen/AdventureScreen'
import HeroHub from '../components/Games/MegaRPG/components/HeroHub/HeroHub'

//Pixart links
import PixelArt from '../components/Games/PixelArt/PixelArt'

// import Games from '../components/Games/Games'


//work on getting the map update call to work before the transition to a new area today
export default (
        <Switch>
            <Route path='/games/MegaRPG/Map' component={WorldMap} />         
            <Route path='/games/MegaRPG/hero/:heroID' component={HeroHub} /> 
            <Route path='/games/MegaRPG/CharacterSelect' component={CharacterSelect}/>
            <Route path='/games/MegaRPG/CreateCharacter' component={CreateCharacter}/>
            <Route path='/games/MegaRPG' component={MegaRPG}/>
            
            <Route path='/games/PixelArt' component={PixelArt}/>
        </Switch>
    )