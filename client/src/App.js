import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Create from './components/create';
import Edit from './components/edit';
import View from './components/view';
import Home from './components/home';

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/home"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
            
             <Nav>
                <Link to={"/view/:id"} className="nav-link">
                  View Objects
                </Link>
             </Nav>

              <Nav>
                <Link to={"/edit/:id"} className="nav-link">
                  Edit Objects
                </Link>
              </Nav>

              <Nav>
                <Link to={"/create"} className="nav-link">
                  Create New Object
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/home' component={Home} />
                <Route path="/create" component={Create} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/view/:id" component={View} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;