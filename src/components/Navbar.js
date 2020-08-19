import React, {Component} from 'react'

class Navbar extends Component{
    render(){
        return (
          <nav className="main-header navbar navbar-expand navbar-white navbar-light ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">인증 유저 목록</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">알람목록</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block active">
                <a href="#" className="nav-link">신고목록</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">게시글 목록</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">알람목록</a>
              </li>
            </ul>
          </nav>
        )
    }
}

export default Navbar