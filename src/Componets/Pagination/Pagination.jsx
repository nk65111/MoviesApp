import React, { Component } from 'react';
class Pagination extends Component {
    state = {}
    render() {
        return (
            <div>
                <ul className="pagination justify-content-center">
                  {
                      this.props.currPage==1?(
                        <li className="page-item disabled">
                        <a className="page-link"  aria-disabled="true">Previous</a>
                    </li>
                      ):(
                        <li className="page-item" onClick={this.props.perviousPage}>
                        <a className="page-link">Previous</a>
                        </li>
                      )
                  }
                  {
                      this.props.pages.map((pageCount)=>{
                          return pageCount==this.props.currPage?(
                            <li className="page-item active">
                            <a className="page-link" href="#" >{pageCount}</a>
                            </li>
                          ):(
                            <li className="page-item" onClick={()=>{
                               this.props.setPage(pageCount);
                            }}>
                            <a className="page-link" href="#">{pageCount}</a>
                            </li>
                          )
                      })
                  }
                  {
                      this.props.currPage==this.props.pages.length?(
                        <li className="page-item disabled">
                        <a className="page-link"  aria-disabled="true">Next</a>
                        </li>
                      ):(
                        <li className="page-item" onClick={
                            this.props.nextPage
                        }>
                        <a className="page-link">Next</a>
                        </li>
                      )
                  }



                    
                  
                   
                   
                </ul>
            </div>
        );
    }
}

export default Pagination;