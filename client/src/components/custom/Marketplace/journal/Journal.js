import React, { useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import TableWithSearch from './TableWithSearch'


const Journal = ({history, type, id, addNote}) => {

    const [notes, setNotes] = useState([])
    const [logs, setLogs] = useState([])
    const [all, setAll] = useState([])

    useEffect(() => {
        console.log('trigger use effect on notes');
        
    const allNotes = history

    setAll(allNotes && allNotes.length ? allNotes : [])
    setLogs(allNotes && allNotes.length ? allNotes.filter((note) => note.type === 'log') : [])
    setNotes(allNotes && allNotes.length ? allNotes.filter((note) => note.type === 'note') : [])

    console.log('all notes: ', all);
        
    },[history])


    var headers = [
        {
            accessor: 'content',
            label: 'Record'
        },
        {
            accessor: 'date',
            label: 'Date',
            mapper: 'date'
        },
        {
            accessor: 'user.name',
            label: 'User'
        }
    ]
    var logHeaders = headers.slice()
    logHeaders.unshift({
        accessor: 'type',
        label: 'Type',
        mapper: (data) => data ? data.charAt(0).toUpperCase() + data.slice(1) : ''
    })

    const onSubmit = (data) => {
        console.log('onSubmit fired: ', data)
        addNote(data, type)
    }


    return (
        <div className='profile-tables__container'>
            <Tabs defaultActiveKey="All">
                <Tab eventKey="All" title="All">
                    <TableWithSearch data={all} headers={logHeaders} handleSubmit={() => onSubmit()} sortBy='date' sortDirection='desc' sorting={true} profileType={type}/>
                </Tab>
                <Tab eventKey="notes" title="Notes">
                    <TableWithSearch data={notes} headers={headers} profileType={type} id={id} handleSubmit={() => onSubmit()} />
                </Tab>
                <Tab eventKey="Logs" title="Logs">
                    <TableWithSearch data={logs} headers={headers} profileType={type} id={id} handleSubmit={() => onSubmit()} />
                </Tab>
            </Tabs>
        </div>
    )
}

const mapStateToProps = state => ({
    history: state.marketplace.focusedProp.history
})

export default connect (mapStateToProps, {})(Journal)