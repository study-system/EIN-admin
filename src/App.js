import React, { Component} from 'react';
import './adminlte.min.css'
import Navbar from './components/Navbar';
import ContentWrapper from './common/ContentWrapper';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Blacklist from './components/Blacklist';
import { Board } from './components/Board';

class App extends Component {
  constructor(props){
    super(props)
    this.routeInfo=[
      {path:'/board', title:'게시글 목록', component: Board},
      {path:'/blacklist', title:'신고 목록', component: Blacklist, initState:{page:1}},
    ]
  }

  genericRoute(){
    return this.routeInfo.map((info, idx)=>
      <Route key={info.path + idx} path={info.path}>
        <ContentWrapper component={info.component} title={info.title} />
      </Route>
    )
  }

  render(){
    return (
      <Router>
        <div className='wrapper'>
          <Navbar routeInfo={this.routeInfo}/>
          <Switch>
            <Route exact path="/" >
              <h1>교육정보 알리미</h1>
            </Route>
            {this.genericRoute()}
          </Switch>
          <Footer/>
        </div>
      </Router>
    )}
}

export default App;
