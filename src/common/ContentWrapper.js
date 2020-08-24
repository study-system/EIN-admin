import React, {Component} from 'react'

class ContentWrapper extends Component{
  render(){
    const Content = this.props.component
    return (
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-10">
                  <h1>{this.props.title}</h1>
                </div>
                <div className='col-sm-2'>
                  {this.props.customButton}
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