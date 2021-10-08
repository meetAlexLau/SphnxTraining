import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default class ObjectTableRow extends Component {
    constructor(props){
        super(props);
        this.deleteObject = this.deleteObject.bind(this);
    }
    deleteObject(){
        console.log(this.props.obj._id)
        axios.delete('http://localhost:5000/objects/delete/' + this.props.obj._id)
        .then((red) => {
            console.log('Object successfully deleted!')
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.text}</td>
                <td>{this.props.obj.color}</td>
                <td>{this.props.obj.font}</td>
                <td>{this.props.obj.fontSize}</td>
                <td>
                    <Link style={{color: "white"}} className = "btn btn-success"
                    to = {"/view/" + this.props.obj._id}
                    >
                        View
                     </Link>
                    <Link style={{color: "white"}} className = "btn btn-info"
                    to = {"/edit/" + this.props.obj._id}
                    >
                        Edit
                     </Link>
                    <Button size="md" variant="danger" onClick={this.deleteObject}>Delete</Button>
                </td>
            </tr>
        );
    }
}