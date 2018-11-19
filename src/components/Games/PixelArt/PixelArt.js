import React, { Component } from 'react';

import domtoimage from 'dom-to-image'
import {SketchPicker} from 'react-color'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import {getPixMons, getPixWeapons, submitArt, submitHeroArt} from '../../../ducks/reducers/pixelArt'
import {getHeroes} from '../../../ducks/reducers/userReducer'

import Pixel from './components/Pixel/Pixel'
import './PixelArt.css';

class PixelArt extends Component {
  constructor(){
    super()
    this.state = {
      color: '#FFFFFF',
      reactColor: '#FFFFFF',
      opacity: 1,
      height: 20,
      width: 20,
      pixSize: 15,

      pixelArr: [],
      newHeight: 20,
      newWidth: 20,

      border: true,
      palletOpen: true,
      pallet: true,
      image: '',

      pixelArt: [],
      artName: '',
      artTable: '',

      currentHero: {}
    }
    this.handleColorChange=this.handleColorChange.bind(this)
    this.modifyPixels = this.modifyPixels.bind(this)
    this.choosePixColor = this.choosePixColor.bind(this)

    this.handleChangeHeight=this.handleChangeHeight.bind(this)
    this.handleChangeWidth=this.handleChangeWidth.bind(this)
    this.handlePixSize=this.handlePixSize.bind(this)

    this.updateTable=this.updateTable.bind(this)

    this.toggleBorder = this.toggleBorder.bind(this)
    this.openPallet = this.openPallet.bind(this)

    this.updatePreviewImage = this.updatePreviewImage.bind(this)
    this.selectPixType = this.selectPixType.bind(this)

    this.submitArt = this.submitArt.bind(this)
    this.submitHeroArt = this.submitHeroArt.bind(this)
  }

  componentDidMount(){
    this.modifyPixels()
    this.props.getPixMons()
    this.props.getPixWeapons()
    this.props.getHeroes()
  }


  async updatePreviewImage(){
    var node = document.getElementById('canvas');
    let image = ''
    try {
  
      await domtoimage.toPng(node)
         .then(function (dataUrl) {
            image = dataUrl
         })
         .catch(function (error) {
             console.error('oops, something went wrong!', error);
         });
    } finally {
      this.setState({image})
    }
  }

  openPallet(){
    if(this.state.palletOpen === null){
      this.setState({palletOpen: true, pallet: true})
    } else
    this.setState({palletOpen: !this.state.palletOpen}, () => {
      if(this.state.palletOpen === false){
        setTimeout(() => {
          this.setState({pallet: false})
        }, 900)
      }
      else this.setState({pallet: true})
    })
  }

  
  modifyPixels(){
    let oldArr = this.state.pixelArr.slice()
    let pixelArr = []
    
        
        if(oldArr[0]){
          for(let i = 0, c = 0, r = 0; i < this.state.width*this.state.height; i++){
            let matchArr = oldArr.filter(item => (item.cInd === c && item.rInd === r))
            if(c < this.state.width){
              if(matchArr[0] && matchArr[0].color !== '#FFFFFF'){
                pixelArr.push(Object.assign({}, matchArr[0], {cInd: c, rInd: r}))
                c++
              } else {
                pixelArr.push({cInd: c, rInd: r, color: '#FFFFFF', opacity: 1})
                //add transparancy to pixel objects, at 
                c++
              }
            } else {
              c = 0
              r ++
              i--
            }

          }
        }
        else 
          for(let c = 0; c < this.state.width; c++){
            for(let r = 0; r < this.state.height; r++){
              pixelArr.push({cInd: c, rInd: r, color: '#FFFFFF', opacity: 1})
            }
          }
    
        this.setState({pixelArr})
  }

  handleColorChange(e){
    this.setState({reactColor: e.rgb, color: e.hex, opacity: e.rgb.a})

    // grab transparancy. at e.rgb.a. is 1 or less
  }

  async handleChangeHeight(value){
    if(Number(value) > 30){
      await this.setState({newHeight: 30})
    } else
      await this.setState({ newHeight: Number(value) })
  }
  async handleChangeWidth(value){
    if(Number(value) > 30){
      await this.setState({newWidth: 30})
    } else
      await this.setState({ newWidth: Number(value) })
  }


  choosePixColor(color, opacity, index, arr){
    let newArr = arr

    newArr[index].color = color
    newArr[index].opacity = opacity
    this.setState({pixelArr: newArr})
  }

  handlePixSize(value){
    if(Number(value) > 15){
      this.setState({pixSize: 15})
    } else
    this.setState({pixSize: Number(value)})
  }


  async updateTable(event){
    if(event.key === 'Enter'){
      await this.setState({width: this.state.newWidth, height: this.state.newHeight})
      this.modifyPixels()

    }
  }

  toggleBorder(){
    this.setState({border: !this.state.border})
  }
  

  selectPixType(type){
    switch(type){
      case 'weapons':
        this.setState({artTable: type, artName: '', pixelArt: this.props.pixelArt.weapons})
        break;
      case 'monsters':
        this.setState({artTable: type, artName: '', pixelArt: this.props.pixelArt.monsters})
        break;
      case 'heroes':
        this.setState({artTable: type, artName: '', pixelArt: this.props.user.heroes})

      default: return null
    }
  }

