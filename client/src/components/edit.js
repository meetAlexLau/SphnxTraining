import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FontPicker from 'font-picker-react';
import axios from 'axios';

export default class Editobject extends Component {

  constructor(props) {
    super(props)

    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeColor = this.onChangeColor.bind(this)
    this.onChangeFont = this.onChangeFont.bind(this)
    this.onChangeFontSize = this.onChangeFontSize.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      renderText: '',
      renderColor: '',
      renderFont: '',
      renderFontSize: ''
    }
    console.log(this.props.match.params.id)
  }

  componentDidMount() {
    axios.get('http://localhost:4000/objects/edit/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            renderText: res.data.text,
            renderColor: res.data.color,
            renderFont: res.data.font,
            renderFontSize: res.data.fontSize
        });
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  onChangeText(e){
    this.setState({renderText: e.target.value}, () => { 
      /*callback function. this.setState is async, 
      we wait for state change then get state values
      */
      this.renderTextAttributes();
    });
  }

  onChangeColor(e){
      this.setState({renderColor: e.target.value}, ()=> {
        this.renderTextAttributes();
      })
  }

  onChangeFont(e){
      this.setState({renderFont: e.family}, () => {
        this.renderTextAttributes();
      })
  }

  onChangeFontSize(e){
      this.setState({renderFontSize: e.target.value}, () => {
        this.renderTextAttributes();
      })
  }
  renderTextAttributes(){
    let text = document.getElementById("displayText");
    text.innerHTML = this.state.renderText;
    text.style.color = this.state.renderColor +"";
    text.style.fontFamily = this.state.renderFont +"";
    text.style.fontSize = this.state.renderFontSize +"px";
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
    this.props.history.push('/home')
  }


  render() {
    console.log(this.state)
    return (<div className="form-wrapper">
      <Form onSubmit = {this.onSubmit}>
          <Form.Group controlId="Text">
            <Form.Label>Text</Form.Label>
            <Form.Control type="text" defaultValue = {this.state.renderText}
             onChange = {this.onChangeText}/>
          </Form.Group>
  
          <Form.Group controlId="Color">
            <Form.Label>Color</Form.Label>
            <Form.Control type="color" value = {this.state.renderColor} onChange = {this.onChangeColor}/>
          </Form.Group>
  
          <Form.Group controlId="Font">
              
            <Form.Label className = 'apply-font'>Font: There is a cors error when using Google Font Api.</Form.Label>
          </Form.Group>

          <Form.Group controlId="Font Size">
            <Form.Label>Font Size</Form.Label>
            <Form.Control type="number" value = {this.state.renderFontSize} onChange = {this.onChangeFontSize}/>
          </Form.Group>
  
          <Button variant="danger" size="lg" block="block" type="submit">
            Update Object
          </Button>
        </Form>
        <p className="text-center" id = "displayText" style = {{color:this.state.renderColor, fontSize: this.state.renderFontSize+"px", fontFamily: this.state.renderFont}}>
          {this.state.renderText}
          </p>
    </div>);
  }
}