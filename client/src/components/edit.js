import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FontPicker from 'font-picker-react';
import axios from 'axios';

export default class Editobject extends Component {

  constructor(props) {
    super(props)

    this.onChangeObjectText = this.onChangeObjectText.bind(this);
    this.onChangeObjectColor = this.onChangeObjectColor.bind(this);
    this.onChangeObjectFont = this.onChangeObjectFont.bind(this);
    this.onChangeObjectFontSize = this.onChangeObjectFontSize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      renderText: '',
      renderColor: '',
      renderFont: '',
      renderFontSize: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/objects/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            text: res.data.text,
            color: res.data.color,
            font: res.data.font,
            fontSize: res.data.fontSize
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeObjectText(e) {
    this.setState({ renderText: e.target.value })
  }

  onChangeObjectColor(e) {
    this.setState({ renderColor: e.target.value })
  }

  onChangeObjectFont(e) {
    this.setState({ renderFont: e.family })
  }
  onChangeObjectFontSize(e){
      this.setState({renderFontSize: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault()

    const objectObject = {
        text: this.state.renderText,
        color: this.state.renderColor,
        font: this.state.renderFont,
        fontSize: this.state.renderFontSize
    };

    axios.put('http://localhost:4000/objects/update/' + this.props.match.params.id, objectObject)
      .then((res) => {
        console.log(res.data)
        console.log('Object successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to object List 
    this.props.history.push('/')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit = {this.onSubmit}>
          <Form.Group controlId="Text">
            <Form.Label>Text</Form.Label>
            <Form.Control type="text" value = {this.state.renderText}
             onChange = {this.onChangeText}/>
          </Form.Group>
  
          <Form.Group controlId="Color">
            <Form.Label>Color</Form.Label>
            <Form.Control type="color" defaultValue = {this.state.renderColor} onChange = {this.onChangeColor}/>
          </Form.Group>
  
          <Form.Group controlId="Font">
              <FontPicker
                apiKey = 'AIzaSyDpvJ4vwYQ5IrLsANU2rngs1ahHODCH4Hw'
                activeFontFamily = {this.state.renderFont}
                onChange = {this.onChangeFont} //add className = 'apply-font' to elements you want font to apply to
              />
            <Form.Label className = 'apply-font'>Font</Form.Label>
          </Form.Group>

          <Form.Group controlId="Font Size">
            <Form.Label>Font Size</Form.Label>
            <Form.Control type="number" value = {this.state.renderFontSize} onChange = {this.onChangeFontSize}/>
          </Form.Group>
  
          <Button variant="danger" size="lg" block="block" type="submit">
            Create Object
          </Button>
        </Form>
        <p className="text-center" id = "displayText" style = {{color:this.state.renderColor, fontSize: this.state.renderFontSize+"px", fontFamily: this.state.renderFont}}>
          {this.state.renderText}
          </p>
    </div>);
  }
}