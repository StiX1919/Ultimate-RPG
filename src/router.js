import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import PixelArt from './App'
import GameBox from './components/GameBox/GameBox'


class Router extends Component{
    constructor(props){
        super(props)
    }
    
 render(){
    return (
        <Switch>
            <Route path='/' component={GameBox}/>
            
            </Switch>
        )
    }
}

// <Route path='/' component={PixelArt}/>
const mapStateToProps = state => state

export default withRouter(connect(mapStateToProps)(Router))