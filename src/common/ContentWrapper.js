import React, {Component} from 'react'
import ContentBody from './ContentBody';
import ContentHeader from './ContentHeader';

class Content extends Component{

  render(){
      return (
        <div className="content-wrapper">
          <ContentHeader title={this.props.title}/>
          <ContentBody component={this.props.component}/>
        </div>
      )
  }
}

export default Content