import React, {Component} from 'react'
import axios from 'axios';

class Select extends Component{
    constructor(props){
        super(props)
        this.state = {options:[]}
    }
    
    async componentDidMount(){
        if(!!this.props.url)
            this.fetchData();
    }
    
    fetchData = async () => {
        const res = await axios.get(this.props.url)
        this.setState({options: res.data})
    }

    inflateOption = (options)=>{
        return options.map((obj)=>{
            return <option key={obj.name} value={obj.id}>{obj.name}</option>
        })
    }

    onChange = (e) => {
        this.props.onChangeFilter(e.target.name, e.target.value)
    }

    render(){
        return (
            <div className="form-group col-sm-2 float-left">
                <label>{this.props.title}</label>
                <select className="form-control" onChange={this.onChange} name={this.props.fieldName}>
                    <option value={'null'}>--</option>
                    {this.inflateOption(!!this.props.options ? this.props.options : this.state.options)}
                </select>
            </div>
        )
    }
}

export default Select