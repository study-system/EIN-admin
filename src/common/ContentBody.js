import React, {Component} from 'react'

class ContentBody extends Component{
  

    render(){
      const Content = this.props.component
        return (
          <div className="content">
            <div className='content-fluid'>
              <Content/>
            </div>
          </div>       
        )
    }
}

export default ContentBody