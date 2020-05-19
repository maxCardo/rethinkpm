import React from 'react';
import NotesScreen from './NotesScreen/NotesScreen'
import SalesScreen from './SalesScreen'


const Screens = (props) => {

    const { screen } = props
    switch (screen) {
        case 'notes':
            return <NotesScreen {...props} />;
        case 'sales':
            return <SalesScreen {...props} />;
        default:
            return <div>No Screens Selected</div>;
    }
}

export default Screens;
