import React, {Fragment, useState} from 'react'
import Select from 'react-select'
import {Button, Modal} from "react-bootstrap";

const StatusField = ({data: {data}}) => {

    const formatStatus = (status) => {
        return {value: status, label: status[0].toUpperCase() + status.substr(1)}
    }

    const formatedStatus = formatStatus(data.status);
    const [status, setStatus] = useState(formatedStatus);
    const [editable, toggleEditable] = useState(false);
    const [showConfModal, setConfModal] = useState(false);

    //ToDo: should we pull from common folder? utils? (utils.statusSchema currently was this data)
    const agentStatus = [
        {value: 'new', label: 'Lead'},
        {value: 'prospect', label: 'Prospect'},
        {value: 'pending', label: 'Pending'},
        {value: 'agent', label: 'Agent'},
        {value: 'notInterested', label: 'Not Interested'}
    ];

    const handleStatusChange = selectedOption => {
        setStatus(selectedOption);
        // confirmModal
        // reasonForLoss: (selectedOption.value !== 'notInterested') ? '' : this.state.reasonForLoss,
    };

    const updateAgentStatus = (status) => {
        //post to api
        console.log(status);
        console.log(data._id);
    };

    return (
        <Fragment>
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
                updateAgentStatus(status);
                setConfModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to change the status to {status.label}</Modal.Title>
                </Modal.Header>
                { status.value === 'notInterested' && 'reason for loss here!'}
                <Modal.Footer className="modalFooterBtns">
                    <Button className="btn btn-primary" variant="secondary" onClick={() => {
                        updateAgentStatus(status['value']);
                        toggleEditable(false);
                        setConfModal(false);
                    }}>
                        Confirm
                    </Button>
                    <Button className="btn btn-danger" variant="secondary" onClick={() => {
                        toggleEditable(false);
                        setStatus(formatedStatus);
                        setConfModal(false)
                    }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default StatusField
