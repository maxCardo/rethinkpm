import React, {Fragment, useState} from 'react'
import Select from 'react-select'

const StatusField = ({data:{data}}) => {
    const [status, setStatus] = useState(data.status)
    const [editable, toggleEditable] = useState(false)
    const [confirm, toggleConfirm] = useState(false)

    //ToDo: should we pull from common folder? utils? (utils.statusSchema currently was this data)
    const agentStatus = [
        { value: 'new', label: 'Lead' },
        { value: 'prospect', label: 'Prospect' },
        { value: 'pending', label: 'Pending' },
        { value: 'agent', label: 'Agent' },
        { value: 'notInterested', label: 'Not Interested' }
    ];

    return (
        <Fragment>
            <Select
                className={(!editable ? 'editable-false' : 'editable-true') + ' agentStatusEdit'}
                value={status}
                options={agentStatus}
                placeholder='Select Status'
                isDisabled={editable}
                onChange={(e) => setStatus(e.target.value)}
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
                            onClick={() => toggleConfirm(true)}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className='action-buttons__button ab__cancel singleFieldEdit'
                            onClick={() => {toggleEditable(false); setStatus(data.status)}}>
                            <i className="fas fa-times"></i>
                        </button>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default StatusField
