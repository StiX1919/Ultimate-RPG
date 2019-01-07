import React, {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import './NameInput.css'


class NameInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    dateHandler(input){
        let date = input.target.value
        console.log(date.length)
        if(date.length === 4){
            date += '-'
        } else if (date.length === 7){
            date += '-'
        }
        this.setState({[input.target.name]: date})
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>{this.state.name} {this.state.birthDate}</h1>
                <input onChange={this.changeHandler} name='firstName' placeholder='First name'/>
                <input onChange={this.changeHandler} name='lastName' placeholder='Last name'/>
                <input type='date' onChange={this.dateHandler} name='birthDate' placeholder='yyyy-mm-dd' value={this.state.birthDate}/>
            </div>
        )
    }
}
//note

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {})(NameInput))