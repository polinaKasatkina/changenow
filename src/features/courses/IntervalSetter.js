import React, { Component } from 'react';
import { Container, Row, Form, Col } from 'react-bootstrap';

import { connect } from 'react-redux';

import { changeInterval } from './courseSlice';

class IntervalSetter extends Component {

    render() {

        return (
            <Container>
                <Row>
                    <p>Set up an interval between the queries in seconds: </p>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="0.1"
                            value="0.1"
                            checked={this.props.interval === 0.1}
                            onChange={this.props.changeInterval}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="1"
                            value="1"
                            checked={this.props.interval === 1}
                            onChange={this.props.changeInterval}
                        />
                    </Col>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="10"
                            value="10"
                            checked={this.props.interval === 10}
                            onChange={this.props.changeInterval}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        interval: state.courses.interval
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeInterval: e => dispatch(changeInterval(e.target.value))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntervalSetter);
