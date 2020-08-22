import React, {Component} from 'react'
import { Pagination } from './Pagination';
import Select from './Select';

class List extends Component{
  constructor(props){
    super(props)
    this.state ={content:[]}
  }

  inflateHead(fields){
    return fields.map((v,idx)=>{
      return <th key={v.title+idx}>{v.title}</th>
    })
  }

  inflateContent(data){
    return data.map((row,idx)=>{
      return <tr key={idx}>
        {this.props.fields.map((field,idx2)=>{
          if(field.customContent !== undefined){
            return <td key={idx + ' ' + idx2}>{field.customContent(row.id, row[field.name])}</td>
          }
          return <td key={idx + ' ' + idx2}>{row[field.name]}</td>
        })}
        </tr>
    })
  }
  
  inflateFilter(filterData, onChangeFilter){
    return filterData.map((filter)=>{
      return <Select key={filter.title} {...filter} onChangeFilter={onChangeFilter}/>
    })
  }

  render(){
    return (
        <div className="card">
        <div className="card-header">
          {this.inflateFilter(this.props.filterData, this.props.onChangeFilter)}
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>                  
              <tr>
                {this.inflateHead(this.props.fields)}
              </tr>
            </thead>
            <tbody>
              {this.inflateContent(this.props.data)}
            </tbody>
          </table>
        </div>
        <div className="card-footer clearfix">
          <Pagination pageInfo={this.props.pageInfo}/>
        </div>
      </div>
    )
  }
}


export default List;