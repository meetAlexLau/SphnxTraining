import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export default class Create extends Component {
    constructor(props){
        super(props);

        this.onChangeText = this.onChangeText.bind(this)
        this.state = {
            renderText: "",
            renderColor: "",
            renderFont: "",
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



    render() {
      return (<div class="form-wrapper">
        <Form>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
  
          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"/>
          </Form.Group>
  
          <Form.Group controlId="Name">
            <Form.Label>Roll No</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
  
          <Button variant="danger" size="lg" block="block" type="submit">
            Create Student
          </Button>
        </Form>
      </div>);
    }
  }