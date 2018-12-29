import React, {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './NameInput.css'


class NameInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            birthDate: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    render() {

        return (
            <div>
                <h1>{this.state.name} {this.state.birthDate}</h1>
                <input name='name' placeholder='enter name'/>
                <input name='birthDate' placeholder='yyyy-mm-dd'/>
            </div>
        )
    }
}
//note

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {})(NameInput))