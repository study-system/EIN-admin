import React, {Component} from 'react'
import List from '../common/List'
import config from '../config'
import axios  from 'axios';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

class Board extends Component{
  constructor(props){
    super(props);
    this.state = {contents:[], pageInfo:{}, query:{auth:'yes'}}
  }

  async componentDidMount(){
    this.fetchData(!!this.props.location.state ? this.props.location.state.page : 1 );
  }
  
  fetchData = async (page = 1) => {
    const res = await axios.get(config.host+'/board?page='+page+'&'+queryString.stringify(this.state.query))
    this.setState((pre)=>({...pre, contents: res.data.contents, pageInfo: res.data.pageInfo}))
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.query !== this.state.query || (!prevProps.location.state && !!this.props.location.state) || (!!prevProps.location.state && (prevProps.location.state.page !== this.props.location.state.page))){
      this.fetchData(!!this.props.location.state ? this.props.location.state.page : 1 )
    }
  }

  onChangeFilter = (field, value) => {
    this.setState((pre)=>{
      const query = {...pre.query}
      if(value === 'null'){
        delete query[field]
      }else{
        query[field] = value;
      }
      return {...pre, query: query}
    },()=>{
      this.props.history.replace({state:{page:1}})
    })
  }

  render(){
      return (
        <div >
          <List data={this.state.contents} 
            fields={[
              {name:'id', title:'id'},
              {name:'title', title:'제목'},
              {name:'nickname', title:'내용'},
            ]}
            pageInfo={this.state.pageInfo}
            filterData={[
              {title:'인증 게시판 여부', fieldName:'auth', options:[
                {name:'yes', id: 'yes'}, 
                {name:'no', id: 'no'}, 
              ]},
              {title:'지역', fieldName:'location_id', url:config.host+"/board/location"},
              {title:'분야', fieldName:'major_id', url:config.host+"/board/major"},
              {title:'대상', fieldName:'target_id', url:config.host+"/board/target"},
            ]}
            onChangeFilter={this.onChangeFilter}
          />
        </div>       
      )
  }
}

export default withRouter(Board)