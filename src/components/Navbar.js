import React, {Component} from 'react'
import {
  Link
} from "react-router-dom";
class Navbar extends Component{
    constructor(props){
      super(props);
      this.state={activeTitle:''}
    }
    genericLink(){
      return this.props.routeInfo.map((info)=>
        <li key={info.title} className='nav-item d-none d-sm-inline-block' onClick={this.onChangePath}>
          <Link to={info.path} className={"nav-link " +(this.state.activeTitle === info.title ?' text-white active':'')}>{info.title}</Link>
        </li>
      )
    }

    onChangePath = (obj)=>{
      this.setState({activeTitle: obj.target.innerText})
    }

    render(){
        return (
          <nav className="main-header navbar navbar-expand navbar-white navbar-light ">
            <ul className="navbar-nav nav-pills">
              {this.genericLink()}
            </ul>
          </nav>
        )
    }
}

export default Navbar