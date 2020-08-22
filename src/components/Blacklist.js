import React, {Component} from 'react'
import List from '../common/List'
import config from '../config'
import axios  from 'axios';
import { withRouter } from "react-router-dom";

class Blacklist extends Component{
  constructor(props){
    super(props);
    this.state = {contents:[], pageInfo:{}, status:'null'}
  }
  agreeBtn =(id)=> {
    return(
    <div className='btn-group'>
      <button type="button" className="btn btn-success btn-sm" onClick={this.onClickAgree} id={id} value='yes'>동의</button>
      <button type="button" className="btn btn-danger btn-sm" onClick={this.onClickAgree} id={id} value='no'>거부</button>
    </div>)
  }

  async componentDidMount(){
    this.fetchData(!!this.props.location.state ? this.props.location.state.page : 1 );
  }

  fetchData = async (page = 1) => {
    console.log('fetch!!!')
    const res = await axios.get(config.host+'/blacklist?page='+page+'&status='+this.state.status)
    this.setState({contents:res.data.contents, pageInfo:res.data.pageInfo})
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!this.props.location.state){
      return;
    }else if(prevState.status !== this.state.status ||!prevProps.location.state || (prevProps.location.state.page !== this.props.location.state.page)){
      this.fetchData(this.props.location.state.page)
    }
  }

  onClickAgree = async(e) =>{
    const target = e.target;
    const res = await axios.put(config.host+'/blacklist/'+target.id,{
      status: target.value
    })
    if(res.status === 204){
      this.setState({contents:this.state.contents.map(item => item.id === parseInt(target.id) ? {...item, agree: target.value} : item)})
    }
  }

  onChangeFilter = (name, value) => {
    this.setState((pre)=>({...pre, status:value}))
  }

  render(){
      return (
        <div >
          <List data={this.state.contents} 
            fields={[
              {name:'id', title:'id'},
              {name:'user_email', title:'신고자'},
              {name:'content', title:'내용'},
              {name:'blacklist_email', title:'신고대상'},
              {name:'create_at', title:'신고일'},
              {name:'agree', title:'동의여부'},
              {title:'동의', customContent:this.agreeBtn},
            ]}
            pageInfo={this.state.pageInfo}
            filterData={[
              {title:'동의여부', options:[
                {name:'--', id: 'null'}, 
                {name:'yes', id: 'yes'}, 
                {name:'no', id: 'no'}, 
              ], url:'http://myks790.iptime.org:8082/board/major'}
            ]}
            onChangeFilter={this.onChangeFilter}
          />
        </div>       
      )
  }
}

export default withRouter(Blacklist)