import React, {Component} from 'react'
import { Pagination } from './Pagination';

export class List extends Component{

    render(){
        return (
            <div className="card">
            <div className="card-header">
              <div className="btn-group show">
                <button type="button" className="btn btn-default">전체</button>
                <button type="button" className="btn btn-default dropdown-toggle dropdown-icon" data-toggle="dropdown" aria-expanded="true">
                  <span className="sr-only">Toggle Dropdown</span>
                  <div className="dropdown-menu" role="menu" x-placement="bottom-start" style={{position: 'absolute', 'will-change': 'transform', top: 0+'px', left: 0+'px', transform: "translate3d(-1+'px', 37+'px', 0+'px')"}}>
                    <a className="dropdown-item" href="#">전체</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                  </div>
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>                  
                  <tr>
                    <th style={{width: 10+'px'}}>#</th>
                    <th>신고당한 유저</th>
                    <th>내용</th>
                    <th>신고자</th>
                    <th>요청날자</th>
                    <th>동의여부</th>
                    <th >동의</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>홍길동</td>
                    <td>끓는다 끓는 피에 뛰노는 심장은 거선의 기관과 같이 </td>
                    <td>철수</td>
                    <td>2020~~</td>
                    <td>대기중</td>
                    <td>
                      <div className='btn-group'>
                        <button type="button" className="btn btn-success btn-sm">동의</button>
                        <button type="button" className="btn btn-danger btn-sm">거부</button>
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div className="card-footer clearfix">
              <Pagination/>
            </div>
          </div>
        )
    }
}