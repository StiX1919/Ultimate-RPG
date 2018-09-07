import React, {Component} from 'react'

import './Fighter.css'

class Fighter extends Component {
    constructor(props){
        super(props)
        this.state = {
            pTop: 0,
            pLeft: 0,

            fighterHeight: 40,
            fighterWidth: 20
        }
        this.fighter = this.fighter.bind(this)

    }

    fighter(event){
        console.log(event.key)
        if(event.key === 'ArrowLeft'){
            if(this.state.pLeft > 0){
                this.setState({pLeft: this.state.pLeft - 5})

            }
        }
        else if(event.key === 'ArrowRight'){
            if(this.state.pLeft < this.props.boxWidth - this.state.fighterWidth)
            this.setState({pLeft: this.state.pLeft + 5})
        }
        else if(event.key === 'ArrowUp'){
            if(this.state.pTop > 0)
            this.setState({pTop: this.state.pTop - 5})
        }
        else if(event.key === 'ArrowDown'){
            if(this.state.pTop < this.props.boxHeight - this.state.fighterHeight)
            this.setState({pTop: this.state.pTop + 5})
        }
    }

    render(){
        return (
            <div onKeyDown={this.fighter} 
                tabIndex="0"
                className='piece' 
                style={{position: 'relative', 
                        backgroundColor: 'blue', 
                        top: this.state.pTop, 
                        left: this.state.pLeft,
                        width: this.state.fighterWidth,
                        height: this.state.fighterHeight
                        }}>
            </div>
        )
    }
}

export default Fighter