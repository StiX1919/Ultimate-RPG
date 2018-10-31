import React, { Component } from 'react';
import './WorldMap.css';
import axios from 'axios';
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { getMap, updateArea, discover, move, goBack, enterArea, retreat } from '../../../../../ducks/reducers/mapReducer'
import { setMonster, getMonsters, moveMonsters } from '../../../../../ducks/reducers/monsterReducer'


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
    this.moveMonsters = this.moveMonsters.bind(this)
    this.findMatchedMonsters = this.findMatchedMonsters.bind(this)

    this.moveHandler = this.moveHandler.bind(this)
    this.enterHandler = this.enterHandler.bind(this)
    this.retreat = this.retreat.bind(this)
  }
  componentDidMount(){
    if(!this.props.heroes[0]){
      window.location.href= '/MegaRPG'
    } 

      this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
      this.setState({activeSpot: this.props.mapReducer.locations.find(spot => (spot.x_location === this.state.currentX && spot.y_location === this.state.currentY))}, () => {
        this.findMatchedMonsters()
      })
  }

  //finds monsters sharing characters spot
  findMatchedMonsters(){
    let {heroX, heroY} = this.props.mapReducer
    let xArea = [heroX - 1, heroX, heroX + 1]
    let yArea = [heroY - 1, heroY, heroY + 1]

    let combatMons = this.state.areaMonsters.filter(mon => {
      return (xArea.includes(mon.X) && yArea.includes(mon.Y))
    })
    this.setState({combatMons})
  }

  //generates locations for the monsters to start from
  // addMonLocation(mons){
  //   const areaMonsters = mons.map(monster => {
  //     let randomX = Math.floor(Math.random() * (this.state.areaX * 10)) + 1
  //     let randomY = Math.floor(Math.random() * (this.state.areaY * 10)) + 1
      
  //     return ({ind: ind, X: randomX, Y: randomY, monsterInfo: {...monster}})
  //   })
  //   this.setState({areaMonsters})
  // }
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
        default: return null
      }

    })

    
    this.setState({areaMonsters: movedMons}, () => {
      this.findMatchedMonsters()
    })
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

  // async move(e){
  //   this.moveMonsters()

  //   let spotType = ''
  //   switch(e.key){
  //     case 'ArrowRight':
  //       this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1, activeSpot: this.props.mapReducer.locations.find(spot => (spot.x_location === this.state.currentX + 1 && spot.y_location === this.state.currentY)) || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}})
  //       spotType = this.locationType(this.state.currentX + 1, this.state.currentY, this.props.mapReducer.locations)
        
  //           if(this.state.currentX + 1 > this.state.areaX * 10) {
  //             axios.post('/api/newPlace', {
  //               area_name: 'none',
  //               area_type: spotType,
  //               area_x: this.state.areaX + 1,
  //               area_y: this.state.areaY,
  //               discovered_by: this.props.heroReducer.currentHero.hero_name,
  //               x_location: this.state.currentX,
  //               y_location: this.state.currentY
  //           }).then(response => {
  //               this.setState({areaX: this.state.areaX + 1})
  //               // this.props.getMap(this.state.areaX + 1, this.state.areaY)
  //               this.props.updateArea(this.state.areaX, this.state.areaY)

      
  //               this.props.discover({
  //                   area_x: this.state.areaX,
  //                   area_y: this.state.areaY,
  //                   discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                   x_location: this.state.currentX,
  //                   y_location: this.state.currentY
  //               }, response.data, spotType)

  //             })
             

            
  //           } else {
                
  //               this.props.discover({
  //                   area_x: this.state.areaX,
  //                   area_y: this.state.areaY,
  //                   discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                   x_location: this.state.currentX + 1,
  //                   y_location: this.state.currentY
  //               }, this.props.mapReducer.locations, spotType)
  //           }
        
  //       break;

  //     case 'ArrowLeft':
  //         this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX - 1, activeSpot: this.props.mapReducer.locations.find(spot => (spot.x_location === this.state.currentX - 1 && spot.y_location === this.state.currentY)) || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}})
  //         spotType = this.locationType(this.state.currentX - 1, this.state.currentY, this.props.mapReducer.locations)

  //         if(this.state.currentX - 1 < ((this.state.areaX - 1) * 10) + 1) {

  //           axios.post('/api/newPlace', {
  //             area_name: 'none',
  //             area_type: spotType,
  //             area_x: this.state.areaX - 1,
  //             area_y: this.state.areaY,
  //             discovered_by: this.props.heroReducer.currentHero.hero_name,
  //             x_location: this.state.currentX - 1,
  //             y_location: this.state.currentY
  //         }).then(response => {
  //             this.setState({areaX: this.state.areaX - 1})
  //             // this.props.getMap(this.state.areaX - 1, this.state.areaY)
  //             this.props.updateArea(this.state.areaX, this.state.areaY)


  //             this.props.discover({
  //                 area_x: this.state.areaX,
  //                 area_y: this.state.areaY,
  //                 discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                 x_location: this.state.currentX,
  //                 y_location: this.state.currentY
  //             }, response.data, spotType)

  //           })

    
  //           } else {
                
  //               this.props.discover({
  //                   area_x: this.state.areaX,
  //                   area_y: this.state.areaY,
  //                   discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                   x_location: this.state.currentX - 1,
  //                   y_location: this.state.currentY
  //               }, this.props.mapReducer.locations, spotType)
  //           }
  //         break;
  //     case 'ArrowUp':
  //         this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1, activeSpot: this.props.mapReducer.locations.find(spot => (spot.x_location === this.state.currentX && spot.y_location === this.state.currentY + 1)) || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}})
  //         spotType = this.locationType(this.state.currentX, this.state.currentY + 1, this.props.mapReducer.locations)
            
  //         if(this.state.currentY + 1 > this.state.areaY * 10) {
  //           axios.post('/api/newPlace', {
  //             area_name: 'none',
  //             area_type: spotType,
  //             area_x: this.state.areaX,
  //             area_y: this.state.areaY + 1,
  //             discovered_by: this.props.heroReducer.currentHero.hero_name,
  //             x_location: this.state.currentX,
  //             y_location: this.state.currentY + 1
  //         }).then(response => {

  //             this.setState({areaY: this.state.areaY + 1})
  //             // this.props.getMap(this.state.areaX, this.state.areaY + 1)
  //             this.props.updateArea(this.state.areaX, this.state.areaY)
  //             this.props.discover({
  //                 area_x: this.state.areaX,
  //                 area_y: this.state.areaY,
  //                 discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                 x_location: this.state.currentX,
  //                 y_location: this.state.currentY
  //             }, response.data, spotType)

  //           })

    
  //           } else {
                
  //               this.props.discover({
  //                   area_x: this.state.areaX,
  //                   area_y: this.state.areaY,
  //                   discovered_by: this.props.heroReducer.currentHero.hero_name,
  //                   x_location: this.state.currentX,
  //                   y_location: this.state.currentY + 1
  //               }, this.props.mapReducer.locations, spotType)
  //           }
  //         break;
  //     case 'ArrowDown':
  //         this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1, activeSpot: this.props.mapReducer.locations.find(spot => (spot.x_location === this.state.currentX && spot.y_location === this.state.currentY - 1)) || {area_name: 'none', area_type: 'none', x_location: 'none', y_location: 'none', discovered_by: 'none'}})
  //         spotType = this.locationType(this.state.currentX, this.state.currentY - 1, this.props.mapReducer.locations)
          
  //         if(this.state.currentY - 1 < ((this.state.areaY - 1) * 10) + 1) {
  //           axios.post('/api/newPlace', {
  //             area_name: 'none',
  //             area_type: spotType,
  //             area_x: this.state.areaX,
  //             area_y: this.state.areaY - 1,
  //             discovered_by: this.props.heroReducer.currentHero.hero_name,
  //             x_location: this.state.currentX,
  //             y_location: this.state.currentY - 1
  //         }).then(response => {
  //           this.setState({areaY: this.state.areaY - 1})
  //           // this.props.getMap(this.state.areaX, this.state.areaY - 1)
  //           this.props.updateArea(this.state.areaX, this.state.areaY)

          
          
  //           this.props.discover({
  //               area_x: this.state.areaX,
  //               area_y: this.state.areaY,
  //               discovered_by: this.props.heroReducer.currentHero.hero_name,
  //               x_location: this.state.currentX,
  //               y_location: this.state.currentY
  //           }, response.data, spotType)

  //         })

            

    
  //   } else {
        
  //       this.props.discover({
  //           area_x: this.state.areaX,
  //           area_y: this.state.areaY,
  //           discovered_by: this.props.heroReducer.currentHero.hero_name,
  //           x_location: this.state.currentX,
  //           y_location: this.state.currentY - 1
  //       }, this.props.mapReducer.locations, spotType)
  //   }
  //         break;
  //     default: return null
  //   }
  // }


  async moveHandler(direction){
    try{
      await this.props.move(direction, this.props.mapReducer)

    } finally {
      this.props.moveMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY, this.props.monsterReducer.monsters)
    }
  }
  enterHandler(){
    this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    this.props.enterArea(this.props.mapReducer.heroX, this.props.mapReducer.heroY, this.locationType(this.props.mapReducer.heroX, this.props.mapReducer.heroY, this.props.mapReducer.locations))
  }

  async retreat(){
    await this.props.goBack()
      this.props.getMap(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
      this.props.retreat()
      this.props.getMonsters(this.props.mapReducer.mapX, this.props.mapReducer.mapY)
    
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
                    <div style={{height: '50px', width: '50px', border: 'solid black 1px', backgroundColor: spot.color}}>
                      
                      {spot.x === this.props.mapReducer.heroX && spot.y === this.props.mapReducer.heroY
                        
                        ? <img style={{height: '50px', width: '50px'}} src='https://s1.piq.land/2015/07/23/wyTJ7WMj9DgDrDoJ3xYODfGq_400x400.png' alt='hello'/>
                        : null
                      }
                      {this.props.monsterReducer.monsters.map( (mon, i) => {
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
            <button onClick={this.props.goBack}>Return to the known.</button>
          </div>
        }
        {/* build this up to leave entered zone and rebuild map from current area. also trigger monster rebuild when switching areas. 
        */}
        {this.props.mapReducer.entered &&
          <button onClick={this.retreat}>Retreat!</button>
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
            {this.state.combatMons.map((monster, i) => {
              return (
                <div className='monster'>
                  <h3>{monster.monsterInfo.name}</h3>
                  <Link to={`/MegaRPG/battle/${i}`} onClick={() => this.props.setMonster(monster.monsterInfo)}>
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

export default withRouter(connect(mapStateToProps, { getMap, updateArea, discover, setMonster, move, goBack, enterArea, retreat, getMonsters, moveMonsters })(WorldMap));