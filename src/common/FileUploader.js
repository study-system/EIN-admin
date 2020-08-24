import React, {Component} from 'react'
import config from '../config'
import axios  from 'axios';

export default class FileUploader extends Component{
    constructor(props){
        super(props)
        this.state={
            image:'',
            uploadFlag: false
        }
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
                        this.setState((pre)=>({...pre, image:imgUrl, uploadFlag:false}),()=>{
                            this.props.onUploadFinish(imgUrl)
                        });
                    }, 1000)
                        
                }else{
                    this.setState((pre)=>({...pre, uploadFlag:false}),()=>{
                        this.props.onUploadFinish('', '팝업 이미지 변경 실패')
                    });
                }
            }else{
                this.setState((pre)=>({...pre, uploadFlag:false}),()=>{
                    this.props.onUploadFinish('', '파일 업로드 실패')
                });
            }
        })
    }

    render(){
        const state = this.state;
        return (
            <form method="post" encType="multipart/form-data" className='input-group-prepend' onSubmit={this.onClickUpload}>
                <input type="file" accept="image/png, image/jpeg"/>
                <input type="submit" className={"btn btn-block btn-success "+(state.uploadFlag?'disabled':'')} value='업로드'/>
            </form>
        )
    }
}