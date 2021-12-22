import React, { Component } from 'react';
import logo from '../metrobi.png';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
          jsonData: [],
          visibleModal: false,
          singleData: {}
        }
      }

    async componentDidMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        this.setState({ jsonData: data })
    }

    setVisibleModal(visible, element = {}) {
        this.setState({
          visibleModal: visible,
          singleData: element
        });
    }

    renderModal(){
        return(
          <div className="modal fade bd-example-modal-lg show" id="modalValue" tabIndex="-1" role="dialog" aria-labelledby="modalValue" aria-hidden="true" style={{ display : this.state.visibleModal ? "block" : "none" }}>
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content modal-content-protocol">
                <div className="modal-header">
                  <h5 className="modal-title">Informations</h5>
                </div>
                <div className="modal-body">
                    <div className="row">
  
                        <div className="col-md-12 div-initial-body-manual" align="left">
                            <h5>Title: </h5>
                            <p>{this.state.singleData.title}</p>
                            <h5>Body: </h5>
                            <p>{this.state.singleData.body}</p>
                        </div>
  
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={ () => this.setVisibleModal(false) }>Close</button>
                </div>
              </div>
            </div>
          </div>
        );
    }

    render() {
        console.log("JSON DATA: ", this.state.jsonData);
        const listItems = this.state.jsonData.map((d) => 

            <tr key={d.id}>
                <th scope="row">{ d.id }</th>
                <td>{ d.userId }</td>
                <td>{ d.title }</td>
                <td><a href="#" data-toggle="modal" data-target="#modalValue" onClick={ () => this.setVisibleModal(true, d) }>See more...</a></td>
            </tr>

        );

        if(this.state.jsonData.length > 0){
            return (
                <>
                { this.renderModal() }
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><img src={logo} className="logo-nav" alt="logo" /></a>
                </nav>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">USER ID</th>
                            <th scope="col">TITLE</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        { listItems }
                    </tbody>
                </table>
                </>
            );
        }

        return (

            <div className="text-center center-loading">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

}

export default List;