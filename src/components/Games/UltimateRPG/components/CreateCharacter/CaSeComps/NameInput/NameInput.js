import React, {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './NameInput.css'


class NameInput extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    render() {

        return (
            <div>
                <input placeholder='enter name'/>
                <input placeholder='yyyy-mm-dd'/>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {})(NameInput))