import React, {Component} from 'react'
import List from '../common/List'
import config from '../config'
import axios  from 'axios';


export class Blacklist extends Component{
  constructor(props){
    super(props);
    this.state = {contents:[]}
  }
  agreeBtn =(id)=> {
    return(
    <div className='btn-group'>
      <button type="button" className="btn btn-success btn-sm" onClick={this.onClickAgree} id={id} value='yes'>동의</button>
      <button type="button" className="btn btn-danger btn-sm" onClick={this.onClickAgree} id={id} value='no'>거부</button>
    </div>)
  }

  async componentDidMount(){
    const res = await axios.get(config.host+'/blacklist')
    this.setState({contents:res.data.contents})
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

  render(){
      return (
        <div >
          <List url={config.host+'/blacklist'} data={this.state.contents} fields={[
            {name:'id', title:'id'},
            {name:'user_email', title:'신고자'},
            {name:'content', title:'내용'},
            {name:'blacklist_email', title:'신고대상'},
            {name:'create_at', title:'신고일'},
            {name:'agree', title:'동의여부'},
            {title:'동의', customContent:this.agreeBtn},
            ]}/>
        </div>       
      )
  }
}

