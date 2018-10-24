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

      map:[]
    }
    this.move = this.move.bind(this)
    this.locationType = this.locationType.bind(this)
    
  }
  componentDidMount(){
      this.refs.areaMap.focus()
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
    console.log(this.props.mapX, this.props.mapY)
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
                      : <h6>{spot.x + ':' + spot.y}</h6>
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

const mapStateToProps = state => ({...state.heroReducer, ...state.mapReducer})

export default withRouter(connect(mapStateToProps, { getMap, updateArea, discover })(WorldMap));