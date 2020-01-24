<<<<<<< HEAD
import React , {Fragment} from 'react'

=======
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
>>>>>>> master

import './service.css';

const ServiceTicket = (props) => {
  return (
    <Fragment>
      <div className="row" id="ticket-body">
        <div className="col-md-2" id="ticket-sidebar">
          <h3>yo</h3>
        </div>
        <div className="col-md-10" id="ticket-body">
          <div className="row">
            <div className="col-md-3 form-group">ticket num</div>
            <div className="col-md-3 form-group">date opened</div>
            <div className="col-md-3 form-group">open/closed</div>
            <div className="col-md-3 form-group">next status</div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="">Issue</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="form-control"
              ></textarea>{' '}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="">History</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="form-control"
              ></textarea>
            </div>
          </div>
          {/* ToDo: create call of action bar on side, chat , add history, link*/}
          {/* ToDO: add action button on bottom. make dynamic based on wheather it is the owner manager vendor who is viewing the ticket */}
          <div className="btn-div">
            <button className="btn">Button </button>
          </div>
        </div>
<<<<<<< HEAD
      </Fragment>
    )
}


=======
      </div>
    </Fragment>
  );
};

ServiceTicket.propTypes = {};
>>>>>>> master

export default ServiceTicket;
