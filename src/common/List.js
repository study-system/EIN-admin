import React, {Component} from 'react'
import { Pagination } from './Pagination';

class List extends Component{
  constructor(props){
    super(props)
    this.state ={content:[]}
  }

  inflateHead(){
    return this.props.fields.map((v,idx)=>{
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

  render(){
    return (
        <div className="card">
        <div className="card-header">
          <div className="btn-group show">
            <button type="button" className="btn btn-default">전체</button>
            <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="true">
              <span className="sr-only">Toggle Dropdown</span>
              <div className="dropdown-menu" role="menu" x-placement="bottom-start" style={{position: 'absolute', 'willChange': 'transform', top: 0+'px', left: 0+'px', transform: "translate3d(-1+'px', 37+'px', 0+'px')"}}>
                <a className="dropdown-item" href="/test">전체</a>
                <a className="dropdown-item" href="/test">Another action</a>
                <a className="dropdown-item" href="/test">Another action</a>
              </div>
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>                  
              <tr>
                {this.inflateHead()}
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