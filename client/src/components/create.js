import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FontPicker from 'font-picker-react';

export default class Create extends Component {
    constructor(props){
        super(props);

        //https://reactjs.org/docs/handling-events.html
        // Javascript methods are not bound by default, we have to explicitly bind them to 'this'
        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeColor = this.onChangeColor.bind(this)
        this.onChangeFont = this.onChangeFont.bind(this)
        this.onChangeFontSize = this.onChangeFontSize.bind(this)
        this.onSubmit = this.onSubmit.bind(this); //submits form
        this.state = {
            renderText: "",
            renderColor: "",
            renderFont: "Open Sans",
            renderFontSize: ""
        }
    }

    /* these methods provide abstraction for different browsers, e is the abstract
    value which is retrieved from React components. Not significant but good to know
    */
    onChangeText(e){
        this.setState({renderText: e.target.value})
    }

    onChangeColor(e){
        this.setState({renderColor: e.target.value})
    }

    onChangeFont(e){
        this.setState({renderFont: e.family})
    }

    onChangeFontSize(e){
        this.setState({renderFontSize: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault() //prevents default behavior
    
        console.log(`Object successfully created!`);
        console.log(`Name: ${this.state.renderText}`);
        console.log(`Color: ${this.state.renderColor}`);
        console.log(`Font: ${this.state.renderFont}`);
        console.log(`Font Size: ${this.state.renderFontSize}`);

        this.setState({renderText: '', renderColor: '', renderFont: this.state.renderFont, renderFontSize: ''})
    }

    render() {
      return (<div className="form-wrapper">
        <Form onSubmit = {this.onSubmit}>
          <Form.Group controlId="Text">
            <Form.Label>Text</Form.Label>
            <Form.Control type="text" value = {this.state.renderText} onChange = {this.onChangeText}/>
          </Form.Group>
  
          <Form.Group controlId="Color">
            <Form.Label>Color</Form.Label>
            <Form.Control type="color" defaultValue = {'#ffffff'} onChange = {this.onChangeColor}/>
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
            <Form.Control type="number" onChange = {this.onChangeFontSize}/>
          </Form.Group>
  
          <Button variant="danger" size="lg" block="block" type="submit">
            Create Object
          </Button>
        </Form>
      </div>);
    }
  }