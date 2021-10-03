import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
export default class ObjectTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj.text}</td>
                <td>{this.props.obj.color}</td>
                <td>{this.props.obj.font}</td>
                <td>{this.props.obj.fontSize}</td>
                <td>
                    <Link style={{color: "white"}} className = "btn btn-info"
                    to = {"/edit/" + this.props.obj._id}
                    >
                        Edit
                     </Link>
                    <Button size="md" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}