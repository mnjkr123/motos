import React, { Component } from "react";

import BackgroundImage from '../../assets/images/bg/maintenance.jpg';
import Icon from '../../assets/images/logo-icon-64.png';
import { Link } from 'react-router-dom';

/**
 * Maintenance component
 */
class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 59,
            seconds: 0,
        };
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <React.Fragment>
                <section className="position-relative" style={{ background: `url(${BackgroundImage})` }}>
                    <div className="bg-overlay"></div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 p-0">
                                <div className="d-flex flex-column min-vh-100 px-md-5 py-5 px-4">
                                    <div className="mt-md-5">
                                        <Link to="#"><img src={Icon} alt="" /></Link>
                                    </div>
                                    <div className="title-heading my-auto">
                                        <h4 className="text-white display-5 fw-bold mb-4">System is under maintenance</h4>
                                        <p className="text-white-50 para-desc mb-4">Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!</p>
                                        <span id="maintenance" className="timer h1 text-white"> {minutes === 0 && seconds === 0
                                            ? ''
                                            : <h1>{minutes}: {seconds < 10 ? `0${seconds}` : seconds}</h1>
                                        }</span>
                                        <span className="d-block h6 text-uppercase text-white-50">Minutes</span>
                                    </div>
                                    <div className="mb-md-5 footer">
                                        <p className="mb-0 text-reset">© {(new Date().getFullYear())}{" "} Motos. Design with <i className="mdi mdi-heart text-danger"></i> by <Link to="#" className="text-reset">Shreethemes</Link>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Maintenance;
