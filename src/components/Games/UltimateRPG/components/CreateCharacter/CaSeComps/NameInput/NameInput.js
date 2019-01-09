import React, {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'


import './NameInput.css'

require('dotenv').config();

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
        this.sendCharmInfo = this.sendCharmInfo.bind(this)
    }

    changeHandler(input) {
        this.setState({[input.target.name]: input.target.value})
    }

    dateHandler(input){
        this.setState({[input.target.name]: input.target.value})
    }
    sendCharmInfo(){
        let splDate = this.state.birthDate.split('-')

        function conversion(firstName, lastName){
            let key = {
              'a': 1,
              'b': 2,
              'c': 3,
              'd': 4,
              'e': 5,
              'f': 6,
              'g': 7,
              'h': 8,
              'i': 9,
              'j': 10,
              'k': 11,
              'l': 12,
              'm': 13,
              'n': 14,
              'o': 15,
              'p': 16,
              'q': 17,
              'r': 18,
              's': 19,
              't': 20,
              'u': 21,
              'v': 22,
              'w': 23,
              'x': 24,
              'y': 25,
              'z': 26,
            }
          
            let newName = firstName + lastName
            let str = {stat: 0, count: 0},
              spd = {stat: 0, count: 0},
              end = {stat: 0, count: 0},
              int = {stat: 0, count: 0}
          
            let splitName = newName.toLowerCase().split('').filter((letter) => {
              if(key[letter]){
                return true
              }
            })
            for(let i=0; i < splitName.length; i++){
              if(!key[splitName[i]]){
                continue
              }
              else if(i === 0 || i % 4 === 0){
                str.stat += key[splitName[i]]
                str.count++
              }
              else if(i === 1 || i % 4 === 1){
                spd.stat += key[splitName[i]]
                spd.count++
              }
              else if(i === 2 || i % 4 === 2){
                end.stat += key[splitName[i]]
                end.count++
              }
              else if(i === 3 || i % 4 === 3){
                int.stat += key[splitName[i]]
                int.count++
              }
            }
            
            return {
              str: Math.floor(str.stat / 3 / str.count),
              spd: Math.floor(spd.stat / 3 / spd.count),
              end: Math.floor(end.stat / 3 / end.count),
              int: Math.floor(int.stat / 3 / int.count)
            }
          }
          
          
          
          
          function growthRate(month, day, year) {
            let zodiacSign = process.env.REACT_APP_ZODIAC[year % 12]
            console.log(zodiacSign)
            let growthKey = [
              null, 
              {points: 10, amount: 1},
              {points: 8, amount: 2},
              {points: 6, amount: 3},
              {points: 4, amount: 4},
              {points: 3, amount: 5},
              {points: 2, amount: 6},
              {points: 2, amount: 7},
              {points: 2, amount: 8},
              {points: 2, amount: 9}
              ]
            let stats = [60, 60, 60, 60]
            let zodiacStats = stats.map((item, ind) => {
              return item += zodiacSign.stats[ind]
            })
          
          
             var singleNum = 0;
              while (year >= 10 ) {
                           singleNum=0;
                  while (year > 0) {
                      var rem;
                      rem = year % 10;
                      singleNum = singleNum + rem;
                      year = parseInt(year / 10);
                  }
                  year = singleNum;
              }
          
              let yearObj = growthKey[singleNum]
              
          
              for(let i = 1; i <= yearObj.points; i++){
                let stat = Math.floor(Math.random() * 4)
          
                zodiacStats[stat] += yearObj.amount
              }
              //added bonuses from year born
          
              let monthBonus = process.env.REACT_APP_MONTHS[month - 1],
                dayDiff = 0,
                side = null,
                otherSide = null
          
              if(day > 15){
                dayDiff = day - 15
                side = monthBonus.end
                otherSide = monthBonus.start
              } else if (day <= 15){
                dayDiff = 15 - day
                side = monthBonus.start
                otherSide = monthBonus.end
              }
          
              zodiacStats[side] += dayDiff
              zodiacStats[otherSide] -= (dayDiff * 2)
          
          
            return {str: zodiacStats[0], 
            spd: zodiacStats[1],
            end: zodiacStats[2],
            int: zodiacStats[3]
            }
              
          }
          
          let startingStats = conversion(this.state.firstName, this.state.lastName)
          let rate = growthRate(splDate[1],splDate[2],splDate[0])
          
          console.log({
            str: rate.str + startingStats.str,
            spd: rate.spd + startingStats.spd,
            end: rate.end + startingStats.end,
            int: rate.int + startingStats.int
          })
    }

    render() {
        console.log(process.env)
        return (
            <div>
                <h1>{this.state.name} {this.state.birthDate}</h1>
                <input onChange={this.changeHandler} name='firstName' placeholder='First name'/>
                <input onChange={this.changeHandler} name='lastName' placeholder='Last name'/>
                <input type='date' onChange={this.dateHandler} name='birthDate' placeholder='yyyy-mm-dd' value={this.state.birthDate}/>
                {this.state.birthDate && this.state.firstName && this.state.lastName
                    ? <button onClick={this.sendCharmInfo} >Submit</button>
                    : <button disabled >Submit</button>
                }
            </div>
        )
    }
}
//note

const mapStateToProps = state => ({...state.CCReducer, ...state.userReducer, ...state.heroReducer})

export default withRouter(connect(mapStateToProps, {})(NameInput))