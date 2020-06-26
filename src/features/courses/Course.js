import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import {
    updateCourse,
    checkDifference
} from './courseSlice';

class Course extends Component {

    constructor(props) {
        super(props);
        this.timerId = null;

        this.getCourse = this.getCourse.bind(this);
        this.getCourseInInterval = this.getCourseInInterval.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.bindEventListeners = this.bindEventListeners.bind(this);
        this.unbindEventListeners = this.unbindEventListeners.bind(this);
    }


    componentDidMount() {

        this.updatingCourse().then(this.bindEventListeners);

    }

    componentWillUnmount() {

        this.stopUpdatingCourse();
        this.unbindEventListeners();

    }

    bindEventListeners() {
        window.addEventListener('focus', this.onFocus);
        window.addEventListener('blur', this.onBlur);
    }

    unbindEventListeners() {
        window.removeEventListener('focus', this.onFocus);
        window.removeEventListener('blur', this.onBlur);
    }

    onFocus() {
        this.updatingCourse();
    }

    onBlur() {
        this.stopUpdatingCourse();
    }


    updatingCourse() {
        return this.getCourse().then(this.getCourseInInterval);
    }

    stopUpdatingCourse() {
        if (this.timerId != null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

    }

    getCourse() {

        return fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHBTC')
            .then(response => {
                return response.json();
            })
            .then(data => {

                this.props.updateCourse(data.price);

            });

    }

    getCourseInInterval() {
        this.timerId = setTimeout(
            () => {
                this.getCourse().then(this.getCourseInInterval)
            },
            (this.props.interval * 1000)
        )
    }


    render() {
        return (
            <Container style={{ marginTop: "30px" }}>
                <Row>
                    <p>ETH/BTC: </p>
                    <p> {this.props.course}
                        <span style={{ color: this.props.difference == 0 ? "grey" : this.props.difference > 0 ? "green" : "red"  }}> {this.props.difference}%</span>
                    </p>
                </Row>
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        interval: state.courses.interval,
        oldCourse: state.courses.oldCourse,
        course: state.courses.course,
        difference : state.courses.difference
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateCourse: course => {
            dispatch(updateCourse(course));
            dispatch(checkDifference());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Course);
