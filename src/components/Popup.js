import React, {Component} from 'react'
import config from '../config'
import axios  from 'axios';

class Popup extends Component{
    constructor(props){
        super(props)
        this.state={
            image:'',
            active: 'no',
            uploadFlag: false
        }
    }

    async componentDidMount(){
        const res = await axios.get(config.host+'/popup')
        this.setState(res.data)
    }
    
    onClickUpload = (e)=>{
        e.preventDefault();
        const files = e.target[0].files;
        if(files.length === 0 || this.state.uploadFlag)
            return;
        this.setState((pre)=>({...pre, uploadFlag:true}), async ()=>{
            const file = files[0];
            const fd = new FormData();
            fd.append('file',file);
            const respone = await axios.post(config.host+'/file', fd, {withCredentials:true})
    
            if(respone.status === 200){
                const imgUrl = respone.data.imgUrl;
                const res = await axios.post(config.host+'/popup',{image:imgUrl},{withCredentials:true})
                if(res.status === 201){
                    setTimeout(()=>{
                        this.setState((pre)=>({...pre, image:imgUrl, uploadFlag:false}));
                    }, 1000)
                }else{
                    alert('팝업 이미지 변경 실패');
                    this.setState((pre)=>({...pre, uploadFlag:false}));
                }
            }else{
                alert('파일 업로드 실패');
                this.setState((pre)=>({...pre, uploadFlag:false}));
            }
        })
    }
    
    onChangeActive = async (e)=>{
        const value = e.target.value;
        const respone = await axios.put(config.host+'/popup',{active:value},{withCredentials:true})
        if(respone.status ===201){
            this.setState((pre)=>({...pre, active:value}));
        }
    }
    
    render(){
        const state = this.state;
        return(
            <div className="card">
                <div className="card-body">
                    <div className='float-left col-6'>
                        <img className='col-12' src={state.image} alt=''/>
                    </div>
                    <div className='float-left ml-4 mt-3'>
                        <form method="post" encType="multipart/form-data" className='input-group-prepend' onSubmit={this.onClickUpload}>
                            <input type="file" accept="image/png, image/jpeg"/>
                            <input type="submit" className={"btn btn-block bg-gradient-success "+(state.uploadFlag?'disabled':'')}   value='업로드'/>
                        </form>
                        <div className="btn-group btn-group-toggle row mt-3" data-toggle="buttons" value='no' onChange={this.onChangeActive}>
                            <label className={"btn btn-secondary"+(state.active ==='yes'?' active':'')}>
                                <input type="radio" name="options" id="option1" value='yes'/> 활성화
                            </label>
                            <label className={"btn btn-secondary"+(state.active ==='no'?' active':'')}>
                                <input type="radio" name="options" id="option2" value='no'/> 비활성화
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup