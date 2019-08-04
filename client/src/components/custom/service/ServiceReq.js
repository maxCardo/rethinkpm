import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const ServiceReq = () => {
    return (
        <div>
            <p>Hello </p>

            <form className = 'form'>
                <div className="form-group">
                    <label for="serviceType">Type of Service</label>
                    <select className="form-control" name="serviceType" id="serviceType">
                        <option disabled selected value="">--Select a Service Type--</option>
                        <option value="General_Maintenance">General Maintenance</option>
                        <option>HVAC</option>
                        <option>Plumbing</option>
                        <option>Pest Control</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="serviceType">Service Request Summary</label>
                    <textarea className="form-control" id="serviceDiscription" name="serviceDiscription" row="6" col="80"></textarea>
                </div>

                <div className="">
                <h4>Scheduling</h4>
                <p>Please select the times you will be available.</p>
                </div>

                <table className="table table-striped table-condensed">
                    <thead>
                        <tr>
                            {/* <!-- TODO: go to hourly based model --> */}
                            <th></th>
                            <th scope="col">Morning <br /><span className="small">8-11am</span></th>
                            <th scope="col">Afternoon<br /><span className="small">11am-3pm</span></th>
                            <th scope="col">Evening<br /><span className="small">3pm-6pm</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th id="day1" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="11" /></td>
                            <td> <input type="checkbox" name="avail" value="12" /></td>
                            <td> <input type="checkbox" name="avail" value="13" /></td>
                        </tr>
                        <tr>
                            <th id="day2" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="21" /></td>
                            <td> <input type="checkbox" name="avail" value="22" /></td>
                            <td> <input type="checkbox" name="avail" value="23" /></td>
                        </tr>
                        <tr>
                            <th id="day3" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="31" /></td>
                            <td> <input type="checkbox" name="avail" value="32" /></td>
                            <td> <input type="checkbox" name="avail" value="33" /></td>
                        </tr>
                        <tr>
                            <th id="day4" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="41" /></td>
                            <td> <input type="checkbox" name="avail" value="42" /></td>
                            <td> <input type="checkbox" name="avail" value="43" /></td>
                        </tr>
                        <tr>
                            <th id="day5" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="51" /></td>
                            <td> <input type="checkbox" name="avail" value="52" /></td>
                            <td> <input type="checkbox" name="avail" value="53" /></td>
                        </tr>
                        <tr>
                            <th id="day6" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="61" /></td>
                            <td> <input type="checkbox" name="avail" value="62" /></td>
                            <td> <input type="checkbox" name="avail" value="63" /></td>
                        </tr>
                        <tr>
                            <th id="day7" scope="row">Day: and Date</th>
                            <td> <input type="checkbox" name="avail" value="71" /></td>
                            <td> <input type="checkbox" name="avail" value="72" /></td>
                            <td> <input type="checkbox" name="avail" value="73" /></td>
                        </tr>                        
                    </tbody>
                </table>

            </form>
        </div>
    )
}

ServiceReq.propTypes = {
    
}

// const mapStateToProps = state => ({
//  auth:state.auth
// });

export default ServiceReq
