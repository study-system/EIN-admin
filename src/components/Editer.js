import React, {Component} from 'react'
import Select from './../common/Select';
import FileUploader from './../common/FileUploader';
import config from './../config'
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import axios  from 'axios';

import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { withRouter } from 'react-router-dom';

class Editer extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:0,
            // user_id: 1,
            title: "",
            start_date: moment().toISOString(),
            end_date: moment().toISOString(),
            content: "",
            imageurl: "",
            location_id: 0,
            major_id: 0,
            target_id: 0,
            auth: ""
        }
        this.datetimeInput = React.createRef();
    }

    async componentDidMount(){
        if(this.props.location.state.mode === 'edit'){
            const res = await axios.get(config.host + this.props.location.pathname)
            if(res.status === 200)
                this.setState((pre)=>({...pre, ...res.data}))
        }
      }

    onChangeSelect = (field, value) => {
        this.setState((pre)=>{
            const state = {...pre}
            state[field] = value;
            return state
        })
    }

    inflateFilter(filterData){
        return filterData.map((filter)=>{
          return <Select key={filter.title} {...filter} onChangeFilter={this.onChangeSelect}/>
        })
    }

    onChangeContent = (content) => {
        this.setState((pre)=>({...pre, content: content}))
    }

    onClickDatePicker = (start, end) =>{
        this.setState((pre)=>({
            ...pre,
            start_date: start.toISOString(),
            end_date: end.toISOString()
        }))
    }

    onUploadFinish = (imageUrl) => {
        setTimeout(()=>{
            this.setState((pre)=>({...pre, imageurl:imageUrl}));
        }, 1000)
    }

    onChangeTitle = (e) => {
        const value = e.target.value
        this.setState((pre)=>({...pre, title: value }))
    }

    onClickEdit = async (e) => {
        if(this.props.location.state.mode === 'create'){
            try {
                const res = await axios.post(config.host + '/board',this.state,{withCredentials:true})
                if(res.status === 201){
                    this.props.history.replace('/board',{ state: { page: 1 } });
                }else{
                    alert('error')
                }
            } catch (error) {
                alert(error)
            }
        }else{
            const res = await axios.put(config.host + this.props.location.pathname,this.state,{withCredentials:true})
            console.log(res)
            if(res.status === 204){
                this.props.history.replace('/board',{ state: { page: 1 } });
            }
        }
    }

    onClickRemove = async (e) => {
        try {
            const res = await axios.delete(config.host + '/board/'+this.state.id, {withCredentials:true})
            if(res.status === 204){
                this.props.history.replace('/board',{ state: { page: 1 } });
            }else{
                alert('error')
            }
        } catch (error) {
            alert(error)
        }
    }
    
    render() {
        const state =this.state
        const start = moment(this.state.start_date)
        const end = moment(this.state.end_date)
        return (
            <div className=''>
                <div className='position-absolute col-12' style={{zIndex:1}}>{}
                    <button type="button" className="btn btn-primary col-1 float-right mt-2 mr-3" onClick={this.onClickEdit}>{this.props.location.state.mode === 'edit' ? '수정':'작성'}</button>
                    {this.props.location.state.mode === 'edit' ? <button type="button" className="btn btn-danger col-1 float-right mt-2 mr-3" onClick={this.onClickRemove}>삭제</button>:''}
                </div>
                <div className="card pt-5">
                    <div className="card-header">
                        <div className='input-group-prepend'>
                            <input className="form-control form-control-lg ml-3 mb-3" type="text" placeholder="제목" value={state.title} onChange={this.onChangeTitle}/>
                        </div>
                        {this.inflateFilter([
                            {title:'인증 게시판 여부', fieldName:'auth', options:[
                                {name:'yes', id: 'yes'}, 
                                {name:'no', id: 'no'}, 
                            ], initialOption: state.auth},
                            {title:'지역', fieldName:'location_id', url:config.host+"/board/location", initialOption: state.location_id},
                            {title:'분야', fieldName:'major_id', url:config.host+"/board/major", initialOption: state.major_id},
                            {title:'대상', fieldName:'target_id', url:config.host+"/board/target", initialOption: state.target_id},
                        ])}
                        <DateRangePicker onCallback={this.onClickDatePicker} initialSettings={{ startDate: start, endDate: end}}>
                            <div className="form-group row">
                                <label>시작일- 종료일</label>
                                <div className="input-group ">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faClock}/></span>
                                    </div>
                                    <input type="text" className="form-control float-right" value={start.format('YYYY/MM/DD') +' - ' + end.format('YYYY/MM/DD')}/>
                                </div>
                            </div>
                        </DateRangePicker>
                        <div className='col-sm-2'>
                            <div className='float-left col-6'>
                                <a href={state.imageurl} rel="noopener noreferrer" target='_blank'><img className='col-12' src={state.imageurl} alt=''/></a>
                            </div>
                            <FileUploader onUploadFinish={this.onUploadFinish}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <ReactSummernote
                            value={state.content}
                            options={{
                                lang: 'ko-KR',
                                height: 350,
                                dialogsInBody: true,
                                toolbar: [
                                    ['style', ['style']],
                                    ['font', ['bold', 'underline', 'clear']],
                                    ['fontname', ['fontname']],
                                    ['para', ['ul', 'ol', 'paragraph']],
                                    ['table', ['table']],
                                    ['insert', ['link', 'picture', 'video']],
                                    ['view', ['fullscreen', 'codeview']]
                                ]}} onChange={this.onChangeContent}> 
                        </ReactSummernote>
                    </div>
                </div>    
            </div>
        )
    }
}

export default withRouter(Editer)

