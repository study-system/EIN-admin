import React, { Component} from 'react';
import './adminlte.min.css'
import Navbar from './components/Navbar';
import ContentWrapper from './common/ContentWrapper';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Blacklist from './components/Blacklist';
import AuthUser from './components/AuthUser';
import Board from './components/Board';
import Login, { PrivateRoute } from './components/Login';

class App extends Component {
  constructor(props){
    super(props)
    this.routeInfo=[
      {path:'/board', title:'게시글 목록', component: Board, initState:{page:1}},
      {path:'/blacklist', title:'신고 목록', component: Blacklist, initState:{page:1}},
      {path:'/authUser', title:'인증 유저 목록', component: AuthUser, initState:{page:1}},
    ]
  }

  genericRoute(){
    return this.routeInfo.map((info, idx)=>
      <PrivateRoute key={info.path + idx} path={info.path} authenticated={this.authenticated}>
        <ContentWrapper component={info.component} title={info.title} />
      </PrivateRoute>
    )
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" >
            <Login/>
          </Route>
          <>
            <div className='wrapper'>
              <Navbar routeInfo={this.routeInfo}/>
                <PrivateRoute exact path="/">
                  <h1>교육정보 알리미</h1>
                </PrivateRoute>
                {this.genericRoute()}
              <Footer/>
            </div>
          </>
        </Switch>
      </Router>
    )}
}

export default App;
