import React, {Fragment, useState, useRef, useEffect} from 'react'
import Select from 'react-select'
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {updateStatus} from "../../../../../actions/profile";
import PropTypes from "prop-types";
import settings from '../../../../../settings';

const StatusField = ({updateStatus, data}) => {

    const theProfiles = settings.routes.profile;
    const profileType = useRef(data.profileType);
    const profileId = useRef(data._id);


    const formatStatus = (status) => {
        return {value: status, label: status[0].toUpperCase() + status.substr(1)}
    }

    const formatedStatus = formatStatus(data.status);
    const [agent, setAgent] = useState(data._id);
    const [status, setStatus] = useState(formatedStatus);
    const [editable, toggleEditable] = useState(false);
    const [showConfModal, setConfModal] = useState(false);
    const [lossReason, setLossReason] = useState('');
    const lossInput = useRef();

    //ToDo: should we pull from common folder? utils? (utils.statusSchema currently was this data)
     const agentStatus = theProfiles && theProfiles[profileType.current] && theProfiles[profileType.current]['statusOptions'];


    const handleStatusChange = selectedOption => {
        setStatus(selectedOption);
        // confirmModal
        // reasonForLoss: (selectedOption.value !== 'notInterested') ? '' : this.state.reasonForLoss,
    };

    const updateAgentStatus = (status, lossReason, profileType) => {

        if (!lossReason) {
            updateStatus({status: status}, data._id, profileType.current);
        } else {
            /*TODO: LossReason doesn't get added to the record*/
            updateStatus({status: status, lossReason: lossReason}, data._id, profileType.current);
        }
        //if status === 'notInterested' add lossReason to post
    };

    useEffect( () => {
        if (status !== formatStatus(data.status) && agent !== data._id) {
            setStatus(formatStatus(data.status));
            setAgent(data._id);
        }
        if (lossInput.current !== undefined && lossInput.current !== null) {
            lossInput.current.focus();
        }
        if (data._id && (profileId.current !== data._id)) {
            profileId.current = data._id;
            toggleEditable(false);
        }
        if (data.profileType && (profileType.current !== data.profileType)) {
            profileType.current = data.profileType;
        }
    }, [status, data.status, agent, data._id, data.profileType]);



    return (
        <Fragment key="status">
            <div className="statusField-container">
                <b>Status: </b>
                <Select
                    className={(!editable ? 'editable-false' : 'editable-true') + ' agentStatusEdit'}
                    value={status}
                    options={agentStatus}
                    placeholder='Select Status'
                    isDisabled={!editable}
                    onChange={handleStatusChange}
                    isSearchable={false}
                />
                {(!editable) ? (
                    <button className='action-buttons__button singleFieldEdit'
                            onClick={() => toggleEditable(true)}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>
                ) : (
                    <Fragment>
                        <button className='action-buttons__button ab__confirm singleFieldEdit'
                                onClick={() => setConfModal(true)}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                                onClick={() => {
                                    toggleEditable(false);
                                    setStatus(formatedStatus)
                                }}>
                            <i className="fas fa-times"></i>
                        </button>
                    </Fragment>
                )}
            </div>
            <Modal size='md' show={showConfModal} onHide={() => {
                toggleEditable(false);
                setStatus(formatedStatus);
                setLossReason('');
                setConfModal(false);
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to change the status to {status.label}</Modal.Title>
                </Modal.Header>
                {status.value === 'notInterested' && (
                    <Modal.Body>
                        <Form.Group className="addLossReason">
                            <Form.Label>Reason for Loss:</Form.Label>
                            <Form.Control type="text" name='lossReason'
                                          value={lossReason}
                                          onChange={(e) => {
                                              setLossReason(e.target.value)
                                          }}
                                          autoFocus={true}
                                          ref={lossInput}/>
                        </Form.Group>
                    </Modal.Body>
                )
                }
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary" onClick={() => {
                        (lossReason) ? updateAgentStatus(status['value'], lossReason, profileType) : updateAgentStatus(status['value'], null, profileType);

                        toggleEditable(false);
                        setConfModal(false);
                    }}>
                        Confirm
                    </Button>
                    <Button className="btn btn-danger" variant="secondary" onClick={() => {
                        toggleEditable(false);
                        setStatus(formatedStatus);
                        setLossReason('');
                        setConfModal(false);
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

StatusField.propTypes = {
    updateStatus: PropTypes.func.isRequired,
}

export default connect(null, {updateStatus})(StatusField)
