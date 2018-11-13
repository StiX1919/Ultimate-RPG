import React, { Component } from 'react';
import './WorldMap.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { getMap, updateArea, move, goBack, enterArea, retreat } from '../../../../../ducks/reducers/mapReducer'
import { setMonster, getMonsters, moveMonsters, matchedMonsters } from '../../../../../ducks/reducers/monsterReducer'


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
      areaMonsters: [],
      activeSpot: {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'},

      combatMons: []
    }
    // this.move = this.move.bind(this)
    this.locationType = this.locationType.bind(this)
    // this.moveMonsters = this.moveMonsters.bind(this)
    this.findMatchedMonsters = this.findMatchedMonsters.bind(this)

    this.moveHandler = this.moveHandler.bind(this)
    this.enterHandler = this.enterHandler.bind(this)
    this.retreat = this.retreat.bind(this)

    this.discoverHandler = this.discoverHandler.bind(this)
  }
  componentDidMount(){
    if(!this.props.heroes[0]){
      window.location.href= '/UltimateRPG'
    } 
    this.props.matchedMonsters(this.props.mapReducer.heroX, this.props.mapReducer.heroY)
      
  }

  //finds monsters sharing characters spot
  findMatchedMonsters(){
    let {heroX, heroY} = this.props.mapReducer
    let xArea = [heroX - 1, heroX, heroX + 1]
    let yArea = [heroY - 1, heroY, heroY + 1]

    let combatMons = this.props.monsterReducer.monsters.filter(mon => {
      return (xArea.includes(mon.X) && yArea.includes(mon.Y))
    })
    this.setState({combatMons})
  }


  locationType(X, Y, spots){
    let mapTypes = ['River', 'Forest', 'Plains', 'Desert']
    // let mapTypes = ['Ocean', 'River', 'Forest', 'Plains', 'Desert', 'Mountains']

      let xArea = [X - 1, X, X + 1]
      let yArea = [Y - 1, Y, Y + 1]
      spots.filter(spot => {
          if(xArea.includes(spot.x_location) && yArea.includes(spot.y_location)){
              if(spot.area_type !== 'Town'){
                  switch(spot.area_type){
                    case 'Plain':
                        mapTypes.push('Plains', 'Plains', 'Forest');
                        break;
                    case 'Forest':
                        mapTypes.push('Forest', 'Plains');
                        break;
                    // case 'Ocean':
                    //     mapTypes.push('Ocean', 'Ocean');
                    case 'River':
                        mapTypes.push('River');
                        break;
                    case 'Desert':
                        mapTypes.push('Desert');
                        break;
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



  async moveHandler(direction){
    try{
      await this.props.move(direction, this.props.mapReducer)
      this.props.moveMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY, this.props.monsterReducer.monsters, this.props.mapReducer.entered)

    } catch(e) {
      console.log(e)
    }
    finally {
      this.props.matchedMonsters(this.props.mapReducer.heroX, this.props.mapReducer.heroY)
    }
  }
  async enterHandler(){
    try {
      this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
      await this.props.enterArea(this.props.mapReducer.heroX, this.props.mapReducer.heroY, this.locationType(this.props.mapReducer.heroX, this.props.mapReducer.heroY, this.props.mapReducer.locations))

    } finally {
      this.props.matchedMonsters(this.props.mapReducer.heroX, this.props.mapReducer.heroY)      
    }
  }

  async retreat(){
    try{
      await this.props.goBack()
      this.props.getMap(this.props.mapReducer.mapPrevX, this.props.mapReducer.mapPrevY)
      this.props.retreat()
      await this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    } finally {
      this.props.matchedMonsters(this.props.mapReducer.retreatX, this.props.mapReducer.retreatY)
    }
    
  }

  discoverHandler(){
    axios.post('/api/newPlace', {
      area_name: 'none',
      area_type: this.props.mapReducer.areaMap[0][0].type,
      area_x: this.props.mapReducer.mapX,
      area_y: this.props.mapReducer.mapY,
      discovered_by: this.props.heroReducer.currentHero.hero_name,
      x_location: this.props.mapReducer.clearLocX,
      y_location: this.props.mapReducer.clearLocY
    }).then(res => {
      this.props.getMap(this.props.mapReducer.mapPrevX, this.props.mapReducer.mapPrevY)
      this.props.retreat()
      this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    })
  }

  render() {
    const {area_name, area_type, x_location, y_location, discovered_by} = this.props.mapReducer.activeSpot
    return (
      <div className='mapComponent'>
        <div>
          {this.props.mapReducer.areaMap[0] && 
            this.props.mapReducer.areaMap.map((row, r) => {
              return (
                <div className='row'>
                {row.map((spot, j) => {
                  return (
                    <div style={{height: '50px', width: '50px', border: 'solid black 1px', background: spot.color ? spot.color : 'black'}}>
                      
                      {spot.x === this.props.mapReducer.heroX && spot.y === this.props.mapReducer.heroY
                        
                        ? <img style={{height: '50px', width: '50px'}} src={this.props.heroReducer.currentHero.pix_art} alt='hello'/>
                        : null
                      }
                      {this.props.monsterReducer.monsters.map( (mon, i) => {
                        if(mon.X === spot.x && mon.Y === spot.y){
                          if(spot.color){
                            return <img key={i} style={{height: '50px', width: '50px'}} src={mon.monsterInfo.img_link} alt={`${mon.monsterInfo.name}`}/>
                          }
                          else return <img style={{height: '50px'}} src='https://vignette.wikia.nocookie.net/videogames-fanon/images/6/60/Question_Mark.png/revision/latest?cb=20150225221834'/>
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
        {area_type !== 'none' 
          ? <div className='directions'>
            <span className='direction up' onClick={() => this.moveHandler('up')}/>
            <div className='left-right'>
              <span className='direction left' onClick={() => this.moveHandler('left')}/>
              <span className='direction right' onClick={() => this.moveHandler('right')}/>
            </div>
            <span className='direction down' onClick={() => this.moveHandler('down')}/>
          </div>
          : <div>
            <button onClick={() => this.enterHandler()}>Enter New Land!</button>
            <button onClick={() => this.props.goBack(this.props.mapReducer.mapX, this.props.mapReducer.mapY, this.props.mapReducer.mapPrevX, this.props.mapReducer.mapPrevY)}>Return to the known.</button>
          </div>
        }
        {/* build this up to leave entered zone and rebuild map from current area. also trigger monster rebuild when switching areas. 
        */}
        {this.props.mapReducer.entered &&
          <div>
            <button onClick={this.retreat}>Retreat!</button>
            {!this.props.monsterReducer.monsters[0] &&
              <button onClick={() => this.discoverHandler()} >
                  Clear and discover!
              </button>
            }
          </div>
        }
        <div className='infoBox'>
          <div className='spotInfo'>
            <h2>{x_location + ':' + y_location}</h2>
            {area_name !== 'none' &&
              <h2>{'Name: ' + area_name}</h2>
            
            }
            <h2>{area_type}</h2>
            <h4>{discovered_by}</h4>
          </div>
          <div className='closeMonsters'>
            {this.props.monsterReducer.combatMons.map((monster, i) => {
              return (
                <div className='monster'>
                  <h3>{monster.monsterInfo.name}</h3>
                  <Link to={`/UltimateRPG/hero/battle/${monster.index}`} onClick={() => this.props.setMonster(monster.monsterInfo)}>
                    <button>Fight!!</button>
                  </Link>
                </div>
              )
            })}
          </div>

          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({heroReducer: state.heroReducer, mapReducer: state.mapReducer, monsterReducer: state.monsterReducer, heroes: state.userReducer.heroes})

export default withRouter(connect(mapStateToProps, { getMap, updateArea, setMonster, move, goBack, enterArea, retreat, getMonsters, moveMonsters, matchedMonsters })(WorldMap));