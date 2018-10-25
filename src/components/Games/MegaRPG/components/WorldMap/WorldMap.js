import React, { Component } from 'react';
import './WorldMap.css';
import axios from 'axios';

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { getMap, updateArea, discover} from '../../../../../ducks/reducers/mapReducer'


class WorldMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentX: 3,
      currentY: 3,

      prevX: 1,
      prevY: 1,

      areaX: 1,
      areaY: 1,

      map:[],
      areaMonsters: []
    }
    this.move = this.move.bind(this)
    this.locationType = this.locationType.bind(this)
    this.moveMonsters = this.moveMonsters.bind(this)
    
  }
  componentDidMount(){
      this.refs.areaMap.focus()
      this.addMonLocation(this.props.monsters)
  }

  //generates locations for the monsters to start from
  addMonLocation(mons){

    const areaMonsters = mons.map(monster => {
      let randomX = Math.floor(Math.random() * (this.state.areaX * 10)) + 1
      let randomY = Math.floor(Math.random() * (this.state.areaY * 10)) + 1

      return ({X: randomX, Y: randomY, monsterInfo: {...monster}})
    })
    this.setState({areaMonsters})
  }
  moveMonsters(){
    let types = ['X', 'Y']
    let directions = ['>', '<']

    const movedMons = this.state.areaMonsters.map( monster => {
      let randomMove = types[Math.floor(Math.random() * types.length)]
      let randomDirec = directions[Math.floor(Math.random() * directions.length)]
      switch(randomDirec){
        case '>':
          if(randomMove === 'X'){
            if(monster[randomMove] <= this.state.areaX * 10 - 1){
             return ({...monster, [randomMove]: ++monster[randomMove]})
            } else return (monster)
          } else if(randomMove === 'Y'){
            if(monster[randomMove] <= this.state.areaY * 10 - 1){
             return ({...monster, [randomMove]: ++monster[randomMove]})
            } else return (monster)
          }
          break;
        case '<':
          if(randomMove === 'X'){
            if(monster[randomMove] > ((this.state.areaX - 1) * 10) + 1){
             return ({...monster, [randomMove]: --monster[randomMove]})
            } else return (monster)
          } else if(randomMove === 'Y'){
            if(monster[randomMove] > ((this.state.areaY - 1) * 10) + 1){
             return ({...monster, [randomMove]: --monster[randomMove]})
            } else return (monster)
          }
          break;
        default: null
      }
      
      
    })
    this.setState({areaMonsters: movedMons})
  }



  locationType(X, Y, spots){
    let mapTypes = ['River', 'Forest', 'Plains', 'Desert']
    // let mapTypes = ['Ocean', 'River', 'Forest', 'Plains', 'Desert', 'Mountains']

      let xArea = [X - 1, X, X + 1]
      let yArea = [Y - 1, Y, Y + 1]
      let found = spots.filter(spot => {
          if(xArea.includes(spot.x_location) && yArea.includes(spot.y_location)){
              if(spot.area_type !== 'Town'){
                  switch(spot.area_type){
                    case 'Plain':
                        mapTypes.push('Plains', 'Plains', 'Forest');
                    case 'Forest':
                        mapTypes.push('Forest', 'Plains');
                    // case 'Ocean':
                    //     mapTypes.push('Ocean', 'Ocean');
                    case 'River':
                        mapTypes.push('River');
                    case 'Desert':
                        mapTypes.push('Desert');
                    // case 'Mountains':
                    //     mapTypes.push('Mountains', 'Desert');
                    default: mapTypes.push('Plains')
                  }
              }

              return true
          }
      })
      return mapTypes[Math.floor(Math.random() * (mapTypes.length - 1))]
  }

  async move(e){
    this.moveMonsters()

    let spotType = ''
    switch(e.key){
      case 'ArrowRight':
        this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1})
        spotType = this.locationType(this.state.currentX + 1, this.state.currentY, this.props.locations)
        
            if(this.state.currentX + 1 > this.state.areaX * 10) {
              axios.post('/api/newPlace', {
                area_name: 'none',
                area_type: spotType,
                area_x: this.state.areaX + 1,
                area_y: this.state.areaY,
                discovered_by: this.props.currentHero.hero_name,
                x_location: this.state.currentX,
                y_location: this.state.currentY
            }).then(response => {
                this.setState({areaX: this.state.areaX + 1})
                // this.props.getMap(this.state.areaX + 1, this.state.areaY)
                this.props.updateArea(this.state.areaX, this.state.areaY)

      
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX,
                    y_location: this.state.currentY
                }, response.data, spotType)

              })
             

            
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX + 1,
                    y_location: this.state.currentY
                }, this.props.locations, spotType)
            }
        
        break;

      case 'ArrowLeft':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX - 1})
          spotType = this.locationType(this.state.currentX - 1, this.state.currentY, this.props.locations)

          if(this.state.currentX - 1 < ((this.state.areaX - 1) * 10) + 1) {

            axios.post('/api/newPlace', {
              area_name: 'none',
              area_type: spotType,
              area_x: this.state.areaX - 1,
              area_y: this.state.areaY,
              discovered_by: this.props.currentHero.hero_name,
              x_location: this.state.currentX - 1,
              y_location: this.state.currentY
          }).then(response => {
              this.setState({areaX: this.state.areaX - 1})
              // this.props.getMap(this.state.areaX - 1, this.state.areaY)
              this.props.updateArea(this.state.areaX, this.state.areaY)


              this.props.discover({
                  area_x: this.state.areaX,
                  area_y: this.state.areaY,
                  discovered_by: this.props.currentHero.hero_name,
                  x_location: this.state.currentX,
                  y_location: this.state.currentY
              }, response.data, spotType)

            })

    
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX - 1,
                    y_location: this.state.currentY
                }, this.props.locations, spotType)
            }
          break;
      case 'ArrowUp':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1})
          spotType = this.locationType(this.state.currentX, this.state.currentY + 1, this.props.locations)
            
          if(this.state.currentY + 1 > this.state.areaY * 10) {
            axios.post('/api/newPlace', {
              area_name: 'none',
              area_type: spotType,
              area_x: this.state.areaX,
              area_y: this.state.areaY + 1,
              discovered_by: this.props.currentHero.hero_name,
              x_location: this.state.currentX,
              y_location: this.state.currentY + 1
          }).then(response => {

              this.setState({areaY: this.state.areaY + 1})
              // this.props.getMap(this.state.areaX, this.state.areaY + 1)
              this.props.updateArea(this.state.areaX, this.state.areaY)
              this.props.discover({
                  area_x: this.state.areaX,
                  area_y: this.state.areaY,
                  discovered_by: this.props.currentHero.hero_name,
                  x_location: this.state.currentX,
                  y_location: this.state.currentY
              }, response.data, spotType)

            })

    
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX,
                    y_location: this.state.currentY + 1
                }, this.props.locations, spotType)
            }
          break;
      case 'ArrowDown':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1})
          spotType = this.locationType(this.state.currentX, this.state.currentY - 1, this.props.locations)
          
          if(this.state.currentY - 1 < ((this.state.areaY - 1) * 10) + 1) {
            axios.post('/api/newPlace', {
              area_name: 'none',
              area_type: spotType,
              area_x: this.state.areaX,
              area_y: this.state.areaY - 1,
              discovered_by: this.props.currentHero.hero_name,
              x_location: this.state.currentX,
              y_location: this.state.currentY - 1
          }).then(response => {
            this.setState({areaY: this.state.areaY - 1})
            // this.props.getMap(this.state.areaX, this.state.areaY - 1)
            this.props.updateArea(this.state.areaX, this.state.areaY)

          
          
            this.props.discover({
                area_x: this.state.areaX,
                area_y: this.state.areaY,
                discovered_by: this.props.currentHero.hero_name,
                x_location: this.state.currentX,
                y_location: this.state.currentY
            }, response.data, spotType)

          })

            

    
    } else {
        
        this.props.discover({
            area_x: this.state.areaX,
            area_y: this.state.areaY,
            discovered_by: this.props.currentHero.hero_name,
            x_location: this.state.currentX,
            y_location: this.state.currentY - 1
        }, this.props.locations, spotType)
    }
          break;
      default: return null
    }
  }

  render() {
    return (
      <div ref='areaMap' onKeyDown={this.move} tabIndex='-1'>
        {this.props.areaMap[0] && 
          this.props.areaMap.map((row, r) => {
            return (
              <div className='row'>
              {row.map((spot, j) => {
                return (
                  <div style={{height: '50px', width: '50px', border: 'solid black 1px', backgroundColor: spot.color}}>
                    
                    {spot.x === this.state.currentX && spot.y === this.state.currentY
                      
                      ? <img style={{height: '50px', width: '50px'}} src='https://s1.piq.land/2015/07/23/wyTJ7WMj9DgDrDoJ3xYODfGq_400x400.png' alt='hello'/>
                      : null
                    }
                    {this.state.areaMonsters.map( (mon, i) => {
                      if(mon.X === spot.x && mon.Y === spot.y){
                        return <img key={i} style={{height: '50px', width: '50px'}} src={mon.monsterInfo.img_link} alt={`${mon.monsterInfo.name}`}/>
                      }
                    })
                    }
                  </div>
                )
              })}

              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.heroReducer, ...state.mapReducer, ...state.monsterReducer})

export default withRouter(connect(mapStateToProps, { getMap, updateArea, discover })(WorldMap));