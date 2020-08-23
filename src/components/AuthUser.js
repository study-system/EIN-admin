import React, {Component} from 'react'
import List from '../common/List'
import config from '../config'
import axios  from 'axios';
import { withRouter } from "react-router-dom";
import queryString from 'query-string'

class AuthUser extends Component{
  constructor(props){
    super(props);
    this.state = {contents:[], pageInfo:{}, query:{}}
  }
  agreeBtn =(id)=> {
    return(
    <div className='btn-group'>
      <button type="button" className="btn btn-success btn-sm" onClick={this.onClickAuth} id={id} value='yes'>인증</button>
      <button type="button" className="btn btn-danger btn-sm" onClick={this.onClickAuth} id={id} value='no'>거부</button>
    </div>)
  }

  async componentDidMount(){
    this.fetchData(!!this.props.location.state ? this.props.location.state.page : 1 );
  }

  fetchData = async (page = 1) => {
    const res = await axios.get(config.host+'/authUser?page='+page+'&'+queryString.stringify(this.state.query),{withCredentials:true})
    this.setState({contents:res.data.contents, pageInfo:res.data.pageInfo})
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!this.props.location.state){
      return;
    }else if(prevState.query !== this.state.query ||!prevProps.location.state || (prevProps.location.state.page !== this.props.location.state.page)){
      this.fetchData(this.props.location.state.page)
    }
  }

  onClickAuth = async(e) =>{
    const target = e.target;
    const contents = this.state.contents;
    const authUserId = contents.find(content => parseInt(target.id) === content.id).authuser_id;
    const res = await axios.put(config.host+'/authUser/'+authUserId,{
      auth: target.value
    },{withCredentials:true})
    if(res.status === 204){
      this.setState({contents: contents.map(item => item.id === parseInt(target.id) ? {...item, auth: target.value} : item)})
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
        <>
          <List data={this.state.contents} 
            fields={[
              {name:'id', title:'id'},
              {name:'name', title:'이름'},
              {name:'nickname', title:'닉네임'},
              {name:'email', title:'이메일'},
              {name:'address', title:'주소'},
              {name:'detail_address', title:'상세주소'},
              {name:'email_check', title:'이메일 인증'},
              {name:'push_agree', title:'푸쉬동의'},
              {name:'phone', title:'연락처'},
              {name:'company', title:'회사'},
              {name:'company_number', title:'회사 연락처'},
              {name:'website', title:'website'},
              {name:'auth', title:'인증 여부'},
              {title:'인증', customContent:this.agreeBtn},
            ]}
            pageInfo={this.state.pageInfo}
            filterData={[
              {title:'인증여부', fieldName:'auth', options:[
                {name:'yes', id: 'yes'}, 
                {name:'no', id: 'no'}, 
              ]},
              {title:'지역', fieldName:'location_id', url:config.host+"/board/location"},
              {title:'이메일 인증', fieldName:'email_check', options:[
                {name:'yes', id: 'yes'}, 
                {name:'no', id: 'no'}, 
              ]},
              {title:'푸쉬 알림 동의', fieldName:'push_agree', options:[
                {name:'yes', id: 'yes'}, 
                {name:'no', id: 'no'}, 
              ]},
            ]}
            onChangeFilter={this.onChangeFilter}
          />
        </>       
      )
  }
}

export default withRouter(AuthUser)