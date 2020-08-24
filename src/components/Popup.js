import React, {Component} from 'react'
import config from '../config'
import axios  from 'axios';
import FileUploader from './../common/FileUploader'


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
    
    onChangeActive = async (e)=>{
        const value = e.target.value;
        const respone = await axios.put(config.host+'/popup',{active:value},{withCredentials:true})
        if(respone.status ===201){
            this.setState((pre)=>({...pre, active:value}));
        }
    }
    onUploadFinish = (imageUrl) => {
        this.setState((pre)=>({...pre, image:imageUrl}));
    }
    
    render(){
        console.log('ren pop')
        const state = this.state;
        return(
            <div className="card">
                <div className="card-body">
                    <div className='float-left col-6'>
                        <img className='col-12' src={state.image} alt=''/>
                    </div>
                    <div className='float-left ml-4 mt-3'>
                        <FileUploader onUploadFinish={this.onUploadFinish}/>
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