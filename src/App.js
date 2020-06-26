import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap';
import IntervalSetter from './features/courses/IntervalSetter';
import Course from './features/courses/Course';

export default class App extends Component {

  render() {
    return(
        <Container className="container-fluid">
          <div className="row">
            <main className="main-content col-lg-8 offset-md-3">
              <IntervalSetter />
              <Course />
            </main>
          </div>
        </Container>
    );
  }

}
