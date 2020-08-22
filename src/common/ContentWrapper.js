import React, {Component} from 'react'

class ContentWrapper extends Component{
  render(){
    const Content = this.props.component
    return (
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>{this.props.title}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className='content-fluid'>
              <Content/>
            </div>
          </div>   
        </div>
      )
  }
}

export default ContentWrapper