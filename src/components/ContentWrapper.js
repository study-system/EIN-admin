import React, {Component} from 'react'
import ContentBody from './ContentBody';
import ContentHeader from './ContentHeader';

class Content extends Component{
    render(){
        return (
          <div className="content-wrapper">
            <ContentHeader/>
            <ContentBody/>
    
          </div>
        )
    }
}

export default Content