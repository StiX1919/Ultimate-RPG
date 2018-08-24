import React, { Component } from 'react';

import {SketchPicker} from 'react-color'

import WidthBox from './components/WidthBox'
import Pixel from './components/Pixel'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      color: '#FFFFFF',
      height: 10,
      width: 10,
      pixSize: 10,

      pixelArr: []
    }
    this.handleColorChange=this.handleColorChange.bind(this)
    this.modifyPixels = this.modifyPixels.bind(this)
    this.choosePixColor = this.choosePixColor.bind(this)

    this.handleChangeHeight=this.handleChangeHeight.bind(this)
    this.handleChangeWidth=this.handleChangeWidth.bind(this)
    this.handlePixSize=this.handlePixSize.bind(this)

  }

  componentDidMount(){
    this.modifyPixels()
  }
  
  modifyPixels(){
    let pixelArr = []
    
        for(let c = 0; c < this.state.width; c++){
          for(let r = 0; r < this.state.height; r++){
            pixelArr.push({cInd: c, rInd: r, color: '#FFFFFF'})
          }
        }
    
        this.setState({pixelArr})
  }

  handleColorChange(e){
    console.log(e)
    this.setState({color: e.hex})
  }

  async handleChangeHeight(value){
    if(Number(value) > 50){
      await this.setState({height: 50})
      this.modifyPixels()
    } else
      await this.setState({ height: Number(value) })
      this.modifyPixels()
  }
  async handleChangeWidth(value){
    if(Number(value) > 50){
      await this.setState({width: 50})
      this.modifyPixels()
    } else
      await this.setState({ width: Number(value) })
      this.modifyPixels()
  }


  choosePixColor(color, index, arr){
    let newArr = arr

    newArr[index].color = color
    this.setState({pixelArr: newArr})
  }

  handlePixSize(value){
    if(Number(value) > 10){
      this.setState({pixSize: 10})
    } else
    this.setState({pixSize: Number(value)})
  }

  

  render() {
    // console.log(this.state)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='colorChooser'>
          <SketchPicker color={this.state.color} onChangeComplete={(e) => this.handleColorChange(e)}/>

          <div className='columns' style={{width: this.state.pixSize === 10 ? (this.state.pixSize*this.state.width +(this.state.width * (this.state.pixSize / 10))) + 'px' : (this.state.pixSize*this.state.width) + 'px',
                                           height: this.state.pixSize === 10 ? (this.state.pixSize*this.state.height+(this.state.height * (this.state.pixSize / 10))) + 'px' : (this.state.pixSize*this.state.height) + 'px'}}> 
            {this.state.pixelArr.map((pix, i, arr) => {
              return <Pixel key={i} 
                            pixel={pix} 
                            position={`${pix.cInd}x${pix.rInd}`} 
                            index={i} 
                            pixSize={this.state.pixSize}
                            color={this.state.color}
                            allArr={arr}
                            chooseColor={this.choosePixColor}
                            />
            })}
          </div>

          <div>
          <h3>Height:</h3><input type='number' value={this.state.height} placeholder={this.state.height} onChange={(e) => this.handleChangeHeight(e.target.value)}/>
          <h3>Width:</h3><input type='number' value={this.state.width} placeholder={this.state.width} onChange={(e) => this.handleChangeWidth(e.target.value)}/>
          <h3>Pixel Size:</h3><input type='number' value={this.state.pixSize} placeholder={10} onChange={(e) => this.handlePixSize(e.target.value)}/>
        
        </div>
        </div>
        
        
      </div>
    );
  }
}

// {this.state.widthArr.map((box, i) => {
//   return <WidthBox key={i} heightArr={this.state.heightArr} pixSize={this.state.pixSize} widthIndex={i} chosenColor={this.state.color}/>
// })}
export default App;
