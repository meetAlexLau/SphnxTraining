import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FontPicker from 'font-picker-react';
import axios from 'axios';

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
            renderText: "Sample Text",
            renderColor: "#00FF00",
            renderFont: "Open Sans",
            renderFontSize: "24"
        }
    }

    /* these methods provide abstraction for different browsers, e is the abstract
    value which is retrieved from React components. Not significant but good to know
    */
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
        e.preventDefault() //prevents default behavior
    
        console.log(`Object successfully created!`);
        const objectObject = {
          text: this.state.renderText,
          color: this.state.renderColor,
          font: this.state.renderFont,
          fontSize: this.state.renderFontSize
        };

        axios.post('http://localhost:4000/objects/create', objectObject)
        .then(res => console.log(res.data));

        this.setState({renderText: '', renderColor: '', renderFont: this.state.renderFont, renderFontSize: ''})
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