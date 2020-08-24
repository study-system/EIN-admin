import React, { Component} from 'react';
import './adminlte.min.css'
import Navbar from './components/Navbar';
import ContentWrapper from './common/ContentWrapper';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Blacklist from './components/Blacklist';
import AuthUser from './components/AuthUser';
import Board from './components/Board';
import Popup from './components/Popup';
import Editer from './components/Editer';
import Login, { PrivateRoute } from './components/Login';

class App extends Component {
  constructor(props){
    super(props)
    this.routeInfo=[
      {path:'/board', title:'게시글 목록', component: Board, initState:{page:1}, customButton:<Link className='btn btn-primary float-right' to={{pathname:"/board/create/",state:{mode:'create'}}}>글 작성</Link>},
      {path:'/blacklist', title:'신고 목록', component: Blacklist, initState:{page:1}},
      {path:'/authUser', title:'인증 유저 목록', component: AuthUser, initState:{page:1}},
      {path:'/popup', title:'홍보팝업', component: Popup},
    ]
  }

  genericRoute(){
    return this.routeInfo.map((info, idx)=>
      <PrivateRoute key={info.path + idx} exact path={info.path}>
        <ContentWrapper {...info} />
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
                <PrivateRoute strict path={'/board/create/'}>
                  <ContentWrapper component={Editer} title={'게시글 생성'} />
                </PrivateRoute>
                <PrivateRoute  exact strict path={'/board/:boardId'}>
                  <ContentWrapper component={Editer} title={'게시글 수정'} />
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
