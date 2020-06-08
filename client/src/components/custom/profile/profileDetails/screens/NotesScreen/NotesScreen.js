import React from 'react'
import {connect} from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import TableWithSearch from './TableWithSearch'


const NotesScreen = ({profileType, activeProfile:{notes}}) => {

    var all = notes && notes.length ? notes  : []
    var notes = notes && notes.length ? notes.filter((note) => note.type === 'note' ) : []
    var logs = notes && notes.length ? notes.filter((note) => note.type === 'log') : []

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
        mapper: (data) => data.charAt(0).toUpperCase() + data.slice(1)
    })

    const onSubmit = (data) => {
        console.log('onSubmit fired: ', data)
    } 

    
    return (
        <div className='profile-tables__container'>
            <Tabs defaultActiveKey="All">
                <Tab eventKey="All" title="All">
                    <TableWithSearch
                        data={all}
                        headers={logHeaders}
                        handleSubmit={()=> onSubmit()}
                        sortBy='date'
                        sortDirection='desc'
                        sorting={true}
                        profileType={profileType}
                    />
                </Tab>
                <Tab eventKey="notes" title="Notes">
                    <TableWithSearch data={notes} headers={headers} profileType={profileType} handleSubmit={() => onSubmit()} />
                </Tab>
                <Tab eventKey="Logs" title="Logs">
                    <TableWithSearch data={logs} headers={headers} profileType={profileType} handleSubmit={() => onSubmit()} />
                </Tab>
            </Tabs>

        </div>
    )
}

const mapStateToProps = state => ({
    activeProfile: state.profile.activeProfile
})

export default connect(mapStateToProps)(NotesScreen)