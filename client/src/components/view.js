import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class View extends Component{
    constructor(props){
        super(props);
        
        this.deleteObject = this.deleteObject.bind(this);

        this.state = {
            renderText: '',
            renderColor: '',
            renderFont: '',
            renderFontSize: ''
            }
        }
    componentDidMount(){
        axios.get('http://localhost:5000/objects/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    renderText : res.data.text,
                    renderColor : res.data.color,
                    renderFont : res.data.font,
                    renderFontSize : res.data.fontSize
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    deleteObject(){
        console.log(this.props.match.params.id)
        axios.delete('http://localhost:5000/objects/delete/' + this.props.match.params.id)
        .then((red) => {
            console.log('Object successfully deleted!')
            window.location.reload();
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/')
    }

    render() {
        return(
            <div style={{marginTop: 10,
                textAlign: "center"}}>
                <h2>View Object</h2>
                <div style={{color: this.state.renderColor,
                            textAlign: "center",
                            fontFamily: this.state.renderFont,
                            fontSize: this.state.renderFontSize + "px"}}>{this.state.renderText}</div>
                <Link to={"/edit/"+this.props.match.params.id} className="btn btn-primary">Edit</Link>
                <Link to={"/"} className="btn btn-warning">Exit</Link>
                <button className="btn btn-danger" onClick={this.deleteObject}>Delete Object</button>
            </div>
            
        )
    }
}