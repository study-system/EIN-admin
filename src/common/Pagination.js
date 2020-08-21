import React, {Component} from 'react'
import {
    Link
  } from "react-router-dom";

export class Pagination extends Component{
    static defaultProps ={
        pageInfo: {
            pageNumber: 1,
            totalPages: 1,
            pageSize: 1
        }
    }
    
    constructor(props){
        super(props)
        this.state={
            navSize: 3,
            navPage: 0
        }
    }

    onNext = (e)=>{
        const {navSize, navPage} = this.state
        const {totalPages} = this.props.pageInfo
        if(navSize*(navPage+1) < totalPages)
            this.setState((prevState)=>({...prevState, navPage:prevState.navPage+1}))
    }

    onPre = (e)=>{
        const {navPage} = this.state
        if(navPage > 0)
            this.setState({navPage:this.state.navPage-1})
    }

    makePageNumber = ()=>{
        const {navSize, navPage} = this.state
        const {pageNumber, totalPages} = this.props.pageInfo
        const pageLinks = []
        const start = navSize * navPage +1
        let end =0;
        end = start + navSize
        if(totalPages < (start + navSize)){
            end = totalPages + 1
        }

        for (let i=start; i<end; i++){
            pageLinks.push(<li key={i} className={"page-item "+(pageNumber === i ? 'active':'')}><Link className="page-link" to={{state:{page:i}}}>{i}</Link></li>)
        }
        return pageLinks;
    }

    render(){
        const {totalPages} = this.props.pageInfo
        const {navSize, navPage} = this.state
        let jumpNumber = ((totalPages>navSize*navPage)?navSize*(navPage)+1:totalPages) + navSize
        if(jumpNumber > totalPages)
            jumpNumber= totalPages
        return (
            <ul className="pagination pagination-sm m-0 justify-content-center">
                <li className="page-item"><Link className="page-link" to={{state:{page:(navSize*(navPage-1))>0 ? navSize*(navPage) : 1}}} onClick={this.onPre}>«</Link></li>
                {this.makePageNumber()}
                <li className="page-item" ><Link className="page-link" to={{state:{page:jumpNumber }}} onClick={this.onNext}>»</Link></li>
            </ul>       
            )
    }
}