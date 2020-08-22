import React, {Component} from 'react'
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import axios  from 'axios';
import config from '../config';


const auth = {
  isAuthenticated: false,
  authenticate(email,pw,cb) {
    const result = {status:500, message:'error'}
    axios.post(config.host+'/login',{email:email, password:pw}, {withCredentials:true}).then((respone)=>{
      if(respone.status === 200){
        auth.isAuthenticated = true;
        result.status = respone.status;
        result.message = respone.data.message;
        cb(result)
      }
    }).catch( (err) => {
      result.status = 401;
      result.message = 'Unauthorized';
      cb(result)
    })
    
  },
  signout(cb) {
    auth.isAuthenticated = false;
  }
};

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

class Login extends Component{
  
  constructor(props){
    super(props)
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.fromPath = from
  }

  login = (e) => {
    e.preventDefault();
    const id = e.target[0].value;
    const pw = e.target[1].value;
    auth.authenticate(id,pw,(result) => {
      if(result.status === 200)
        this.props.history.replace(this.fromPath);
      else
        alert(result.message)
    });
  };

  render(){
      return (
        <div className='login-page'>
          <div className="login-box">
          <div className="login-logo">
            <b>교육정보알리미 </b> ADMIN
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
        
              <form method="post" onSubmit={this.login}>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email"/>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Password"/>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" disabled/>
                      <label htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>  
      )
  }
}

export default withRouter(Login)