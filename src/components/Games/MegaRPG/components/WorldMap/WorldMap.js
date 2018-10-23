import React, { Component } from 'react';
import './WorldMap.css';

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { getMap, updateArea, discover } from '../../../../../ducks/reducers/mapReducer'


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
    
  }
  componentDidMount(){
      this.refs.areaMap.focus()
  }
//   componentDidUpdate(prevProps, prevState) {
//       const {areaX, areaY} = this.state
//     if(prevState.areaX !== areaX || prevState.areaY !== areaY){
//       this.buildMap()
//     }
//   }

  move(e){
    switch(e.key){
      case 'ArrowRight':
        this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1})
        
            if(this.state.currentX + 1 > this.state.areaX * 10) {
                this.setState({areaX: this.state.areaX + 1})
                this.props.getMap(this.state.areaX + 1, this.state.areaY)
                this.props.updateArea(this.state.areaX + 1, this.state.areaY)

             

                    this.props.discover({
                        area_x: this.state.areaX + 1,
                        area_y: this.state.areaY,
                        discovered_by: this.props.currentHero.hero_name,
                        x_location: this.state.currentX + 1,
                        y_location: this.state.currentY
                    }, this.props.locations)
            
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX + 1,
                    y_location: this.state.currentY
                }, this.props.locations)
            }
        
        break;

      case 'ArrowLeft':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX - 1})

          if(this.state.currentX - 1 < ((this.state.areaX - 1) * 10) + 1) {
            this.setState({areaX: this.state.areaX - 1})
            this.props.getMap(this.state.areaX - 1, this.state.areaY)
            this.props.updateArea(this.state.areaX - 1, this.state.areaY)

            this.props.discover({
                area_x: this.state.areaX - 1,
                area_y: this.state.areaY,
                discovered_by: this.props.currentHero.hero_name,
                x_location: this.state.currentX - 1,
                y_location: this.state.currentY
            }, this.props.locations)
    
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX - 1,
                    y_location: this.state.currentY
                }, this.props.locations)
            }
          break;
      case 'ArrowUp':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1})

          if(this.state.currentY + 1 > this.state.areaY * 10) {
            this.setState({areaY: this.state.areaY + 1})
            this.props.getMap(this.state.areaX, this.state.areaY + 1)
            this.props.updateArea(this.state.areaX, this.state.areaY + 1)

            this.props.discover({
                area_x: this.state.areaX,
                area_y: this.state.areaY + 1,
                discovered_by: this.props.currentHero.hero_name,
                x_location: this.state.currentX,
                y_location: this.state.currentY + 1
            }, this.props.locations)
    
            } else {
                
                this.props.discover({
                    area_x: this.state.areaX,
                    area_y: this.state.areaY,
                    discovered_by: this.props.currentHero.hero_name,
                    x_location: this.state.currentX,
                    y_location: this.state.currentY + 1
                }, this.props.locations)
            }
          break;
      case 'ArrowDown':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1})
          
          if(this.state.currentY - 1 < ((this.state.areaY - 1) * 10) + 1) {
            this.setState({areaY: this.state.areaY - 1})
            this.props.getMap(this.state.areaX, this.state.areaY - 1)
            this.props.updateArea(this.state.areaX, this.state.areaY - 1)

            this.props.discover({
                area_x: this.state.areaX,
                area_y: this.state.areaY - 1,
                discovered_by: this.props.currentHero.hero_name,
                x_location: this.state.currentX,
                y_location: this.state.currentY - 1
            }, this.props.locations)
    
    } else {
        
        this.props.discover({
            area_x: this.state.areaX,
            area_y: this.state.areaY,
            discovered_by: this.props.currentHero.hero_name,
            x_location: this.state.currentX,
            y_location: this.state.currentY - 1
        }, this.props.locations)
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
                      : <h6>{spot.name}</h6>
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