  async submitArt() {
    try {
      this.updatePreviewImage()
    }
    finally {
      this.props.submitArt(this.state.artTable, this.state.artName, this.state.image)
    }
  }
  async submitHeroArt(){
    try {
      this.updatePreviewImage()
    }
    finally {
      this.props.submitHeroArt(this.state.image, this.state.currentHero.hero_id)
    }
  }

  render() {
    console.log(this.state.currentHero)
    
    return (
      <div className='pixPage'>
        <div className="PixelArt">
          <h1 className='pix-art-title'>Pixel Art</h1>

          <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
            <h2>Type: {this.state.artTable}</h2>
            <h2>Item: {this.state.artName}</h2>
          </div>
          
          <div className='colorChooser'>

          
              <div className='PixelBox'>
                  <div id='canvas' className='columns' style={{width: this.state.border ? (this.state.pixSize*this.state.width +(this.state.width * (1))) + 'px' : (this.state.pixSize*this.state.width) + 'px',
                                                  height: this.state.border ? (this.state.pixSize*this.state.height+(this.state.height * (1))) + 'px': (this.state.pixSize*this.state.height) + 'px'}}> 
                      {this.state.pixelArr.map((pix, i, arr) => {
                          return (
                            <Pixel key={i} 
                                  pixel={pix} 
                                  position={`${pix.cInd}x${pix.rInd}`} 
                                  index={i} 
                                  pixSize={this.state.pixSize}
                                  color={this.state.color}
                                  opacity={this.state.opacity}
                                  allArr={arr}
                                  chooseColor={this.choosePixColor}
                                  border={this.state.border}
                                  mouseEnter={this.mouseEnter}
                                  />
                          )
                      })}
                  </div>
      
              </div>
              
          </div>

          <div className='pallet-button' onClick={this.openPallet}/>

          {this.state.pallet &&
            <div className={this.state.palletOpen ? 'pallet-model pallet-opening' : this.state.palletOpen === false ? 'pallet-model pallet-closing' : 'pallet-model'}>
                <SketchPicker color={this.state.reactColor} onChangeComplete={(e) => this.handleColorChange(e)} />
                <div className='inpBox'>
                    <h5>Hit enter to apply changes. Max 30/30</h5>
                    <h3>Height:</h3><input type='number' value={this.state.newHeight} placeholder={this.state.height} onChange={(e) => this.handleChangeHeight(e.target.value)} onKeyDown={this.updateTable}/>
                    <h3>Width:</h3><input type='number' value={this.state.newWidth} placeholder={this.state.width} onChange={(e) => this.handleChangeWidth(e.target.value)} onKeyDown={this.updateTable}/>
                    <h3>Pixel Size:</h3><input type='number' value={this.state.pixSize} placeholder={20} onChange={(e) => this.handlePixSize(e.target.value)}/>
                </div>  
            </div>
          }
        </div>
        <div>

          <div className='submit-section'>
            {this.props.user.user
              ? (
                <div>
                    <h3>Categories</h3>
                    <button onClick={() => this.selectPixType('weapons')}>Weapons</button>
                    <button onClick={() => this.selectPixType('monsters')}>Monsters</button>
                    <button onClick={() => this.selectPixType('heroes')}>Heroes</button>

                    <h5>Select what you want to submit for</h5>
                    <select onChange={
                      this.state.artTable === 'heroes' 
                      ? (e) => this.setState({artName: e.target.value, currentHero: this.state.pixelArt.find((hero) => hero.hero_name === e.target.value)})
                      : (e) => this.setState({artName: e.target.value})
                    }>
                      <option default value=''></option>
                      {this.state.pixelArt.map((target, i) => {
                        return (
                          <option key={target.monster_id || target.equip_id || target.hero_id} value={target.name || target.hero_name}>{target.name || target.hero_name}</option>
                        )
                      })}
                      <option value='Custom'>Custom</option>
                    </select>

                    <button onClick={this.toggleBorder}>Toggle Borders</button>
                    <button onClick={this.updatePreviewImage}>Preview Image</button>
                    {/* fix submit button so that it generates the image before submitting*/}
                    {this.state.artTable === 'heroes'
                      ? <button onClick={() => this.submitHeroArt()}>Change Hero Art</button>
                      : <button onClick={() => this.submitArt()}>Submit PixArt</button>
                    }
                </div>
                )
              : (
                <div>
                    <h1>Login to create art for your personal heroes!</h1>
                    <h2>Submit your art for a chance to have it put in the game!</h2>
                </div>
                )
            }
              
              
            
          </div>
              
          <Link to='/'><h1>Back to Games</h1></Link>
          <img className='preview-image' src={this.state.image }/>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({pixelArt: state.pixelArt, user: state.userReducer})

export default withRouter(connect(mapStateToProps, {getPixMons, getPixWeapons, submitArt, getHeroes, submitHeroArt})(PixelArt))