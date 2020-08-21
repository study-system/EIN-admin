import React, {Component} from 'react'

export class Pagination extends Component{
    render(){
        return (
            <ul className="pagination pagination-sm m-0 float-right">
                <li className="page-item"><a className="page-link" href="/0">«</a></li>
                <li className="page-item"><a className="page-link" href="/1">1</a></li>
                <li className="page-item"><a className="page-link" href="/2">2</a></li>
                <li className="page-item"><a className="page-link" href="/3">3</a></li>
                <li className="page-item"><a className="page-link" href="/4">»</a></li>
            </ul>
        )
    }
}