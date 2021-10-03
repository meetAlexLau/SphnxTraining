import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ObjectTableRow from './ObjectTableRow';


export default class ListHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      objects: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/objects/')
      .then(res => {
        this.setState({
          objects: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.objects.map((res, i) => {
      return <ObjectTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Text</th>
            <th>Color</th>
            <th>Font</th>
            <th>FontSize</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}